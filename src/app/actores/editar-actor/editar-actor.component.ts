import { Component, inject, Input, numberAttribute } from '@angular/core';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MotrarErroresComponent } from "../../compartidos/componentes/motrar-errores/motrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/servicio-crud.token';

@Component({
  selector: 'app-editar-actor',
  imports: [ EditarEntidadComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css',
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService
    }
  ]
})
export class EditarActorComponent {

  

  @Input({ transform: numberAttribute })
  id!: number;

  formularioActor = FormularioActoresComponent;

  
}
