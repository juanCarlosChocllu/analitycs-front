export interface BuscadorI {

}

export interface dataBuscador {
    nombre:string
    _id:string
}

export interface EmpresasI  extends dataBuscador{

}

export interface TipoVentaI  extends dataBuscador{

}
export interface SucursalI  extends dataBuscador{

}



export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}