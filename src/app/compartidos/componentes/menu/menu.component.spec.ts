import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { SeguridadService } from '../../../seguridad/seguridad.service';

// Mock del servicio para no depender de HttpClient ni del backend
const mockSeguridadService: Partial<SeguridadService> = {
  obtenerCampoJWT: (campo: string) => 'test@example.com',
  estaLogueado: () => false,
  logout: () => {},
  obtenerRol: () => ''
};

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // En componentes standalone se usa imports, NO declarations
      imports: [MenuComponent, RouterModule.forRoot([])],
      providers: [
        { provide: SeguridadService, useValue: mockSeguridadService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener inyectado el SeguridadService', () => {
    expect(component.seguridadService).toBeTruthy();
  });

  it('debería renderizar el enlace de inicio', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });
});
