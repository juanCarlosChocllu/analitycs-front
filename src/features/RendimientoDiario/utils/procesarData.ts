import type { AsesorSemanal, SemanaDatos, SucursalPorSemanas, VentaAsesor } from "../interface/RendimientoDiario";
import type { SucursalData } from "../interface/RendimientoDiario";

export const transformarDatosASucursalPorSemanas = (data: SucursalData[]): SucursalPorSemanas[] => {
  // Helpers para semana ISO (lunes-domingo)
  const parseYMD = (ymd: string) => {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const getISOWeekYear = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7; // 1..7 (lunes=1)
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return d.getUTCFullYear();
  };

  const getISOWeek = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7; // 1..7 (lunes=1)
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const getISOWeekRange = (isoYear: number, isoWeek: number) => {
    const simple = new Date(Date.UTC(isoYear, 0, 1 + (isoWeek - 1) * 7));
    const dayOfWeek = simple.getUTCDay() || 7; // 1..7, lunes=1
    const monday = new Date(simple);
    monday.setUTCDate(simple.getUTCDate() - (dayOfWeek - 1));
    const sunday = new Date(monday);
    sunday.setUTCDate(monday.getUTCDate() + 6);

    const toYMD = (d: Date) => {
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };
    return { inicio: toYMD(monday), fin: toYMD(sunday) };
  };

  return data.map((sucursal) => {
    // Agrupar ventas por semana ISO (año + semana)
    const semanasMap: { [semanaKey: string]: { week: number; year: number; asesores: { [idAsesor: string]: VentaAsesor[] } } } = {};

    sucursal.ventas.forEach((ventasPorAsesor) => {
      ventasPorAsesor.ventaAsesor.forEach((venta) => {
        const date = parseYMD(venta.fecha);
        const week = getISOWeek(date);
        const year = getISOWeekYear(date);
        const semanaKey = `${year}-W${String(week).padStart(2, "0")}`;

        if (!semanasMap[semanaKey]) {
          semanasMap[semanaKey] = { week, year, asesores: {} };
        }
        const asesorKey = (venta.idAsesor as unknown as string) ?? venta.asesor;
        if (!semanasMap[semanaKey].asesores[asesorKey]) semanasMap[semanaKey].asesores[asesorKey] = [];
        semanasMap[semanaKey].asesores[asesorKey].push(venta);
      });
    });

    // Construir semanas con asesores y ordenar asesores por nombre
    const semanas: SemanaDatos[] = Object.entries(semanasMap)
      .map(([_, meta]) => {
        const { week: semana, year } = meta;
        const asesoresMap = meta.asesores;

        const { inicio: fechaInicio, fin: fechaFin } = getISOWeekRange(year, semana);

        const asesores: AsesorSemanal[] = Object.entries(asesoresMap)
          .map(([idAsesor, ventas]) => {
            const venta = ventas;
            const asesor = venta[0].asesor;
            const ticketSemanal = venta.reduce((sum, v) => sum + v.ticket, 0);
            const antireflejoSemanal = venta.reduce((sum, v) => sum + v.antireflejos, 0);
            const atencionesSemanal = venta.reduce((sum, v) => sum + v.atenciones, 0);
            const cantidadLenteSemanal = venta.reduce((sum, v) => sum + v.cantidadLente, 0);
            const entregasSemanal = venta.reduce((sum, v) => sum + v.entregas, 0);
            const lcSemanal = venta.reduce((sum, v) => sum + v.lc, 0);
            const montoTotalVentasSemanal = venta.reduce((sum, v) => sum + v.montoTotalVentas, 0);
            const progresivosSemanal = venta.reduce((sum, v) => sum + v.progresivos, 0);
            const segundoParSemanal = venta.reduce((sum, v) => sum + v.segundoPar, 0);
            return {
              idAsesor,
              asesor,
              antireflejoSemanal,
              atencionesSemanal,
              cantidadLenteSemanal,
              entregasSemanal,
              lcSemanal,
              montoTotalVentasSemanal,
              progresivosSemanal,
              segundoParSemanal,
              ticketSemanal,
            };
          })
          .sort((a, b) => a.asesor.localeCompare(b.asesor));

        const antireflejoSemanalTotal = asesores.reduce((sum, a) => sum + a.antireflejoSemanal, 0);
        const ticketSemanalTotal = asesores.reduce((sum, a) => sum + a.ticketSemanal, 0);
        const atencionesSemanalTotal = asesores.reduce((sum, a) => sum + a.atencionesSemanal, 0);
        const cantidadLenteSemanalTotal = asesores.reduce((sum, a) => sum + a.cantidadLenteSemanal, 0);
        const entregasSemanalTotal = asesores.reduce((sum, a) => sum + a.entregasSemanal, 0);
        const lcSemanalTotal = asesores.reduce((sum, a) => sum + a.lcSemanal, 0);
        const montoTotalVentasSemanalTotal = asesores.reduce((sum, a) => sum + a.montoTotalVentasSemanal, 0);
        const progresivosSemanalTotal = asesores.reduce((sum, a) => sum + a.progresivosSemanal, 0);
        const segundoParSemanalTotal = asesores.reduce((sum, a) => sum + a.segundoParSemanal, 0);

        return {
          semana,
          fechaInicio,
          fechaFin,
          asesores,
          antireflejoSemanalTotal,
          ticketSemanalTotal,
          atencionesSemanalTotal,
          cantidadLenteSemanalTotal,
          entregasSemanalTotal,
          lcSemanalTotal,
          montoTotalVentasSemanalTotal,
          progresivosSemanalTotal,
          segundoParSemanalTotal,
        };
      })
      // Ordenar por inicio de semana para soportar cruce de años
      .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));

    // Calcular rango de fechas de la sucursal
    const todasFechas = sucursal.ventas
      .flatMap((v) => v.ventaAsesor.map((venta) => venta.fecha))
      .sort();
    const fechaInicio = todasFechas[0];
    const fechaFin = todasFechas[todasFechas.length - 1];

    return {
      sucursal: sucursal.sucursal,
      metaTicket: sucursal.metaTicket,
      metaMonto: sucursal.metaMonto,
      diasComerciales: sucursal.diasComerciales,
      fechaInicio,
      fechaFin,
      semanas,
    };
  });
};
