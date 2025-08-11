import type { Venta, VentaAsesor } from "../interface/asesor.interface";

export function transformToTableDataSinFotosensiblesAsesor(data: Venta[]): Venta[] {
  return data.map((item) => {
      return {
        id: item.idAsesor,
        asesor: item.asesor,
        tickets: item.tickets,
        lentes: item.lentes,
        ocupacional: item.ocupacional,
        porcentajeOcupacionales: item.porcentajeOcupacionales,
        antireflejo: item.antireflejo,
        porcentajeAntireflejo: item.porcentajeAntireflejo,
        progresivos: item.progresivos,
        porcentajeProgresivos: item.porcentajeProgresivos,
        progresivosOcupacionales: item.progresivosOcupacionales,
        progresivosOcupacionalesPorcentaje:
          item.progresivosOcupacionalesPorcentaje,
      } as unknown as Venta; // Cast explícito para TypeScript
    });
}

export function transformToTableDataConFotosensiblesAsesor(data: Venta[]): VentaAsesor[] {
  return data.map((item) => {
      return {
        id: item.idAsesor,
        asesor: item.asesor,
        tickets: item.tickets,
        lentes: item.lentes,
        ocupacional: item.ocupacional,
        porcentajeOcupacionales: item.porcentajeOcupacionales,
        antireflejo: item.antireflejo,
        porcentajeAntireflejo: item.porcentajeAntireflejo,
        progresivos: item.progresivos,
        porcentajeProgresivos: item.porcentajeProgresivos,
        fotosensibles: item.fotosensibles,
        procentajeFotosensibles: item.procentajeFotosensibles,
        progresivosOcupacionales: item.progresivosOcupacionales,
        progresivosOcupacionalesPorcentaje:
          item.progresivosOcupacionalesPorcentaje,
      } as VentaAsesor; // Cast explícito para TypeScript
    });
}

export function transformToTableDataConFotoCromaticoAsesor(
  data: Venta[]
): Venta[] {
  return data.map((item) => {
      return {
        id: item.idAsesor,
        asesor: item.asesor,
        tickets: item.tickets,
        lentes: item.lentes,
        antireflejo: item.antireflejo,
        porcentajeAntireflejo: item.porcentajeAntireflejo,
        progresivos: item.progresivos,
        porcentajeProgresivos: item.porcentajeProgresivos,
        fotoCromatico: item.fotoCromatico,
        procentajeFotoCromatico: item.procentajeFotoCromatico,
      } as unknown as Venta; // Cast explícito para TypeScript
    });
}


