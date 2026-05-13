import { Component, Input, inject, OnInit } from '@angular/core';
import { SERVICIO_CRUD_TOKEN, CrudService } from '../../servicio-crud.token';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';

@Component({
  selector: 'app-indice-entidad',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.css'
})
export class IndiceEntidadComponent<TDTO, TCreacionDTO> implements OnInit {
  @Input() titulo: string = '';
  @Input() rutaCrear: string = '';
  @Input() columnasAMostrar: string[] = ['id', 'nombre'];

  entidades: any[] = [];
  paginacion = { pagina: 1, recordsPorPagina: 5 };
  cantidadTotalRegistros: number = 0;
  
  servicioCrud = inject<IServicioCRUD<TDTO, TCreacionDTO>>(SERVICIO_CRUD_TOKEN);
  router = inject(Router);

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.servicioCrud.obtenerPaginado(this.paginacion).subscribe({
      next: (respuesta: any) => {
        this.entidades = respuesta.body || respuesta;
        if (respuesta.headers) {
          const total = respuesta.headers.get('cantidad-total-registros') || 
                       respuesta.headers.get('X-Total-Count');
          this.cantidadTotalRegistros = total ? parseInt(total, 10) : this.calcularTotalFallback();
        } else {
          this.cantidadTotalRegistros = this.calcularTotalFallback();
        }
      },
      error: (error: any) => console.error(error)
    });
  }

  private calcularTotalFallback(): number {
    const pageSize = this.paginacion.recordsPorPagina;
    const page = this.paginacion.pagina;
    const currentCount = this.entidades.length;

    if (currentCount === 0 && page > 1) {
      this.paginacion.pagina = page - 1;
      this.cargarRegistros();
      return this.cantidadTotalRegistros;
    }

    // Allow next page when total headers are not available.
    const minTotal = (page - 1) * pageSize + currentCount;
    return currentCount < pageSize ? minTotal : minTotal + 1;
  }

  actualizarPaginacion(event: PageEvent) {
    this.paginacion.pagina = event.pageIndex + 1;
    this.paginacion.recordsPorPagina = event.pageSize;
    this.cargarRegistros();
  }

  editarEntidad(entidad: any) {
    const ruta = this.rutaCrear.replace('/crear', '/editar');
    this.router.navigate([ruta, entidad.id]);
  }

  eliminarEntidad(entidad: any) {
    this.servicioCrud.borrar(entidad.id).subscribe(() => {
      this.cargarRegistros();
    });
  }
}
