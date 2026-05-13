import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../servicio-crud.token';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { Router } from '@angular/router';
import { extraerErrores } from '../../funciones/extraerErrores';
import { MotrarErroresComponent } from "../motrar-errores/motrar-errores.component";
import { FormularioGeneroComponent } from "../../../generos/formulario-genero/formulario-genero.component";

@Component({
  selector: 'app-crear-entidad',
  imports: [MotrarErroresComponent],
  templateUrl: './crear-entidad.component.html',
  styleUrl: './crear-entidad.component.css'
})
export class CrearEntidadComponent<TDTO, TCreacionDTO> implements AfterViewInit {

  ngAfterViewInit(): void {
    this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
    this.componentRef.instance.posteoFormulario.subscribe((entidad: any) => {
      this.guardarCambios(entidad);
    });
  }

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaIndice!: string;

  @Input({required: true})
  formulario!: any;

  errores: string[] = [];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TDTO, TCreacionDTO>;
  private router = inject(Router);

  @ViewChild('contenedorFormulario', { read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;
  

  guardarCambios(entidad: TCreacionDTO) {
    //..... guardar los cambios.

    //this.router.navigate(['/generos']);
    this.servicioCRUD.crear(entidad).subscribe({
      next: () => {
      this.router.navigate([this.rutaIndice]);
    },
      error: (err) => {
        const errores = extraerErrores(err);
        this.errores = errores;
        
      }
    });
    
  }

}
