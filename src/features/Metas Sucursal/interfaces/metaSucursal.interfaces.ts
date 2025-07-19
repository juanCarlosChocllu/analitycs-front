export interface MetaSucursalI {
  sucursal: string;
  importVenta: number;
  montoMeta: number;
  cumplimientoImporte: number;
  ticketVenta: number;
  ticketMeta: number;
  cumplimientoTicket: number;
  indeceAvance: number;
  diasHAbiles: number;
}

export interface MetaSucursalFormateada {
  sucursal: string;
  importeVentaActual: number;
  montoMetaActual: number;
  cumplimientoImporteActual: number;
  ticketVentaActual: number;
  ticketMetaActual: number;
  cumplimientoTickectActual: number;
  indeceAvanceActual: number;
  diasHabilesActual: number;

  sucursalAnterior: string;
  importeVentaAnterior: number;
  montoMetaAnterior: number;
  cumplimientoImporteAnterior: number;
  ticketVentaAnterior: number;
  ticketMetaAnterior: number;
  cumplimientoTickectAnterior: number;
  indeceAvanceAnterior: number;
  diasHabilesAnterior: number;
}

export interface filtroFecha {
fechaInicio: string;
fechaFin: string;
}
