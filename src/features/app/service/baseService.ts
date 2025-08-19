import type { EmpresasI, SucursalI, TipoVentaI } from "../interfaces/BuscadorI";
import { comisionesInstance } from "./comisionesInstance";

export async function  getEmpresas():Promise<EmpresasI[]>{
  try {
    const response = await comisionesInstance.get('empresa')
    return response.data
  } catch (error) {
      throw error    
  }
} 

export async function  getSucursalesPorEmpresa(empresa:string):Promise<SucursalI[]>{
    try {
      const response = await comisionesInstance.get(`sucursal/empresa/${empresa}`)
      console.log(response.data);
      return response.data
    } catch (error) {
      throw error
      
      
    }
  
  
  }

  export async function  listarTodasLasScursales():Promise<SucursalI[]>{
    try {
      const response = await comisionesInstance.get(`sucursal`)
      return response.data
    } catch (error) {
      throw error
      
      
    }
  
  
  }

  
  export async function  getTipoVenta():Promise<TipoVentaI[]>{
    try {
      const response = await comisionesInstance.get(`tipo/venta`)
      return response.data
    } catch (error) {
      throw error
      
      
    }
  
  
  }