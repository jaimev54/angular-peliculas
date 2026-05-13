import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';
import { GenerosService } from '../generos.service';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/servicio-crud.token';

@Component({
  selector: 'app-editar-genero',
  imports: [ EditarEntidadComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useExisting: GenerosService
    }
  ]
})
export class EditarGeneroComponent  {

  @Input({ transform: numberAttribute })
  id!: number;

  formularioGenero = FormularioGeneroComponent;

 
}
