import { InjectionToken } from '@angular/core';

export interface CrudService<T> {
  obtenerPaginado(paginacion: any): any;
  borrar(id: number): any;
  // Puedes agregar más métodos genéricos aquí
}

export const SERVICIO_CRUD_TOKEN = new InjectionToken<CrudService<any>>('SERVICIO_CRUD_TOKEN');
