// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { esAdminGuard } from './compartidos/guards/es-admin.guard';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component')
        .then(m => m.LandingPageComponent)
  },
  {
    path: 'generos',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./generos/indice-generos/indice-generos.component')
        .then(m => m.IndiceGenerosComponent)
  },
  {
    path: 'generos/crear',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./generos/crear-generos/crear-generos.component')
        .then(m => m.CrearGenerosComponent)
  },
  {
    path: 'generos/editar/:id',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./generos/editar-genero/editar-genero.component')
        .then(m => m.EditarGeneroComponent)
  },
  {
    path: 'actores',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./actores/indice-actores/indice-actores.component')
        .then(m => m.IndiceActoresComponent)
  },
  {
    path: 'actores/crear',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./actores/crear-actor/crear-actor.component')
        .then(m => m.CrearActorComponent)
  },
  {
    path: 'actores/editar/:id',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./actores/editar-actor/editar-actor.component')
        .then(m => m.EditarActorComponent)
  },
  {
    path: 'peliculas/filtrar',
    loadComponent: () =>
      import('./peliculas/filtro-peliculas/filtro-peliculas.component')
        .then(m => m.FiltroPeliculasComponent)
  },
  {
    path: 'peliculas/crear',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./peliculas/crear-pelicula/crear-pelicula.component')
        .then(m => m.CrearPeliculaComponent)
  },
  {
    path: 'peliculas/editar/:id',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./peliculas/editar-pelicula/editar-pelicula.component')
        .then(m => m.EditarPeliculaComponent)
  },
  {
    path: 'peliculas/:id',
    loadComponent: () =>
      import('./peliculas/detalle-pelicula/detalle-pelicula.component')
        .then(m => m.DetallePeliculaComponent)
  },
  {
    path: 'cines',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./cines/indice-cines/indice-cines.component')
        .then(m => m.IndiceCinesComponent)
  },
  {
    path: 'cines/crear',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./cines/crear-cine/crear-cine.component')
        .then(m => m.CrearCineComponent)
  },
  {
    path: 'cines/editar/:id',
    canActivate: [esAdminGuard],
    loadComponent: () =>
      import('./cines/editar-cine/editar-cine.component')
        .then(m => m.EditarCineComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./seguridad/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'registrar',
    loadComponent: () =>
      import('./seguridad/registro/registro.component')
        .then(m => m.RegistroComponent)
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./seguridad/indice-usuarios/indice-usuarios.component')
        .then(m => m.IndiceUsuariosComponent)
  },
  { path: '**', redirectTo: '' }
];