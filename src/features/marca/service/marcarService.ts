import type { AxiosResponse } from "axios";
import type { MarcaI } from "../interface/marcaInterface";
import { instanceAnalitycs } from "../../app/service/instanecAnalitycs";

export async function listarMarca(): Promise<MarcaI[]> {
  try {
    const response = await instanceAnalitycs.get("marca");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function asignarCategoria (categoria:string, marca:string):Promise<AxiosResponse>{
  try {
    const response = await instanceAnalitycs.post("marca/categoria",{
      categoria,
      marca
    });
    return response.data;
  } catch (error) {
    throw error
    
  }
}
