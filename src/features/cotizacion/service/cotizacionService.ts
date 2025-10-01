import { analitycsV2 } from "../../app/config/analitycsV2";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import type { CotizacionI } from "../interface/Cotizacion";

export async function reporteCotizacion(data: filtroBuscadorI):Promise<CotizacionI[]> {
  try {
    const response = await analitycsV2.post(`cotizacion/reporte`, data);
    return response.data;
  } catch (error) {
    throw error
  }
    
}