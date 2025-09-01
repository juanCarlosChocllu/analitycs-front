import type { AxiosResponse } from "axios"
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { comisionesInstance } from "../../app/service/comisionesInstance"
import type { DatosAsesor, registrarRendimientoDiarioI, RendimientoDiarioI, responseRendimiento, VentaMestaAsesor } from "../interface/RendimientoDiario"
import type { Venta } from "../interface/RendimientoDiario";
import type { AvanceVentas } from "../interface/avanceVentas";


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

export async function ListarAvanceMetasAsesor(filtro: filtroBuscadorI):Promise<VentaMestaAsesor[]> {
    try {
        
        
        const response = await comisionesInstance.post('venta/metas/porAsesor', filtro)
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

export async function editarRendimientoDiarioAsesor(data: registrarRendimientoDiarioI, id:string):Promise<AxiosResponse> {
    try {
        
        
        const response = await comisionesInstance.patch(`rendimiento/diario/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
    
}


export async function listarRendimientoAsesor(filtro: filtroBuscadorI):Promise<DatosAsesor[]> {
    try {
        
        console.log("filtro Asesor: ",filtro)
        const response = await comisionesInstance.post('rendimiento/diario/listar', filtro)
        console.log("response Asesor: ",response.data)
        return response.data
    } catch (error) {
        throw error
    }
    
}

export async function listarRendimientoPorAsesor():Promise<Venta[]> {
    try {
        
        
        const response = await comisionesInstance.post('rendimiento/diario/asesor')
        return response.data
    } catch (error) {
        throw error
    }
    
}

export async function listarAvanceVentas(filtro: filtroBuscadorI):Promise<AvanceVentas[]> {
    try {
        console.log("filtro Asesor: ",filtro)
        const response = await comisionesInstance.post('venta/avance/local', filtro)
        console.log("response Asesor: ",response.data)
        return response.data
    } catch (error) {
        throw error
    }
    
}