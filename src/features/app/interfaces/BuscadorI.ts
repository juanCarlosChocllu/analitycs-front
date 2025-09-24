
export interface dataBuscador {
    nombre:string
    _id:string
}

export interface EmpresasI  extends dataBuscador{

}

export interface TipoVentaI  extends dataBuscador{

}
export interface SucursalI  extends dataBuscador{}



export interface FilterScursalI {
  sucursales:SucursalI[]
  setSucursales:(values:string[])=> void

}

export interface FilterTipoVenta {
  tipoVenta:SucursalI[]
  setTipoVenta:(values:string[])=> void

}

export interface RangoFechaI {
    setFechaInicio: (value:string)=>void
    setFechaFin: (value:string)=>void
    fechaInicio:string
    fechaFin:string
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}


export  interface FiltroBuscadorI {
  setFiltro:(value:filtroBuscadorI) => void
  filtro:filtroBuscadorI
}

export interface filtroBuscadorI {
  empresa?: string[];
  sucursal?: string[];
  tipoVenta?: string[];
  fechaInicio?: string;
  fechaFin?: string;
  comisiona?: boolean| null;
  flagVenta?: string;
  rubro?:string[]

}


