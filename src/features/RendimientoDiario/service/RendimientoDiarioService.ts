import type { AxiosResponse } from "axios"
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { comisionesInstance } from "../../app/service/comisionesInstance"
import type { DatosAsesor, registrarRendimientoDiarioI, RendimientoDiarioI, responseRendimiento } from "../interface/RendimientoDiario"


export async function listarRendimientoDiarioAsesor(pagina:number):Promise<responseRendimiento<RendimientoDiarioI>> {
    try {
        const response = await comisionesInstance.get('rendimiento/diario/listar/asesor',{
            params:{
                pagina:pagina
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
    
}


export async function registrarRendimientoDiarioAsesor(data: registrarRendimientoDiarioI):Promise<AxiosResponse> {
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