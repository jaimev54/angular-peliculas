// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPeliculasComponent } from './peliculas/listado-peliculas/listado-peliculas.component';
import { MenuComponent } from './compartidos/componentes/menu/menu.component';
import { RatingComponent } from './compartidos/componentes/rating/rating.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],   // ← en plural y arreglo
  imports: [CommonModule, MenuComponent, RouterOutlet],
})
export class AppComponent {



  
 }

  

