/**
 * Convierte un archivo a una cadena Base64.
 * @param file Archivo a convertir.
 * @returns Promesa que resuelve con la cadena Base64.
 */
export function toBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
