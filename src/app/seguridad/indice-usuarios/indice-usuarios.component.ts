import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginacionDTO } from '../../compartidos/modelos/paginacion-dto';
import { SeguridadService } from '../seguridad.service';
import { UsuarioDTO } from '../seguridad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-usuarios',
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-usuarios.component.html',
  styleUrl: './indice-usuarios.component.css'
})
export class IndiceUsuariosComponent {

  columnasAMostrar = ['email', 'acciones'];
  usuarios!: UsuarioDTO[] ;
  paginacion: PaginacionDTO = {
    pagina: 1,
    recordsPorPagina: 10
  };
  cantidadTotalRegistros!: number ;

  servicioSeguridad = inject(SeguridadService);

  constructor() {
    this.cargarRegistros();
   }

  cargarRegistros() {
    this.servicioSeguridad.obtenerUsuariosPaginado(this.paginacion)
    .subscribe(respuesta => {
      this.usuarios = respuesta.body as UsuarioDTO[];
      const cabecera = respuesta.headers.get('cantidadTotalRegistros') as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);

    });

  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = {
      pagina: datos.pageIndex + 1,
      recordsPorPagina: datos.pageSize
    };
    this.cargarRegistros();
  }

  hacerAdmin(email: string) {
    this.servicioSeguridad.hacerAdmin(email).subscribe(() => {
      Swal.fire('Listo', `El usuario ${email} ahora es admin`, 'success');
    });

  }

  removerAdmin(email: string) {
    this.servicioSeguridad.removerAdmin(email).subscribe(() => {
      Swal.fire('Listo', `El usuario ${email} ya no es admin`, 'success');  
    });
  }

}
