import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CredencialesUsuarioDTO } from '../seguridad';
import { MotrarErroresComponent } from "../../compartidos/componentes/motrar-errores/motrar-errores.component";
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-formluario-autentificacion',
  imports: [MotrarErroresComponent, ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatInputModule],
  templateUrl: './formluario-autentificacion.component.html',
  styleUrl: './formluario-autentificacion.component.css'
})
export class FormluarioAutentificacionComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ['',{validators: [Validators.required, Validators.email]}],
    password: ['',{validators: [Validators.required]}]
  });

  @Input({required: true})
  titulo!: string;

  @Input()
  errores: string[] = [];

  @Output()
  posteoFormulario = new EventEmitter<CredencialesUsuarioDTO>();

  obtenerMensajeErrorEmail(){
    let campo = this.form.get('email');

    if(campo?.hasError('required')){
      return 'El campo email es requerido';
    }
    if(campo?.hasError('email')){
      return 'El campo email debe ser un correo electrónico válido';
    }
    return '';
  }

   obtenerMensajeErrorPassword(){
    let campo = this.form.get('password');

    if(campo?.hasError('required')){
      return 'El campo password es requerido';
    }
    
    return '';
  }

  guardarCambios(){
    if (!this.form.valid){
      return;
    }
    const credenciales = this.form.value as CredencialesUsuarioDTO;
    this.posteoFormulario.emit(credenciales);

      
  }


  




}
