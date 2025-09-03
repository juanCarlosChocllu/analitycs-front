import type { AsesorSemanal, SemanaDatos, SucursalPorSemanas, VentaAsesor } from "../interface/RendimientoDiario";
import type { SucursalData } from "../interface/RendimientoDiario";

export const transformarDatosASucursalPorSemanas = (data: SucursalData[]): SucursalPorSemanas[] => {
  return data.map(sucursal => {
      // Agrupar ventas por semana
      const semanasMap: { [semana: number]: { [idAsesor: string]: VentaAsesor[] } } = {};

      sucursal.ventas.forEach(ventasPorAsesor => {
          ventasPorAsesor.ventaAsesor.forEach(venta => {
              const [year, month, day] = venta.fecha.split('-').map(Number);
              const date = new Date(year, month - 1, day);
              const semana = Math.ceil(date.getDate() / 7);

              if (!semanasMap[semana]) semanasMap[semana] = {};
              if (!semanasMap[semana][venta.idAsesor]) semanasMap[semana][venta.idAsesor] = [];
              semanasMap[semana][venta.idAsesor].push(venta);
          });
      });

      const semanas: SemanaDatos[] = Object.entries(semanasMap).map(([semanaStr, asesoresMap]) => {
          const semana = Number(semanaStr);
          // Obtener fechas de la semana
          const ventasSemana = Object.values(asesoresMap).flat();
          const fechas = ventasSemana.map(v => v.fecha).sort();
          const fechaInicio = fechas[0];
          const fechaFin = fechas[fechas.length - 1];

          const asesores: AsesorSemanal[] = Object.entries(asesoresMap).map(([idAsesor, ventas]) => {
              const venta = ventas;
              return {
                  idAsesor,
                  asesor: venta[0].asesor,
                  antireflejoSemanal: venta.reduce((sum, v) => sum + v.antireflejos, 0),
                  atencionesSemanal: venta.reduce((sum, v) => sum + v.atenciones, 0),
                  cantidadLenteSemanal: venta.reduce((sum, v) => sum + v.cantidadLente, 0),
                  entregasSemanal: venta.reduce((sum, v) => sum + v.entregas, 0),
                  lcSemanal: venta.reduce((sum, v) => sum + v.lc, 0),
                  montoTotalVentasSemanal: venta.reduce((sum, v) => sum + v.montoTotalVentas, 0),
                  progresivosSemanal: venta.reduce((sum, v) => sum + v.progresivos, 0),
                  segundoParSemanal: venta.reduce((sum, v) => sum + v.segundoPar, 0),
                  ticketSemanal: venta.reduce((sum, v) => sum + v.ticket, 0),
              };
          });

          return {
              semana,
              fechaInicio,
              fechaFin,
              asesores
          };
      });

      // Calcular rango de fechas de la sucursal
      const todasFechas = sucursal.ventas.flatMap(v =>
          v.ventaAsesor.map(venta => venta.fecha)
      ).sort();
      const fechaInicio = todasFechas[0];
      const fechaFin = todasFechas[todasFechas.length - 1];

      return {
          sucursal: sucursal.sucursal,
          metaTicket: sucursal.metaTicket,
          metaMonto: sucursal.metaMonto,
          diasComerciales: sucursal.diasComerciales,
          fechaInicio,
          fechaFin,
          semanas
      };
  });
};
