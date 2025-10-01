export interface DetalleCotizacion {
  _id: string;
  cantidad: number;
  cotizacion: string;
  descripcion: string;
  fechaCreacion: string; // ISO string date
  flag: string;
  importe: number;
  producto: string;
  rubro: string;
  tipo: string;

}

export interface CotizacionI {
  _id: string;
  asesor: string;
  codigo: string;
  fechaCotizacion: string; // ISO string date
  noCompra: string;
  sucursal: string;
  total1: number;
  total2: number;
  detalleCotizacion: DetalleCotizacion[];
    id_venta: string;
}