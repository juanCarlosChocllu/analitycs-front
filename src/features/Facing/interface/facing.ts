export interface facingI {
  exhibicion: string;
  sucursal: string[];
  marca: string[];
  cantidad: number;
}

export interface listarFacingI {
  _id: string;
  cantidad: number;
  fechaCreacion: Date;
  sucursal: string;
  exhibicion: string;
  marca: string;
}


export interface buscadorFacingI {
  sucursal:string[]
  fechaInicio:string,
  fechaFin:string
}
export interface buscadorFacingProps {
  setBuscadorFacing:(value:buscadorFacingI)=>void
}
