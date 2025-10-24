import type { JornadaI } from "../../Jornada/interface/jornada";

export interface asesorSucursalI {
  asesor: string;
  nombreSucursal: string;
}

export interface listarAsesorSucursal {
  _id: string;
  nombre: string;
  jornada:JornadaI
      sucursal:string
}
