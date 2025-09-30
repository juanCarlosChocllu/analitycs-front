import type { AxiosResponse } from "axios";
import type { MarcaI } from "../interface/marcaInterface";
import { analitycsV2 } from "../../app/config/analitycsV2";

export async function listarMarca(): Promise<MarcaI[]> {
  try {
    const response = await analitycsV2.get("marca");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function asignarCategoria (categoria:string, marca:string):Promise<AxiosResponse>{
  try {
    const response = await analitycsV2.post("marca/categoria",{
      categoria,
      marca
    });
    return response.data;
  } catch (error) {
    throw error
    
  }
}
