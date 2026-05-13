import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Coordenada } from './Coordenada';

@Component({
  selector: 'app-mapa',
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(valor => {
      const marcador = new Marker(
        [valor.latitud, valor.longitud],
        this.markerOptions
      );

      if (valor.texto) {
        marcador.bindPopup(valor.texto, {
          autoClose: false,
          autoPan: false
        });
      }

      return marcador;
    });
  }

  @Input()
  sololectura = false;

  @Input()
  coordenadasIniciales: Coordenada[] = [];

  @Output()
  coordenadaSeleccionada = new EventEmitter<Coordenada>();

  markerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'

    })
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 14, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(25.678072542642163, -100.2874333919912),
    zoomControl: true  // ← Agregar esta línea
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent) {

    if (this.sololectura){
      return;
    }

    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;

    this.capas = [];
    this.capas.push(new Marker([latitud, longitud], this.markerOptions));
    this.coordenadaSeleccionada.emit({latitud, longitud} );

  }
}
