import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import { SeguridadService } from '../../../seguridad/seguridad.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, AutorizadoComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']   // ✅ correcto
})

export class MenuComponent {

  seguridadService = inject(SeguridadService);

}
