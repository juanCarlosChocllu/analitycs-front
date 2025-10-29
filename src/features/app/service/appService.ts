
import { analitycsV2 } from "../config/analitycsV2";
import type { EmpresasI, SucursalI, TipoVentaI } from "../interfaces/BuscadorI";
import type { UltimaDescarga } from "../interfaces/UltimaDescarga";

export const ultimaDescarga = async (): Promise<UltimaDescarga[]> => {
  try {
    const response = await analitycsV2.get("log/venta/descarga");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const mostrarSucursal = async (): Promise<{
  _id: string;
  sucursal: string;
}> => {
  try {
    const response = await analitycsV2.get("asesor/montrarSucursalUsuario");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function getEmpresas(): Promise<EmpresasI[]> {
  try {
    const response = await analitycsV2.get("empresa");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getSucursalesPorEmpresa(
  empresa: string
): Promise<SucursalI[]> {
  try {
    const response = await analitycsV2.get(`sucursal/${empresa}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listarTodasLasScursales(): Promise<SucursalI[]> {
  try {
    const response = await analitycsV2.get(`sucursales`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTipoVenta(): Promise<TipoVentaI[]> {
  try {
    const response = await analitycsV2.get(`tipo/venta/listar`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function obtenerCicloComercial(): Promise<{fechaInicio:Date, fechaFin:Date}> {
  try {
    const response = await analitycsV2.get(`ciclo/comercial`);    
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function verificarRol(): Promise<{
  rol: string;
  _id: string;
  sucursal: string;
  empresa: string;
  idEmpresa: string;
  idSucursal: string;
  nombre:string
}> {
  try {
    const response = await analitycsV2.get(`usuarios/verificar/rol`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
