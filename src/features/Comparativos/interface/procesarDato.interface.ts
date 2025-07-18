
export interface ResumenProducto {
  cantidad: number;
  importe: number;
  tickets: number;
}

export interface ResumenDiario {
  fecha: string;
  LENTE: ResumenProducto;
  MONTURA: ResumenProducto;
  GAFA: ResumenProducto;
  'LENTE DE CONTACTO': ResumenProducto;
  SERVICIO: ResumenProducto;
  totalCantidad: number;
  totalImporte: number;
  totalTickets: number;
  totalTicketsPromedio: number;
  totalPrecioPromedio: number;
}