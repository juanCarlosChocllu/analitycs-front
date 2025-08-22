import { instance } from "../../app/service/instaceAxios";
import type { Data, DiaModal, NombreDia } from "../interfaces/DiaData.interface";

export async function crearDias(dataSend: Data) {
  const { nombre, tipo, data } = dataSend;
  try {
    const response = await instance.post("dias", {
      nombre,
      tipo,
      data,
    });
    console.log("crear dias", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const listarNombreDias = async (): Promise<NombreDia[]> => {
  try {
    const response = await instance.get("nombre/dia");
    console.log("listar nombre dias", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarDias = async (diaNombre: string): Promise<DiaModal[]> => {
  try {
    const response = await instance.get(`dias/${diaNombre}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const borrarDia = async (dia: string) => {
  try {
    console.log("borrar dia", dia);
    const response = await instance.delete(`dias/${dia}`);
    return response.data;
  } catch (error) {
    console.log("borrar dia", error);
    throw error;
  }
};


export const borrarDiaNombre =async(id:string)=>{
    try {
            const response = await  instance.delete(`nombre/dia/${id}`)
            return response.data
    } catch (error) {
        throw error
    }
}