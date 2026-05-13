import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/selectorMultipleModelo';
import { actorAutocompleteDTO } from '../../actores/actores';
import { PeliculasService } from '../peliculas.service';
import { Router } from '@angular/router';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent, CargandoComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent implements OnInit {

  ngOnInit(): void {
    this.peliculasService.actualizarGet(this.id).subscribe(peliculaPutGet => {
      this.pelicula = peliculaPutGet.pelicula;
      this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
        return { llave: genero.id, valor: genero.nombre }
      });
      this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
        return { llave: genero.id, valor: genero.nombre }
      }
      );
      this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cine => {
        return { llave: cine.id, valor: cine.nombre }
      }); 
      this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cine => {
        return { llave: cine.id, valor: cine.nombre }
      });
      this.actoresSeleccionados = peliculaPutGet.actores;
    });
  }

  @Input({ transform: numberAttribute})
  id!: number;

  pelicula!: PeliculaDTO ;

  generosSeleccionados!: SelectorMultipleDTO[];

  generosNoSeleccionados!: SelectorMultipleDTO[];

   cinesSeleccionados!: SelectorMultipleDTO[];

  cinesNoSeleccionados!: SelectorMultipleDTO[];

  actoresSeleccionados!: actorAutocompleteDTO[];

  peliculasService = inject(PeliculasService);
  router = inject(Router);
  errores: string[] = [];

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.actualizar(this.id, pelicula).subscribe({
      next: () => { 
        alert('Pelicula actualizada con éxito');
        this.router.navigate(['/peliculas']);
      },
      error: (error) => {
        this.errores = error.error;
      }
    });
  }
  }
