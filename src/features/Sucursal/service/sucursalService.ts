import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { instance } from "../../app/service/instaceAxios"
import type { IndicadoresSucursalI } from "../interface/IndicadorSucursal"

export async function  getIndicadoresPorSucursal(filter:filtroBuscadorI):Promise<IndicadoresSucursalI>{  
    try {
     const response = await instance.post('gestion/excel/indicadores/sucursal', filter)
    
     return response.data
    } catch (error) {
        throw error
     
     
    }
 }