import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function primeraLetraMayuscula(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string;
    if (!valor || valor.length === 0) {
      return null; // No es responsabilidad de este validador manejar valores vacíos
    }
    const primeraLetra = valor.charAt(0);
    if (primeraLetra !== primeraLetra.toUpperCase()) {
      return { primeraLetraMayuscula: { mensaje: 'La primera letra debe ser mayúscula' } };
    }
    return null; // El valor es válido
  };
}

export function fechaNoPuedeSerFutura(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    if (!valor) {
      return null; // No es responsabilidad de este validador manejar valores vacíos
    }

    // Crear la fecha del control
    const fecha = new Date(valor);

    // Verificar que sea una fecha válida
    if (isNaN(fecha.getTime())) {
      return null; // Si no es una fecha válida, no validar
    }

    // Crear fecha de hoy sin hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Normalizar la fecha del control sin hora
    fecha.setHours(0, 0, 0, 0);

    if (fecha > hoy) {
      return { fechaNoPuedeSerFutura: { mensaje: 'La fecha no puede ser futura' } };
    }

    return null; // El valor es válido
  };
}
