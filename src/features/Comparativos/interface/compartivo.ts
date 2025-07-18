
export interface VentaItem {
  producto: string;
  cantidad: number;
  importe: number;
}

export interface VentaSucursalProducto {
  producto: string;
  cantidad: number;
  montoTotal: number;
}

export interface VentaSucursalDetalle {
  sucursal: string;
  data: VentaSucursalProducto[];
}

export interface VentaSucursalResumenData {
  total: number; // "955264.00"
  cantidad: number;
  ventaPorDia: number;
  ticketPromedio: number;
}

export interface VentaSucursal {
  cantidadSucursal: number;
  data: VentaSucursalResumenData;
 ventaSucursal:ventaSucursalI[]
}

export interface ventaSucursalI{
    sucursal:string
    data:[{
         producto:string
    cantidad:number,
    montoTotal:number
    }]
}

export interface ComparativoData {
  cantidadSucursal: number;
  fechaInicio: string;   
  fechaFin: string;      
  total: number;
  cantidad: number;
  ticketPromedio: number;
  venta: VentaItem[];
  ventaSucursal: VentaSucursal;
  dataDiaria:DataDiaria[]
}
export interface PropsVentaI {
    ventaActual:VentaItem[]
    ventaAnterior:VentaItem[]
    
}

export interface FilterComparativo {
  sucursal:    string[];
  fechaInicio: string;
  fechaFin:    string;
  flagVenta:   string;
  tipoVenta:   string[];
}

export interface DataDiaria {
  cantidad: number;
  importe: number;
  ticket: number;
  producto: string;
  ticketPromedio: number;
  precioPromedio:number;
  fecha: string;
}