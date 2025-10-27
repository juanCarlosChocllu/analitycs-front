
import { analitycsV2 } from "../../app/config/analitycsV2";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import type { InformacionAsesor } from "../interface/asesor.interface";
import type { KpiMaterialI } from "../interface/material";

export async function kpiEmpresasLentes(data: filtroBuscadorI) {
  try {
    const kpi = await analitycsV2.post("venta/kpi/empresas/lentes", data);
  
    return kpi.data;
  } catch (error) {
    throw error;
  }
}

export async function ventaKpiInformacionTodasEmpresas(data: filtroBuscadorI) {
  const { empresa, fechaInicio, fechaFin, tipoVenta, comisiona, flagVenta } =
    data;

  try {
    const response = await analitycsV2.post(
      `venta/kpi/informacion/empresas/todas`,
      {
        empresa,
        fechaInicio,
        fechaFin,
        tipoVenta,
        comisiona,
        flagVenta,
      }
    );


    return response;
  } catch (error) {
    throw error;
  }
}

export async function ventaKpiInformacion(
  data: filtroBuscadorI,
  sucursal: string
) {
  const { fechaInicio, fechaFin, tipoVenta, comisiona, flagVenta } = data;
  const dataSend = {
    sucursal,
    fechaInicio,
    fechaFin,
    tipoVenta,
    comisiona,
    flagVenta,
  };

  try {
    const kpiInformacion = await analitycsV2.post(
      `venta/kpi/informacion/${sucursal}`,
      dataSend
    );
   

    return kpiInformacion;
  } catch (error) {
     throw error
  }
}

export async function ventasLentesAsesores(data: filtroBuscadorI) {
  try {
    const response = await analitycsV2.post("venta/lente/asesores/sucursal", data);
 

    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function informacionLenteAsesor(asesor: string, data: filtroBuscadorI): Promise<InformacionAsesor> {
  try {
    const response = await analitycsV2.post(`venta/lente/informacion/asesor/${asesor}`, data);
 
    
    return response.data;
  } catch (error) {
    throw error
  }
    
}
export async function kpiMaterial( filtro: filtroBuscadorI):Promise<KpiMaterialI[]> {
  try {
    const response = await analitycsV2.post("venta/kpi/material", filtro)
    
    
    return response.data
  } catch (error) {
     throw error
  }
}