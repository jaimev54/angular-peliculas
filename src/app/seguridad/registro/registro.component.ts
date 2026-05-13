import { Component, inject } from '@angular/core';
import { extraerErroresIdentity } from '../../compartidos/funciones/extraerErrores';
import { CredencialesUsuarioDTO } from '../seguridad';
import { Router } from '@angular/router';
import { SeguridadService } from '../seguridad.service';
import { FormluarioAutentificacionComponent } from "../formluario-autentificacion/formluario-autentificacion.component";

@Component({
  selector: 'app-registro',
  imports: [FormluarioAutentificacionComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  seguridadService = inject(SeguridadService);
  router = inject(Router);
  errores: string[] = [];

  registrar(credenciales: CredencialesUsuarioDTO){
    this.seguridadService.registrar(credenciales).subscribe({
      next: () => {
        
        this.router.navigate(['/']);
      },
      error: err => {
        const errores = extraerErroresIdentity(err);
        if (errores.length > 0) {
          this.errores = errores; 
        }
      }
    });
  }

}
