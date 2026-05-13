import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PeliculasService } from '../peliculas.service';
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";


@Component({
  selector: 'app-listado-peliculas',
  standalone: true,
  // CommonModule por si usas directivas comunes; UpperCasePipe y Material Button para la plantilla
  imports: [CommonModule, UpperCasePipe, MatButtonModule, RouterLink, SweetAlert2Module, AutorizadoComponent],
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'] // <- plural correcto
})
export class ListadoPeliculasComponent {
  @Input({ required: true }) peliculas: any[] = [];

  peliculasService = inject(PeliculasService);

  @Output()
  borrado = new EventEmitter<void>();

  borrar(id: number) {
      this.peliculasService.borrar(id).subscribe(() => {
          this.borrado.emit();

      });
  }
}
