export interface RendimientoDiarioI {
  asesor: string;
  sucursal: string;
  atenciones: number;
  segundoPar: number;
  fechaDia: string;
  fecha: string;
  _id: string;
}

export interface registrarRendimientoDiarioI {
  atenciones: number;
  segundoPar: number;
}

export interface Venta {
  antireflejos: number;
  atenciones: number;
  cantidadLente: number;
  entregas: number;
  fecha: string;
  lc: number;
  montoTotalVentas: number;
  progresivos: number;
  segundoPar: number;
  ticket: number;
}

export interface DatosAsesor {
  asesor: string;
  sucursal: string;
  ventas: Venta[];
}

export interface responseRendimiento<T> {
  paginas: 1;
  data: T[];
  paginaActual: number;
}

export interface VentasDetallaeMetas {
  fecha: string; // formato 'YYYY-MM-DD'
  montoTotal: number;

  ticket: number;
 
      dias:number
}


export interface ventaAsesor {
  asesor: string;
  dias:number
  ventas:VentasDetallaeMetas[]
}


export interface VentaMestaAsesor {
  metaTicket: number;
  sucursal: string;
  diasComerciales: number;
  ventaAsesor: ventaAsesor[];

}
