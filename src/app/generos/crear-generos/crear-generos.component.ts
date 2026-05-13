import { Component,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { GeneroCreacionDTO } from '../generos';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GenerosService } from '../generos.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MotrarErroresComponent } from "../../compartidos/componentes/motrar-errores/motrar-errores.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/servicio-crud.token';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [ CrearEntidadComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css',
  providers:[
    { provide: SERVICIO_CRUD_TOKEN, useClass: GenerosService }
  ]
})
export class CrearGenerosComponent {

  
  formularioGeneros = FormularioGeneroComponent;
  

}
