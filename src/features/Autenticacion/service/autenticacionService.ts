
import type { autenticacion } from "../interface/autenticaicon";
import type { ResponseAutenticacion } from "../../app/interfaces/autenticacion";
import { instance } from "../../app/config/instaceAxios";
import { analitycsV2 } from "../../app/config/analitycsV2";


export async  function  autenticacionAsesorService(data:autenticacion):Promise<ResponseAutenticacion>{
    try {       
        const response = await analitycsV2.post('autenticacion', data)
        return response.data
    } catch (error) {
        throw error    
    }
}

export async  function  autenticacion2(data:autenticacion):Promise<ResponseAutenticacion>{
    try {       
        const response = await instance.post('autenticacion', data)
        return response.data
    } catch (error) {
        throw error    
    }
}