
import { analitycsV2 } from "../../app/config/analitycsV2";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import type { InformacionAsesor } from "../interface/asesor.interface";
import type { KpiMaterialI } from "../interface/material";

export async function kpiEmpresasLentes(data: filtroBuscadorI) {
  console.log("data", data);
  try {
    const kpi = await analitycsV2.post("venta/kpi/empresas/lentes", data);
    console.log("kpi empresas", kpi.data);

    return kpi.data;
  } catch (error) {
    throw error;
  }
}

export async function ventaKpiInformacionTodasEmpresas(data: filtroBuscadorI) {
  const { empresa, fechaInicio, fechaFin, tipoVenta, comisiona, flagVenta } =
    data;
  console.log("data ventaKpiInformacionTodasEmpresasq", data);
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
    console.log("kpiInformacion todas empresas", response);

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
    console.log("kpiInformacion venta", kpiInformacion);

    return kpiInformacion;
  } catch (error) {
    console.log("error ventaKpiInformacion", error);
  }
}

export async function ventasLentesAsesores(data: filtroBuscadorI) {
  try {
    const response = await analitycsV2.post("venta/lente/asesores/sucursal", data);
    console.log("ventas lentes asesores", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function informacionLenteAsesor(asesor: string, data: filtroBuscadorI): Promise<InformacionAsesor> {
  try {
    const response = await analitycsV2.post(`venta/lente/informacion/asesor/${asesor}`, data);
    console.log('informacion lente asesor',response.data);
    
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