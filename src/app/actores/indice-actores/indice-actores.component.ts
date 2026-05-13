import { Component } from '@angular/core';
import { IndiceEntidadComponent } from '../../compartidos/componentes/indice-entidad/indice-entidad.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/servicio-crud.token';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  imports: [IndiceEntidadComponent],
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useExisting: ActoresService }
  ],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css'
})
export class IndiceActoresComponent {}
