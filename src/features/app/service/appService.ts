import {instance} from "./intance";
import type { UltimaDescarga } from "../interfaces/UltimaDescarga";

export const ultimaDescarga = async (): Promise<UltimaDescarga> => {
    try {
        const response = await instance.get("log/venta/descarga");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



export async function  getEmpresas(){
  try {
    const response = await instance.get('empresa')
    return response.data
  } catch (error) {
      throw error
    
    
  }
} 

export async function  getSucursalesPorEmpresa(empresa:string){
    try {
      const response = await instance.get(`sucursalExcel/${empresa}`)
      return response.data
    } catch (error) {
      throw error
      
      
    }
  
  
  }

  
  export async function  getTipoVenta(){
    try {
      const response = await instance.get(`tipo/venta/listar`)
      return response.data
    } catch (error) {
      throw error
      
      
    }
  
  
  }