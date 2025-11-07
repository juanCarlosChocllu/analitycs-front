import type { AxiosResponse } from "axios";
import { analitycsV2 } from "../../app/config/analitycsV2";
import type { buscadorFacingI, facingI, listarFacingI } from "../interface/facing";

export async function registrarFacing(data: facingI): Promise<AxiosResponse> {
  try {
    const response = await analitycsV2.post("facing", data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function listarFacing(filtro:buscadorFacingI): Promise<listarFacingI[]> {
  try {    
    const response = await analitycsV2.post("facing/listar", filtro);
    return response.data;
  } catch (error) {

    throw error;
  }
}



export async function eliminarFacing(id:string): Promise<AxiosResponse> {
  try {
    const response = await analitycsV2.delete(`facing/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function cargaMasivaFacing(file: FormData):Promise<AxiosResponse> {
  try {
   
    const response = await analitycsV2.post("facing/xlsx/carga/masiva", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
