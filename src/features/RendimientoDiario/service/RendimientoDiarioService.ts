import type { AxiosResponse } from "axios"
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { analitycsV2 } from "../../app/service/analitycsV2"

import type {  registrarRendimientoDiarioI, RendimientoDiarioI, responseRendimiento, SucursalData, Venta, VentaMestaAsesor } from "../interface/RendimientoDiario"
import type { AvanceVentas } from "../interface/avanceVentas";



export async function listarRendimientoDiarioAsesor(pagina:number):Promise<responseRendimiento<RendimientoDiarioI>> {
    try {
        const response = await analitycsV2.get('rendimiento/diario/listar/asesor',{
            params:{
                pagina:pagina
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
    
}

export async function ListarAvanceMetasAsesor(filtro: filtroBuscadorI):Promise<VentaMestaAsesor[]> {
    try {
        
        
        const response = await analitycsV2.post('venta/metas/porAsesor', filtro)
        return response.data
    } catch (error) {
        throw error
    }
    
}


export async function registrarRendimientoDiarioAsesor(data: registrarRendimientoDiarioI):Promise<AxiosResponse> {
    try {
        
        
        const response = await analitycsV2.post('rendimiento/diario', data)
        return response.data
    } catch (error) {
        throw error
    }
    
}

export async function editarRendimientoDiarioAsesor(data: registrarRendimientoDiarioI, id:string):Promise<AxiosResponse> {
    try {
        
        
        const response = await analitycsV2.patch(`rendimiento/diario/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
    
}


export async function listarRendimientoAsesor(filtro: filtroBuscadorI):Promise<SucursalData[]> {
    try {
        const response = await analitycsV2.post('rendimiento/diario/listar', filtro)
        console.log("response Asesor 12: ",response.data)
        return response.data
    } catch (error) {
        throw error
    }
    
}

export async function listarRendimientoPorAsesor():Promise<Venta[]> {
    try {
        
        
        const response = await analitycsV2.post('rendimiento/diario/asesor')
        return response.data
    } catch (error) {
        throw error
    }
    
}

export async function listarAvanceVentas(filtro: filtroBuscadorI):Promise<AvanceVentas[]> {
    try {

        console.log("filtro Asesor: ",filtro)
        const response = await analitycsV2.post('venta/avance/local', filtro)
        console.log("response Asesor: ",response.data)

        return response.data
    } catch (error) {
        throw error
    }
    
}