import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SeguridadService } from './seguridad/seguridad.service';

const mockSeguridadService: Partial<SeguridadService> = {
  obtenerCampoJWT: () => '',
  estaLogueado: () => false,
  logout: () => {},
  obtenerRol: () => ''
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        { provide: SeguridadService, useValue: mockSeguridadService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
