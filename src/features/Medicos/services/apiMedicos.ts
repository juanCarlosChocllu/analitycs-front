import { instance } from "../../app/service/instaceAxios";
import type { recetaMedicoInterface, ventaMedicoInterface } from "../interfaces/FiltroMedico";
import type { SucursalVenta } from "../interfaces/Medicos";

export const optometraActual = async (data: ventaMedicoInterface): Promise<SucursalVenta[]> => {
    try {
        const response = await instance.post("venta/recetas/actual/medicos", data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async  function optometraAnterior(data: ventaMedicoInterface): Promise<SucursalVenta[]>{

    
    const fechaInicio = new Date(data.fechaInicio || '');

    fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
    const fechaFin= new Date(data.fechaFin || '');
  
    
    
    fechaFin.setFullYear(fechaFin.getFullYear() - 1);

    const updatedData = {
        ...data,
        fechaInicio: fechaInicio.toISOString().split('T')[0], // Convertir a formato "YYYY-MM-DD"
        fechaFin: fechaFin.toISOString().split('T')[0],       // Convertir a formato "YYYY-MM-DD"
    };
     
    try {
        const response = await instance.post('venta/recetas/anterior/medicos', updatedData)
        return response.data
        
    } catch (error) {

        throw error
        
    }

}

export async  function oftalmolgos(data: ventaMedicoInterface): Promise<any>{
    try {
        const response = await instance.post('venta/medidas/oftalmologos', data)
        return response.data
        
    } catch (error) {
        throw error
        
    }



}

export async  function buscarOftalmolgo(oftalmologo: string): Promise<any>{
    const data = {
        oftalmologo
    }

    
    try {
        const response = await instance.post('oftalmologo/buscar', data)
        return response.data
        
    } catch (error) {
        throw error
        
    }

    

}

export const   listarMedicos = async(oftalmologo: string): Promise<any>=>{
    try {
        const response = await instance.post('medico/buscar', {
            oftalmologo:oftalmologo
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export const listarRecetasMedicos = async(data: recetaMedicoInterface): Promise<any>=>{
    try {
        const response = await instance.post('venta/recetas/medicos', {
                fechaInicio:data.fechaInicio,
                fechaFin:data.fechaFin
        })
        return response.data
    } catch (error) {
        throw error
    }

}


