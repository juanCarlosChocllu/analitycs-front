import { analitycsV2 } from "../../app/config/analitycsV2";
import type { ExhibicionI } from "../interface/exhibicion";

export async function registrarExhibicion(nombre: string):Promise<ExhibicionI> {
  try {
    const response = await analitycsV2.post("exhibicion", {
      nombre:nombre,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listarExhibicion():Promise<ExhibicionI[]> {
  try {
    const response = await analitycsV2.get("exhibicion");
    return response.data;
  } catch (error) {
    throw error;
  }
}
