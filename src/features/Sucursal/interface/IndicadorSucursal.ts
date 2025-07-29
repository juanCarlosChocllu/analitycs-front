
export interface SucursalData {
  id: string;
  sucursal: string;
  cantidad: number;
  precioPromedio: number;
  tasaConversion: number;
  ticketPromedio: number;
  totalImporte: number;
  totalTicket: number;
  traficoCliente: number;
  unidadPorTicket: number;
  ventaTotal: number;
}


export interface DataDiaria {
  cantidad: number;
  tickets: number;
  ventaTotal: number;
  importe: number;
  fecha: string;
  precioPromedio: number;
  ticketPromedio: number;
  unidadPorTicket: number;
}


export interface IndicadoresSucursalI {
  sucursales: number;
  totalVentas: number;
  tcPromedio: number;
  ventaDiariaPorLocal: number;
  unidadPorTickect: number;
  ticketPromedio: number;
  tasaConversion: number;
  dataSucursal: SucursalData[];
  dataDiaria: DataDiaria[];
}

export interface GraficoIndicadorSucursalI {
     fecha:string,
      fechaFormateada: string,
      precioPromedio: number,
      ticketPromedio: number,
      cantidad: number,
      ventaDiaria: number,
      tickets: number,
}