import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import moment from 'moment';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/selectorMultipleModelo';
import { SelectorMultipleComponent } from '../../compartidos/componentes/selector-multiple/selector-multiple.component';
import { AutocompleteActoresComponent } from "../../actores/autocomplete-actores/autocomplete-actores.component";
import { actorAutocompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-formulario-peliculas',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, RouterLink, MatDatepickerModule, InputImgComponent, SelectorMultipleComponent, AutocompleteActoresComponent],
  templateUrl: './formulario-peliculas.component.html',
  styleUrl: './formulario-peliculas.component.css'
})
export class FormularioPeliculasComponent implements OnInit {

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  @Input({required: true})
  generosSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  generosNoSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  cinesSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  cinesNoSeleccionados!: SelectorMultipleDTO[];

  @Input()
  actoresSeleccionados!: actorAutocompleteDTO[];

  @Input()
  modelo?: PeliculaDTO;

  @Output()
  posteoFormulario = new EventEmitter<PeliculaCreacionDTO>();

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    titulo: ['', { validators: [Validators.required] }],
    fechaLanzamiento: new FormControl<Date | null>(null, { validators: [Validators.required] }),
    trailer: '',
    poster: new FormControl<File | string | null>(null)
  });

  archivoSeleccionado(file: File) {
    this.form.controls.poster.setValue(file);
  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }
    const pelicula = this.form.value as PeliculaCreacionDTO;

    pelicula.fechaLanzamiento = moment(pelicula.fechaLanzamiento).toDate();

    const generosids = this.generosSeleccionados.map(val => val.llave);
    pelicula.generosIds = generosids;

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    pelicula.cinesIds = cinesIds;

    pelicula.actores = this.actoresSeleccionados;

    this.posteoFormulario.emit(pelicula);
  }


  obtenerErrorCampoTitulo(): string {
    let campo = this.form.controls.titulo;
    if (campo.hasError('required')) {
      return 'El campo título es requerido';
    }
    return '';
  }

  obtenerErrorCampoFechaLanzamiento(): string {
    let campo = this.form.controls.fechaLanzamiento;
    if (campo.hasError('required')) {
      return 'El campo fecha de lanzamiento es requerido';
    }
    return '';
  }

}

