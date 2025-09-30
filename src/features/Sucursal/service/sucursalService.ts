import { analitycsV2 } from "../../app/config/analitycsV2"
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"

import type { DataAsesor } from "../interface/asersor.interface"
import type { IndicadoresSucursalI } from "../interface/IndicadorSucursal"

export async function  getIndicadoresPorSucursal(filter:filtroBuscadorI):Promise<IndicadoresSucursalI>{  
    try {
     const response = await analitycsV2.post('venta/excel/indicadores/sucursal', filter)
    
     return response.data
    } catch (error) {
        throw error
     
     
    }
 }

 export async function  getIndicadoresPorAsesor(filter:filtroBuscadorI):Promise<DataAsesor[]>{
    try {
     const response = await analitycsV2.post('venta/excel/indicadores/asesor', filter)
     return response.data
    } catch (error) {
            throw error
     
     
    }
 }