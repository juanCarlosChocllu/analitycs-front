import { analitycsV2 } from "../../app/config/analitycsV2";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";


import type { detalleProductoKpiI, kpiProductosI, ProductosStockI } from "../interface/productos";

export async function reporteProductoActual(
  filtro: filtroBuscadorI
): Promise<ProductosStockI[]> {
  try {
    const response = await analitycsV2.post(
      "venta/producto/reporte/actual",
      filtro
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function reporteProductoAnterior(
  filtro: filtroBuscadorI
): Promise<ProductosStockI[]> {
  try {
    if (filtro.fechaInicio && filtro.fechaFin) {
      let fechaInicio = new Date(filtro.fechaInicio);
      fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
      let fechaFin = new Date(filtro.fechaFin);
      fechaFin.setFullYear(fechaFin.getFullYear() - 1);
     
        console.log(fechaFin.toISOString().split("T")[0]);
        
      const filtroAnterior: filtroBuscadorI = {
        fechaFin: fechaFin.toISOString().split("T")[0],
        fechaInicio: fechaInicio.toISOString().split("T")[0],
        comisiona:filtro.comisiona,
        sucursal:filtro.sucursal,
        flagVenta:filtro.flagVenta,
        rubro:filtro.rubro,
        tipoVenta:filtro.tipoVenta
 
      };      
      const response = await analitycsV2.post(
        "venta/producto/reporte/anterior",
        filtroAnterior
      );
      return response.data;
    }
    return []
  } catch (error) {
    throw error;
  }
}

export async function kpiProductos( filtro: filtroBuscadorI):Promise<kpiProductosI[]> {
  try {
    const response = await analitycsV2.post('venta/producto/kpi', filtro)
    
    
    return response.data
  } catch (error) {
     throw error
  }
}

export async function detalleProductoKpi( filtro: filtroBuscadorI, sucursal:string, rubro:string):Promise<detalleProductoKpiI[]> {
  try {
    const response = await analitycsV2.post(`venta/producto/kpi/detalle/${sucursal}/${rubro}`, filtro)
    
    
    return response.data
  } catch (error) {
     throw error
  }
}

