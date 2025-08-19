import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { comisionesInstance } from "../../app/service/comisionesInstance"
import type { DatosAsesor, registrarRendimientoDiarioI, RendimientoDiarioI } from "../interface/RendimientoDiario"


export async function listarRendimientoDiarioAsesor():Promise<RendimientoDiarioI[]> {
    try {
        const response = await comisionesInstance.post('rendimiento/diario/listar/asesor')
        return response.data
    } catch (error) {
        throw error
    }
    
}


export async function registrarRendimientoDiarioAsesor(data: registrarRendimientoDiarioI):Promise<RendimientoDiarioI[]> {
    try {
        
        
        const response = await comisionesInstance.post('rendimiento/diario', data)
        return response.data
    } catch (error) {
        throw error
    }
    
}

export async function listarRendimientoAsesor(filtro: filtroBuscadorI):Promise<DatosAsesor[]> {
    try {
        
        
        const response = await comisionesInstance.post('rendimiento/diario/listar', filtro)
        return response.data
    } catch (error) {
        throw error
    }
    
}