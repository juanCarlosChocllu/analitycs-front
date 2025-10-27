
import { analitycsV2 } from "../../app/config/analitycsV2";
import type { Data, DiaModal, NombreDia } from "../interfaces/DiaData.interface";

export async function crearDias(dataSend: Data) {
  const { nombre, tipo, data } = dataSend;
  try {
    const response = await analitycsV2.post("dias", {
      nombre,
      tipo,
      data,
    });
 
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const listarNombreDias = async (): Promise<NombreDia[]> => {
  try {
    const response = await analitycsV2.get("nombre/dia");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarDias = async (diaNombre: string): Promise<DiaModal[]> => {
  try {
    const response = await analitycsV2.get(`dias/${diaNombre}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const borrarDia = async (dia: string) => {
  try {
    
    const response = await analitycsV2.delete(`dias/${dia}`);
    return response.data;
  } catch (error) {

    throw error;
  }
};


export const borrarDiaNombre =async(id:string)=>{
    try {
            const response = await  analitycsV2.delete(`nombre/dia/${id}`)
            return response.data
    } catch (error) {
        throw error
    }
}