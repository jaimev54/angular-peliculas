import { HttpResponse } from "@angular/common/http";
import { PaginacionDTO } from "../modelos/paginacion-dto";
import { Observable } from "rxjs/internal/Observable";


export interface IServicioCRUD<TDTO, TCreacionDTO> {
  obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<TDTO[]>>; 
  obtenerPorId(id: number): Observable<TDTO>;
  actualizar(id: number, entidad: TCreacionDTO): Observable<any>;
  crear(entidad: TCreacionDTO): Observable<any>;
  borrar(id: number): Observable<any>;
}