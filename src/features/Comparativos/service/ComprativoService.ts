import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { instance } from "../../app/service/instaceAxios";
import type { ComparativoData } from "../interface/compartivo";

export async function getVentaActual(
  filter: filtroBuscadorI
): Promise<ComparativoData> {
  try {
    const response = await instance.post("venta/excel/actual", filter);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVentaAnterior(
  filter: filtroBuscadorI
): Promise<ComparativoData> {
  let fechaInicio: Date = new Date();
  let fechaFin: Date = new Date();
  if (filter.fechaInicio && filter.fechaFin) {
    fechaInicio = new Date(filter.fechaInicio);
    fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
    fechaFin = new Date(filter.fechaFin);
    fechaFin.setFullYear(fechaFin.getFullYear() - 1);
  }
  try {
    const filtroAnterior: filtroBuscadorI = {
      comisiona: filter.comisiona,
      empresa: filter.empresa,
      fechaFin: fechaInicio.toISOString().split("T")[0],
      fechaInicio: fechaFin.toISOString().split("T")[0],
      flagVenta: filter.flagVenta,
      sucursal: filter.sucursal,
      tipoVenta: filter.tipoVenta,
    };
    console.log(filtroAnterior);
    
    const response = await instance.post(
      "venta/excel/anterior",
      filtroAnterior
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
