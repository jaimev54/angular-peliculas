import { inject, Injectable } from '@angular/core';
import { GeneroCreacionDTO, GeneroDTO } from './generos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';

import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { PaginacionDTO } from '../compartidos/modelos/paginacion-dto';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';


@Injectable({
  providedIn: 'root'
})
export class GenerosService implements IServicioCRUD<GeneroDTO, GeneroCreacionDTO> {

  private httpClient = inject(HttpClient);
  private urlBase = environment.apiURL + '/generos';

  constructor() { }

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<GeneroDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.httpClient.get<GeneroDTO[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  public obtenerTodos(): Observable<GeneroDTO[]> {
    return this.httpClient.get<GeneroDTO[]>(this.urlBase + '/todos');
  }

  public obtenerPorId(id: number): Observable<GeneroDTO> {
    return this.httpClient.get<GeneroDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, genero: GeneroCreacionDTO): Observable<any> {
    return this.httpClient.put(`${this.urlBase}/${id}`, genero);
  }

  public crear(genero: GeneroCreacionDTO): Observable<any> {

    return this.httpClient.post(this.urlBase, genero);

  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/${id}`);
  }
} 
