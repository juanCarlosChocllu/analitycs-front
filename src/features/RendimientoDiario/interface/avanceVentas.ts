export interface AvanceVentas {
  sucursal: string;
  metaTicket: number;
  metaMonto: number;
  diasComerciales: number;
  ventas: Venta[];
}
export interface Venta {
  atenciones: number;
  feha: string;
  presupuestos: number;
  vendidos: number;
  entregadas: number;
}

export interface DatosVenta {
  dias: number;
  fecha: string;
  atenciones: number;
  presupuestos: number;
  vendidos: number;
  metaxdiaVenta: number;
  metaAcumuladaVendida: number;
  entregadas: number;
  metaxdiaEntrega: number;
  metaAcumuladaEntregada: number;
  totales: {
      vendidosAcumulados: number;
      entregadasAcumuladas: number;
  };
}

export interface SucursalTransformada {
  sucursal: string;
  data: DatosVenta[];
}