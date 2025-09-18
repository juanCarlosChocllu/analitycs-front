import dayjs from "dayjs";

export const cantidadDiasRangoFecha = (
  fechaInicio: string,
  fechaFin: string
) => {
  const f1 = dayjs(fechaInicio);
  const f2 = dayjs(fechaFin);
  const diferenciaEnDias = f2.diff(f1, "day");
  return diferenciaEnDias;
};
