export interface AutenticacionContextI {
  isAuntenticacion: boolean;
  rol: string;
  sucursal: string;
  empresa: string;
  idEmpresa: string;
  idSucursal: string;
  nombreAsesor:string
}

export interface ResponseAutenticacion {
  token: string;
  status: number;
}
