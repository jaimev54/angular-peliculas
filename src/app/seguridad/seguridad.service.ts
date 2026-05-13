import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CredencialesUsuarioDTO, RespuestaAutenticacionDTO, UsuarioDTO } from './seguridad';
import { Observable, tap } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/paginacion-dto';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  private hhtp = inject(HttpClient);
  private urlBase = environment.apiURL + '/usuarios';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';


  obtenerUsuariosPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<UsuarioDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.hhtp.get<UsuarioDTO[]>(`${this.urlBase}/ListadoUsuarios`, { observe: 'response', params: queryParams });
  }

  hacerAdmin(email: string) {
    return this.hhtp.post(`${this.urlBase}/haceradmin`, { email });
  }

  removerAdmin(email: string) {
    return this.hhtp.post(`${this.urlBase}/removeradmin`, { email });
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }


  registrar(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO> {
    return this.hhtp.post<RespuestaAutenticacionDTO>(this.urlBase + '/registrar', credenciales)
      .pipe(tap(respuestaAutenticacion => {
        this.guardarToken(respuestaAutenticacion);
      }));
  }

  login(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO> {
    return this.hhtp.post<RespuestaAutenticacionDTO>(this.urlBase + '/login', credenciales)
      .pipe(tap(respuestaAutenticacion => {
        this.guardarToken(respuestaAutenticacion);
      }));
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }
    var datosToken = JSON.parse(atob(token.split('.')[1]));
    return datosToken[campo];
  }

  guardarToken(respuestaAutenticacion: RespuestaAutenticacionDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }
    const expiracion = localStorage.getItem(this.llaveExpiracion);

    if (!expiracion) {
      this.logout();
      return false;
    }

    const expiacionFecha = new Date(expiracion);

    if (expiacionFecha <= new Date()) {
      this.logout();
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string {
    const esAdmin = this.obtenerCampoJWT('esAdmin');
    if (esAdmin) {
      return 'admin';
    }else{
      return '';
    }
   
  }
}
