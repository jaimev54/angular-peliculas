import { Component } from '@angular/core';
import { IndiceEntidadComponent } from '../../compartidos/componentes/indice-entidad/indice-entidad.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/servicio-crud.token';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [IndiceEntidadComponent],
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useExisting: GenerosService }
  ],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {}
