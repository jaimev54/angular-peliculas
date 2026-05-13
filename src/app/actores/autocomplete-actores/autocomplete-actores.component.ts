import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { actorAutocompleteDTO } from '../actores';
import { ActoresService } from '../actores.service';
@Component({
  selector: 'app-autocomplete-actores',
  standalone: true,
  imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, FormsModule, MatTableModule,
    DragDropModule
  ],
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})

export class AutocompleteActoresComponent implements OnInit {

  

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      if (typeof valor === 'string' && valor) {
        this.actoresService.obtenerPorNombre(valor).subscribe(actores =>{ this.actores = actores; });
      }
    });
  }


  control = new FormControl();

  actores: actorAutocompleteDTO[] = [];

  @Input({required: true})
  actoresSeleccionados: actorAutocompleteDTO[] = [];

  actoresService = inject(ActoresService);

  columnasAMostrar =['imagen', 'nombre', 'personaje','acciones'];
  
  @ViewChild(MatTable) table!: MatTable<actorAutocompleteDTO>;
 
  actorSeleccionado(event: MatAutocompleteSelectedEvent){

    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    
    if(this.table !== undefined){
      this.table.renderRows();
    }

  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(actor: actorAutocompleteDTO){
    const indice = this.actoresSeleccionados.findIndex(a => a.id === actor.id);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }
}
