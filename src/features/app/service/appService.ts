
import type { EmpresasI, SucursalI, TipoVentaI } from "../interfaces/BuscadorI";
import type { UltimaDescarga } from "../interfaces/UltimaDescarga";
import { instance } from "./instaceAxios";

export const ultimaDescarga = async (): Promise<UltimaDescarga> => {
    try {
        const response = await instance.get("log/venta/descarga");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



export async function  getEmpresas():Promise<EmpresasI[]>{
  try {
    const response = await instance.get('empresa')
    return response.data
  } catch (error) {
      throw error    
  }
} 

export async function  getSucursalesPorEmpresa(empresa:string):Promise<SucursalI[]>{
    try {
      const response = await instance.get(`sucursalExcel/${empresa}`)
      return response.data
    } catch (error) {
      throw error
      
      
    }
  
  
  }

  
  export async function  getTipoVenta():Promise<TipoVentaI[]>{
    try {
      const response = await instance.get(`tipo/venta/listar`)
      return response.data
    } catch (error) {
      throw error
      
      
    }
  
  
  }