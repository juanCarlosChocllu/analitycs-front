import type { Datum, FooterValues } from "../interface/sucursal.interface";

interface TotalsData {
  tickets: number;
  lentes: number;
  antireflejo: number;
  progresivos: number;
  fotoCromatico: number;
  participacionMaterial: number;
  porcentajeProgresivos: number;
  porcentajeAntireflejo: number;
  porcentajeFotoCromatico: number;
  porcentajeParticipacionMaterial: number;
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

export const footerOferService = (data: Datum[]): TotalsData => {
  const dataTotal = {
    tickets: 0,
    lentes: 0,
    antireflejo: 0,
    progresivos: 0,
    fotoCromatico: 0,
    participacionMaterial: 0,
    porcentajeProgresivos: 0,
    porcentajeAntireflejo: 0,
    porcentajeFotoCromatico: 0,
    porcentajeParticipacionMaterial: 0,
  };

  data.forEach((item) => {
    item.dataKpi.forEach((kpi) => {
      dataTotal.tickets += getNumericValue(kpi.tickets);
      dataTotal.lentes += getNumericValue(kpi.lentes);
      dataTotal.antireflejo += getNumericValue(kpi.antireflejo);
      dataTotal.progresivos += getNumericValue(kpi.progresivos);
      dataTotal.fotoCromatico += getNumericValue(kpi.fotoCromatico);
    });
  });

  dataTotal.porcentajeProgresivos = calculatePercentage(
    dataTotal.progresivos,
    dataTotal.lentes
  );
  dataTotal.porcentajeAntireflejo = calculatePercentage(
    dataTotal.antireflejo,
    dataTotal.lentes
  );
  dataTotal.porcentajeFotoCromatico = calculatePercentage(
    dataTotal.fotoCromatico,
    dataTotal.lentes
  );
  return dataTotal;
};

export const calculateFooterOferService = (data: Datum[]) => {
  console.log("dataKpi", data);

  const totals = footerOferService(data);
  const footerValues: FooterValues[] = [
    { columnId: "tickets", value: totals.tickets.toString() },
    { columnId: "lentes", value: totals.lentes.toString() },
    { columnId: "antireflejo", value: totals.antireflejo.toString() },
    {
      columnId: "porcentajeAntireflejo",
      value: totals.porcentajeAntireflejo.toFixed(2) + " %",
    },
    { columnId: "progresivos", value: totals.progresivos.toString() },
    {
      columnId: "porcentajeProgresivos",
      value: totals.porcentajeProgresivos.toFixed(2) + " %",
    },
    { columnId: "fotoCromatico", value: totals.fotoCromatico.toString() },
    {
      columnId: "porcentajeFotoCromatico",
      value: totals.porcentajeFotoCromatico.toFixed(2) + " %",
    },

  ];
  return footerValues;
};
