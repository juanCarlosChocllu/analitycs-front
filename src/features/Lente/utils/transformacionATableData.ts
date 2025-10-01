import type { Datum, SucursalTableData } from "../interface/sucursal.interface";

interface SucursalTableDataWithId extends SucursalTableData {
  id: string;
}

export function transformToTableDataSinFotosensibles(
  data: Datum[]
): SucursalTableDataWithId[] {
  return data.filter(Boolean).map((sucursal) => {
    const kpi = sucursal.dataKpi?.[0];

    return {
      id: sucursal.id, // Preservamos el id original
      sucursal: sucursal.sucursal,
      tickets: (kpi?.tickets as number) ?? 0,
      lentes: (kpi?.lentes as number) ?? 0,
      ocupacional: (kpi?.ocupacional as number) ?? 0,
      porcentajeOcupacionales: (kpi?.porcentajeOcupacionales as number) ?? 0,
      antireflejo: (kpi?.antireflejo as number) ?? 0,
      porcentajeAntireflejo: (kpi?.porcentajeAntireflejo as number) ?? 0,
      progresivos: (kpi?.progresivos as number) ?? 0,
      porcentajeProgresivos: (kpi?.porcentajeProgresivos as number) ?? 0,
      progresivosOcupacionales: (kpi?.progresivosOcupacionales as number) ?? 0,
      progresivosOcupacionalesPorcentaje:
        (kpi?.progresivosOcupacionalesPorcentaje as number) ?? 0,
    };
  });
}

export function transformToTableDataConFotosensibles(
  data: Datum[]
): SucursalTableDataWithId[] {
  return data.filter(Boolean).map((sucursal) => {
    const kpi = sucursal.dataKpi?.[0];

    return {
      id: sucursal.id, // Preservamos el id original
      sucursal: sucursal.sucursal,
      tickets: (kpi?.tickets as number) ?? 0,
      lentes: (kpi?.lentes as number) ?? 0,
      ocupacional: (kpi?.ocupacional as number) ?? 0,
      porcentajeOcupacionales: (kpi?.porcentajeOcupacionales as number) ?? 0,
      antireflejo: (kpi?.antireflejo as number) ?? 0,
      porcentajeAntireflejo: (kpi?.porcentajeAntireflejo as number) ?? 0,
      progresivos: (kpi?.progresivos as number) ?? 0,
      porcentajeProgresivos: (kpi?.porcentajeProgresivos as number) ?? 0,
      fotosensibles: (kpi?.fotosensibles as number) ?? 0,
      procentajeFotosensibles: (kpi?.procentajeFotosensibles as number) ?? 0,
      progresivosOcupacionales: (kpi?.progresivosOcupacionales as number) ?? 0,
      progresivosOcupacionalesPorcentaje:
        (kpi?.progresivosOcupacionalesPorcentaje as number) ?? 0,
    };
  });
}

export function transformToTableDataConFotoCromatico(
    data: Datum[]
  ): SucursalTableDataWithId[] {
    return data.filter(Boolean).map((sucursal) => {
      const kpi = sucursal.dataKpi?.[0];
  
      return {
        id: sucursal.id, // Preservamos el id original
        sucursal: sucursal.sucursal,
        tickets: (kpi?.tickets as number) ?? 0,
        lentes: (kpi?.lentes as number) ?? 0,
        antireflejo: (kpi?.antireflejo as number) ?? 0,
        porcentajeAntireflejo: (kpi?.porcentajeAntireflejo as number) ?? 0,
        progresivos: (kpi?.progresivos as number) ?? 0,
        porcentajeProgresivos: (kpi?.porcentajeProgresivos as number) ?? 0,
        fotoCromatico: (kpi?.fotoCromatico as number) ?? 0,
        procentajeFotoCromatico: (kpi?.procentajeFotoCromatico as number) ?? 0,
      };
    });
  }
