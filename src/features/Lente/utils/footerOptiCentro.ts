import type { Datum, FooterValues } from "../interface/sucursal.interface";

interface TotalsData {
    lentes: number;
    tickets: number;
    materialUnitario: number;
    ocupacional: number;
    antireflejo: number;
    porcentajeAntireflejo: number;
    porcentajeMaterialUnitario: number;
    porcentajeOcupacionales: number;
    porcentajeProgresivos: number;
    progresivos: number;
    progresivosOcupacionales: number;
    progresivosOcupacionalesPorcentaje: number;
}

const getNumericValue = (value: number | null | undefined): number => {
    return typeof value === 'number' ? value : 0;
};


const calculatePercentage = (numerator: number, denominator: number): number => {
    return denominator > 0 ? (numerator / denominator) * 100 : 0;
};

export const footerOpticentro = (data: Datum[]): TotalsData => {
    const totals: TotalsData = {
        lentes: 0,
        tickets: 0,
        materialUnitario: 0,
        ocupacional: 0,
        antireflejo: 0,
        porcentajeAntireflejo: 0,
        porcentajeMaterialUnitario: 0,
        porcentajeOcupacionales: 0,
        porcentajeProgresivos: 0,
        progresivos: 0,
        progresivosOcupacionales: 0,
        progresivosOcupacionalesPorcentaje: 0,
    };

    data.forEach((kpi: Datum) => {
          totals.lentes += getNumericValue(kpi.dataKpi[0].lentes) 
          totals.tickets += getNumericValue(kpi.dataKpi[0].tickets)
          totals.ocupacional += getNumericValue(kpi.dataKpi[0].ocupacional) 
          totals.antireflejo += getNumericValue(kpi.dataKpi[0].antireflejo)
          totals.progresivos += getNumericValue(kpi.dataKpi[0].progresivos) 
          totals.progresivosOcupacionales += getNumericValue(kpi.dataKpi[0].progresivosOcupacionales)
    
        });

    totals.porcentajeAntireflejo = calculatePercentage(totals.antireflejo, totals.lentes);
    totals.porcentajeOcupacionales = calculatePercentage(totals.ocupacional, totals.lentes);
    totals.porcentajeProgresivos = calculatePercentage(totals.progresivos, totals.lentes);
    totals.porcentajeMaterialUnitario = calculatePercentage(totals.materialUnitario, totals.lentes);
    totals.progresivosOcupacionalesPorcentaje = calculatePercentage(totals.progresivosOcupacionales, totals.lentes);


    
    return totals;
};

export const calculateFooterOpticentro = (data: Datum[]) => {


    const totals = footerOpticentro(data);
    const footerValues: FooterValues[] = [
        { columnId: 'tickets', value: totals.tickets },
        { columnId: 'lentes', value: totals.lentes.toString() },
        { columnId: 'ocupacional', value: totals.ocupacional.toString() },
        { columnId: 'porcentajeOcupacionales', value: totals.porcentajeOcupacionales.toFixed(2) + ' %' },
        { columnId: 'antireflejo', value: totals.antireflejo.toString() },
        { columnId: 'porcentajeAntireflejo', value: totals.porcentajeAntireflejo.toFixed(2) + ' %' },
        { columnId: 'progresivos', value: totals.progresivos.toString() },
        { columnId: 'porcentajeProgresivos', value: totals.porcentajeProgresivos.toFixed(2) + ' %' },
        { columnId: 'progresivosOcupacionales', value: totals.progresivosOcupacionales.toString() },
        { columnId: 'progresivosOcupacionalesPorcentaje', value: totals.progresivosOcupacionalesPorcentaje.toFixed(2) + ' %' },
    ];
    return footerValues;
}
