import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../peliculas';
import { CargandoComponent } from '../../compartidos/componentes/cargando/cargando.component';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordenada } from '../../compartidos/componentes/mapa/Coordenada';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";
import { RatingService } from '../../rating/rating.service';
import { SeguridadService } from '../../seguridad/seguridad.service';
import Swal from 'sweetalert2';
import { RatingComponent } from "../../compartidos/componentes/rating/rating.component";


@Component({
  selector: 'app-detalle-pelicula',
  imports: [MatChipsModule, RouterLink, MapaComponent, RatingComponent],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit {

  @Input({transform: numberAttribute})
  id!: number;

  peliculasService = inject(PeliculasService);
  pelicula!: PeliculaDTO;
  sanitizer = inject(DomSanitizer);
  trailerURL!: SafeResourceUrl;
  coordenadas: Coordenada[] = [];
  ratingsService = inject(RatingService);
  seguridadService = inject(SeguridadService);

  ngOnInit(): void {
    this.peliculasService.obtenerPorId(this.id).subscribe(pelicula => {
      pelicula.fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
      this.pelicula = pelicula;
      this.trailerURL = this.generarURLYoutubeEnbed(pelicula.trailer);

      this.coordenadas = pelicula.cines!.map(cine => {
        return <Coordenada>{
          latitud: cine.latitud,
          longitud: cine.longitud,
          texto: cine.nombre
        }
       });
    });
  }

  generarURLYoutubeEnbed(url: string): SafeResourceUrl | string {
    if (!url) {
      return '';
    }

    var videoId = url.split('v=')[1];
    var posicionAmpersand = videoId.indexOf('&');
    if (posicionAmpersand !== -1) {
      videoId = videoId.substring(0, posicionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  puntuar(puntuacion: number) {

    if(!this.seguridadService.estaLogueado()) {
      Swal.fire('Error','Debe iniciar sesión para puntuar la película', 'error');
      return;
    }
    this.ratingsService.puntuar(this.pelicula.id, puntuacion).subscribe(() => {
      Swal.fire('Gracias por puntuar', '', 'success');

    });

  } 


}
