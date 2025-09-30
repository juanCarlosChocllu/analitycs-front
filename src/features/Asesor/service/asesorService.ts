
import { analitycsV2 } from "../../app/config/analitycsV2"
import type { asesorSucursalI } from "../interface/asesorSucursal"


export async function listarAsesorSucursal():Promise<asesorSucursalI[]>{
    try {
        const response = await analitycsV2.get('asesor/sucursal')
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarAsesorSucursal2(usuario:string):Promise<asesorSucursalI[]>{

    
    try {
        const response = await analitycsV2.get(`asesor/sucursal/${usuario}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function asignarSucursal(asesor:string, usuario:string):Promise<{status:number}>{
    try {
        const response = await analitycsV2.get(`usuario/asignar/sucursal/${asesor}/${usuario}`)
        return response.data
    } catch (error) {
        throw error
    }
}