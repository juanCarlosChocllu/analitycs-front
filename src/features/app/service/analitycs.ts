import type { EmpresasI, SucursalI, TipoVentaI } from "../interfaces/BuscadorI";
import { instanceAnalitycs } from "./instanecAnalitycs";

export async function getEmpresas(): Promise<EmpresasI[]> {
  try {
    const response = await instanceAnalitycs.get("empresa");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getSucursalesPorEmpresa(
  empresa: string
): Promise<SucursalI[]> {
  try {
    const response = await instanceAnalitycs.get(`sucursalExcel/${empresa}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listarTodasLasScursales(): Promise<SucursalI[]> {
  try {
    const response = await instanceAnalitycs.get(`sucursales`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTipoVenta(): Promise<TipoVentaI[]> {
  try {
    const response = await instanceAnalitycs.get(`tipo/venta/listar`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
