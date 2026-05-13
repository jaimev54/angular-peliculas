import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from "@angular/material/paginator";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-listado-generico',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule,SweetAlert2Module],
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.css']
})
export class ListadoGenericoComponent {
  @Input() listado: any[] = [];
  @Input() columnasAMostrar: string[] = [];
  @Output() editar = new EventEmitter<any>();
  @Output() borrar = new EventEmitter<any>();
} 
