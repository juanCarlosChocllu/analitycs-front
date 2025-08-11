import type { Datum, SucursalTableData } from "../interface/sucursal.interface";

interface SucursalTableDataWithId extends SucursalTableData {
  id: string;
}

export function transformToTableDataSinFotosensibles(
  data: Datum[]
): SucursalTableDataWithId[] {
  return data.map((sucursal) => {
    const kpi = sucursal.dataKpi[0];

    return {
      id: sucursal.id, // Preservamos el id original
      sucursal: sucursal.sucursal,
      tickets: kpi.tickets as number,
      lentes: kpi.lentes as number,
      ocupacional: kpi.ocupacional as number,
      porcentajeOcupacionales: kpi.porcentajeOcupacionales as number,
      antireflejo: kpi.antireflejo as number,
      porcentajeAntireflejo: kpi.porcentajeAntireflejo as number,
      progresivos: kpi.progresivos as number,
      porcentajeProgresivos: kpi.porcentajeProgresivos as number,
      progresivosOcupacionales: kpi.progresivosOcupacionales as number,
      progresivosOcupacionalesPorcentaje:
        kpi.progresivosOcupacionalesPorcentaje as number,
    };
  });
}

export function transformToTableDataConFotosensibles(
  data: Datum[]
): SucursalTableDataWithId[] {
  return data.map((sucursal) => {
    const kpi = sucursal.dataKpi[0];

    return {
      id: sucursal.id, // Preservamos el id original
      sucursal: sucursal.sucursal,
      tickets: kpi.tickets as number,
      lentes: kpi.lentes as number,
      ocupacional: kpi.ocupacional as number,
      porcentajeOcupacionales: kpi.porcentajeOcupacionales as number,
      antireflejo: kpi.antireflejo as number,
      porcentajeAntireflejo: kpi.porcentajeAntireflejo as number,
      progresivos: kpi.progresivos as number,
      porcentajeProgresivos: kpi.porcentajeProgresivos as number,
      fotosensibles: kpi.fotosensibles as number,
      procentajeFotosensibles: kpi.procentajeFotosensibles as number,
      progresivosOcupacionales: kpi.progresivosOcupacionales as number,
      progresivosOcupacionalesPorcentaje:
        kpi.progresivosOcupacionalesPorcentaje as number,
    };
  });
}

export function transformToTableDataConFotoCromatico(
    data: Datum[]
  ): SucursalTableDataWithId[] {
    return data.map((sucursal) => {
      const kpi = sucursal.dataKpi[0];
  
      return {
        id: sucursal.id, // Preservamos el id original
        sucursal: sucursal.sucursal,
        tickets: kpi.tickets as number,
        lentes: kpi.lentes as number,
        antireflejo: kpi.antireflejo as number,
        porcentajeAntireflejo: kpi.porcentajeAntireflejo as number,
        progresivos: kpi.progresivos as number,
        porcentajeProgresivos: kpi.porcentajeProgresivos as number,
        fotoCromatico: kpi.fotoCromatico as number,
        procentajeFotoCromatico: kpi.procentajeFotoCromatico as number,
      };
    });
  }