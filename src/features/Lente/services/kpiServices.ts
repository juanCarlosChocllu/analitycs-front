import { instance } from "../../app/service/instaceAxios"

import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";

export async function kpiEmpresasLentes(data: filtroBuscadorI) {
  console.log("data",data);
    try {
      const kpi = await instance.post("venta/kpi/empresas/lentes", data);
      console.log("kpi empresas",kpi.data);
      
      return kpi.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function ventaKpiInformacionTodasEmpresas(
    data: filtroBuscadorI
  ) {
    const {
      empresa,
      fechaInicio,
      fechaFin,
      tipoVenta,
      comisiona,
      flagVenta
    } = data;
    console.log("data ventaKpiInformacionTodasEmpresasq",data);
    try {
      const response = await instance.post(
        `venta/kpi/informacion/empresas/todas`,
        {
          empresa,
          fechaInicio,
          fechaFin,
          tipoVenta,
          comisiona,
          flagVenta,
        },
      );
      console.log("kpiInformacion todas empresas",response);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function ventaKpiInformacion( data: filtroBuscadorI,sucursal:string) {
    const {
      fechaInicio,
      fechaFin,
      tipoVenta,
      comisiona,
      flagVenta
    } = data;
    const dataSend = {
      sucursal,
      fechaInicio,
      fechaFin,
      tipoVenta,
      comisiona,
      flagVenta,
    };

    try {
      const kpiInformacion = await instance.post(
        `venta/kpi/informacion/${sucursal}`,
        dataSend,
      );
      console.log("kpiInformacion venta",kpiInformacion);
      
      return kpiInformacion;
    } catch (error) {
      console.log(error);
    }
  }