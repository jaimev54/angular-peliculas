import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-motrar-errores',
  imports: [],
  templateUrl: './motrar-errores.component.html',
  styleUrl: './motrar-errores.component.css'
})
export class MotrarErroresComponent {
  @Input({required: true})
  errores!: string[];
}
