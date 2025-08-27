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
  presupuesto: number;
};

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
  idAsesor?: string;
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

  // Interfaces para el resultado - estructura procesada por semanas
  export interface AsesorSemanal {
    idAsesor: string;
    asesor: string;
    antireflejoSemanal: number;
    atencionesSemanal: number;
    cantidadLenteSemanal: number;
    entregasSemanal: number;
    lcSemanal: number;
    montoTotalVentasSemanal: number;
    progresivosSemanal: number;
    segundoParSemanal: number;
    ticketSemanal: number;
  }
  
  export interface SemanaDatos {
    semana: number;
    fechaInicio: string; // formato: "YYYY-MM-DD"
    fechaFin: string; // formato: "YYYY-MM-DD"
    asesores: AsesorSemanal[];
  }
  
  export interface SucursalPorSemanas {
    sucursal: string;
    fechaInicio: string; // formato: "YYYY-MM-DD"
    fechaFin: string; // formato: "YYYY-MM-DD"
    semanas: SemanaDatos[];
  }
  
  export type RespuestaProcesadaPorSemanas = SucursalPorSemanas[];