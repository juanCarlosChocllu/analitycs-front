export interface RendimientoDiarioI {
  asesor: string;
  sucursal: string;
  atenciones: number;
  segundoPar: number;
  presupuesto: number;
  fechaDia: string;
  fecha: string;
  _id: string;
}

export interface registrarRendimientoDiarioI {
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
  metas:{
    monto:number, dias:number,ticket:number
  }
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
    metaTicket: number;
    metaMonto: number;
    diasComerciales: number;
  }
  
  export type RespuestaProcesadaPorSemanas = SucursalPorSemanas[];



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


export interface VentaDetalleI {
   antireflejos: number;
   asesor:string
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

export interface ventaAsesorI{
  asesor:string
  ventaAsesor:VentaDetalleI[]
}


export interface ResultadoRendimientoDiarioI {
  diasComerciales: number; 
  metaMonto: number; 
  metaTicket: number; 
  sucursal: string; 
  ventas: ventaAsesorI[]; 
}


export interface VentaAsesor {
  asesor: string;
  antireflejos: number;
  atenciones: number;
  cantidadLente: number;
  entregas: number;
  lc: number;
  montoTotalVentas: number;
  progresivos: number;
  fecha: string;
  idAsesor: string;
  segundoPar: number;
  ticket: number;
}

export interface VentasPorAsesor {
  asesor: string;
  ventaAsesor: VentaAsesor[];
}

export interface SucursalData {
  sucursal: string;
  metaTicket: number;
  diasComerciales: number;
  metaMonto: number;
  ventas: VentasPorAsesor[];
}