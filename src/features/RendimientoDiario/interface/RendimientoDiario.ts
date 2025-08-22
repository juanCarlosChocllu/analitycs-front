export interface RendimientoDiarioI {
  asesor: string;
  sucursal: string;
  atenciones: number;
  segundoPar: number;
  fechaDia: string;
  fecha : string;
}

export interface registrarRendimientoDiarioI  {
  atenciones: number;
  segundoPar: number;
};

interface Venta {
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
  paginas:1,
  data:T[],
  paginaActual:number
}