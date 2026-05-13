import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { actorAutocompleteDTO, ActorCreacionDTO, ActorDTO } from './actores';
import { PaginacionDTO } from '../compartidos/modelos/paginacion-dto';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class ActoresService implements IServicioCRUD<ActorDTO, ActorCreacionDTO> {

  constructor() { }

  private http= inject(HttpClient);
  private urlBase= environment.apiURL + '/actores';

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public obtenerPorId(id: number): Observable<ActorDTO>{
    return this.http.get<ActorDTO>(`${this.urlBase}/${id}`);
  }

  public obtenerPorNombre(nombre: string): Observable<actorAutocompleteDTO[]>{
    return this.http.get<actorAutocompleteDTO[]>(`${this.urlBase}/${nombre}`);
  }

  public actualizar(id: number, actor: ActorCreacionDTO){
    const formData= this.construirFormData(actor);
    return this.http.put(`${this.urlBase}/${id}`, formData);
  }

  public crear(actor: ActorCreacionDTO){
    const formData= this.construirFormData(actor);
    return this.http.post(this.urlBase, formData);
    
  }

  public borrar(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFormData(actor: ActorCreacionDTO): FormData{
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    // Asegurarse de que la fecha se envía en formato YYYY-MM-DD
    let fecha = '';
    if (actor.fechaNacimiento instanceof Date) {
      fecha = actor.fechaNacimiento.toISOString().split('T')[0];
    } else if (typeof actor.fechaNacimiento === 'string') {
      // Intentar parsear si viene como string
      const d = new Date(actor.fechaNacimiento);
      if (!isNaN(d.getTime())) {
        fecha = d.toISOString().split('T')[0];
      } else {
        fecha = actor.fechaNacimiento;
      }
    }
    formData.append('fechaNacimiento', fecha);
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }
    return formData;
  }



}
