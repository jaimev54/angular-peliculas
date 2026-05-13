import { Component, Input, numberAttribute } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from '../formulario-cines/formulario-cines.component';
import { CinesService } from '../cines.service';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/servicio-crud.token';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";

@Component({
  selector: 'app-editar-cine',
  imports: [ EditarEntidadComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css',
  providers:[
    {provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}
  ]
})
export class EditarCineComponent {

  @Input({ transform: numberAttribute })
  id!: number;

  formularioCines = FormularioCinesComponent;

  
}
