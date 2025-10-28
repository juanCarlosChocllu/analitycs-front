
import type { DatosVenta } from "../interface/avanceVentas";
import type { PerformanceData, ventaAsesor } from "../interface/RendimientoDiario";

import type { ventaAsesorI } from "../interface/RendimientoDiario";


export function ventasPordiaAsesor(
  venta: ventaAsesor[] | ventaAsesorI[],
  metaTicket: number
): number {
  if (metaTicket <= 0) {
    return 0;
  }
  let totalDias = 0;
  for (const v of venta) {
    totalDias += v.dias;
  }
  if (totalDias <= 0) {
    return 0;
  }

  return Number((metaTicket / totalDias).toFixed(2));
}

export function cumplimientoMetaAsesor(total: number, metaAsesor: number) {
  if (total > 0 && metaAsesor > 0) {
    return ((total / metaAsesor) * 100).toFixed(2);
  }
  return 0;
}



export function metasFaltantes(metaAsesor:number, total:number){
    if (metaAsesor <= 0) return 0;
    const faltantes = metaAsesor - total;
    return faltantes > 0 ? faltantes : 0;
}

export function resumenTotales(data: DatosVenta[]):PerformanceData{
  if (!data || data.length === 0) {
    return {
      meta: 0,
      totalVendidos: 0,
      totalEntregados: 0,
      faltaVentas: 0,
      faltaEntregas: 0,
      avanceVentas: "0%",
      avanceEntregas: "0%",
    };
  }

  const primera = data[0];
  const ultima = data[data.length - 1];

  const totalVentas = ultima?.totales?.vendidosAcumulados ?? data.reduce((acc, item) => acc + item.vendidos, 0);
  const totalEntregas = ultima?.totales?.entregadasAcumuladas ?? data.reduce((acc, item) => acc + item.entregadas, 0);

  const metaVentas = primera.metaAcumuladaVendida ?? 0;
  const metaEntregas = primera.metaAcumuladaEntregada ?? 0;

  const avanceVentas = metaVentas > 0 ? `${((totalVentas / metaVentas) * 100).toFixed(2)}%` : "0%";
  const avanceEntregas = metaEntregas > 0 ? `${((totalEntregas / metaEntregas) * 100).toFixed(2)}%` : "0%";
  const faltaVentas = metasFaltantes(metaVentas, totalVentas);
  const faltaEntregas = metasFaltantes(metaEntregas, totalEntregas);

  return {
    meta: metaVentas,
    totalVendidos: totalVentas,
    totalEntregados: totalEntregas,
    avanceVentas,
    avanceEntregas,
    faltaVentas,
    faltaEntregas,
  };

}
