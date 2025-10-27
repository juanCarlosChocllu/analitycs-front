import type { Datum, FooterValues } from "../interface/sucursal.interface";

interface TotalsData {
  lentes: number;
  tickets: number;
  antireflejo: number;
  fotosensibles: number;
  ocupacional: number;
  progresivos: number;
  progresivosOcupacionales: number;
  porcentajeAntireflejo: number;
  porcentajeOcupacionales: number;
  porcentajeProgresivos: number;
  porcentajeFotosensibles: number;
  porcentajeProgresivosOcupacionales: number;
}

const getNumericValue = (value: number | null | undefined): number => {
  return typeof value === "number" ? value : 0;
};

const calculatePercentage = (
  numerator: number,
  denominator: number
): number => {
  return denominator > 0 ? (numerator / denominator) * 100 : 0;
};

export const footerTuOptica = (data: Datum[]): TotalsData => {
  const dataTotal = {
    lentes: 0,
    tickets: 0,
    antireflejo: 0,
    fotosensibles: 0,
    ocupacional: 0,
    progresivos: 0,
    progresivosOcupacionales: 0,
    porcentajeAntireflejo: 0,
    porcentajeOcupacionales: 0,
    porcentajeProgresivos: 0,
    porcentajeFotosensibles: 0,
    porcentajeProgresivosOcupacionales: 0,
  };
  data.forEach((item) => {
    item.dataKpi.forEach((kpi) => {
      dataTotal.lentes += getNumericValue(kpi.lentes);
      dataTotal.tickets += getNumericValue(kpi.tickets);
      dataTotal.antireflejo += getNumericValue(kpi.antireflejo);
      dataTotal.fotosensibles += getNumericValue(kpi.fotosensibles);
      dataTotal.ocupacional += getNumericValue(kpi.ocupacional);
      dataTotal.progresivos += getNumericValue(kpi.progresivos);
      dataTotal.progresivosOcupacionales += getNumericValue(
        kpi.progresivosOcupacionales
      );
    });
  });

  dataTotal.porcentajeAntireflejo = calculatePercentage(
    dataTotal.antireflejo,
    dataTotal.lentes
  );

  dataTotal.porcentajeOcupacionales = calculatePercentage(
    dataTotal.ocupacional,
    dataTotal.lentes
  );

  dataTotal.porcentajeProgresivos = calculatePercentage(
    dataTotal.progresivos,
    dataTotal.lentes
  );

  dataTotal.porcentajeFotosensibles = calculatePercentage(
    dataTotal.fotosensibles,
    dataTotal.lentes
  );

  dataTotal.porcentajeProgresivosOcupacionales = calculatePercentage(
    dataTotal.progresivosOcupacionales,
    dataTotal.lentes
  );
  return dataTotal;
};

export const calculateFooterTuOptica = (data: Datum[]) => {

  const totals = footerTuOptica(data);
  const footerValues: FooterValues[] = [
    { columnId: "tickets", value: totals.tickets.toString() },
    { columnId: "lentes", value: totals.lentes.toString() },
    { columnId: "antireflejo", value: totals.antireflejo.toString() },
    {
      columnId: "porcentajeAntireflejo",
      value: totals.porcentajeAntireflejo.toFixed(2) + " %",
    },
    { columnId: "ocupacional", value: totals.ocupacional.toString() },
    {
      columnId: "porcentajeOcupacionales",
      value: totals.porcentajeOcupacionales.toFixed(2) + " %",
    },
    { columnId: "progresivos", value: totals.progresivos.toString() },
    {
      columnId: "porcentajeProgresivos",
      value: totals.porcentajeProgresivos.toFixed(2) + " %",
    },
    { columnId: "fotosensibles", value: totals.fotosensibles.toString() },
    {
      columnId: "porcentajeFotosensibles",
      value: totals.porcentajeFotosensibles.toFixed(2) + " %",
    },
    {
      columnId: "progresivosOcupacionales",
      value: totals.progresivosOcupacionales.toString(),
    },
    {
      columnId: "progresivosOcupacionalesPorcentaje",
      value: totals.porcentajeProgresivosOcupacionales.toFixed(2) + " %",
    },
  ];
  return footerValues;
};
