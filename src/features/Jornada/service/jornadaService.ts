import type { AxiosResponse } from "axios"
import { analitycsV2 } from "../../app/config/analitycsV2"

export async function crearJornada(asesor:string, fechaInicio:Date, fechaFin:Date):Promise<AxiosResponse>{
    try {
        const response = await analitycsV2.post('jornada',{fechaInicio, fechaFin, detalleAsesor:asesor})
        return response
    } catch (error) {
      
        throw error
    }
}


export async function eliminarJornada(id:string):Promise<AxiosResponse>{
    try {
        const response = await analitycsV2.delete(`jornada/${id}`)
        return response
    } catch (error) {
      
        throw error
    }
}
