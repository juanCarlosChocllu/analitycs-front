import { comisionesInstance } from "../../app/service/comisionesInstance";
import type { autenticacion } from "../interface/autenticaicon";
import type { ResponseAutenticacion } from "../../app/interfaces/autenticacion";


export async  function  autenticacionAsesorService(data:autenticacion):Promise<ResponseAutenticacion>{
    try {       
        const response = await comisionesInstance.post('autenticacion', data)
        return response.data
    } catch (error) {
        throw error    
    }
}