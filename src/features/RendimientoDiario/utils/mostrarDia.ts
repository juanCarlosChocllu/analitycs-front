export function mostrarEnDia(fecha: string) {
  const dias: string[] = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    
  ];
  const date = new Date(fecha);
  return dias[date.getUTCDay()];
}
