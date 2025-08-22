export interface MetaSucursalI {
  _id: string;
  sucursal: string;
  importVenta: number;
  montoMeta: number;
  cumplimientoImporte: number;
  ticketVenta: number;
  ticketMeta: number;
  cumplimientoTicket: number;
  indeceAvance: number;
  diasHAbiles: number;
  fechaInicio: string;
  fechaFin: string;
  comisiona: boolean;
}

export interface MetaSucursalFormateada {
  _id: string;
  sucursal: string;
  importeVentaActual: number;
  montoMetaActual: number;
  cumplimientoImporteActual: number;
  ticketVentaActual: number;
  ticketMetaActual: number;
  cumplimientoTickectActual: number;
  indeceAvanceActual: number;
  diasHabilesActual: number;
  fechaInicio: string;
  fechaFin: string;

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

export interface MetasSucursales {
  _id:         string;
  monto:       number;
  ticket:      number;
  dias:        number;
  sucursal:    string;
  fechaInicio: Date;
  fechaFin:    Date;
  fecha:       Date;
}

export interface DataMeta {
  monto:       number;
  ticket:      number;
  dias:        number;
  fechaInicio: string;
  fechaFin:    string;
  sucursal:    string[];
}
