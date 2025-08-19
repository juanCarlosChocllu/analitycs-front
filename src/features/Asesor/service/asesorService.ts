import { comisionesInstance } from "../../app/service/comisionesInstance"
import type { asesorSucursalI } from "../interface/asesorSucursal"


export async function listarAsesorSucursal():Promise<asesorSucursalI[]>{
    try {
        const response = await comisionesInstance.get('asesor/sucursal')
        return response.data
    } catch (error) {
        throw error
    }
}