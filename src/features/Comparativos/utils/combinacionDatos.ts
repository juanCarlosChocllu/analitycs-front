import dayjs from "dayjs";

export const combinarDatos = (datosGraficaActual: any[], datosGraficaAnterior: any[]) => {
    const productos = ['LENTE', 'MONTURA', 'GAFA', 'LENTE DE CONTACTO', 'SERVICIO', 'IMPORTE', 'ticketPromedio', 'precioPromedio', 'cantidad', 'tickets'] as const;

    return productos.map(producto => {
      const totalActual = datosGraficaActual.reduce((sum, dia) => sum + (dia[producto] || 0), 0);
      const totalAnterior = datosGraficaAnterior.reduce((sum, dia) => sum + (dia[producto] || 0), 0);

      return {
        producto: producto,
        actual: totalActual,
        anterior: totalAnterior,
        diferencia: totalActual - totalAnterior,
        porcentajeCambio: totalAnterior > 0 ? ((totalActual - totalAnterior) / totalAnterior * 100).toFixed(1) : 0
      };
    });
  };

  // Nueva función para combinar datos por fecha
  export const combinarDatosPorFecha = (datosGraficaActual: any[], datosGraficaAnterior: any[]) => {
    // Crear un mapa con todas las fechas únicas
    const fechasUnicas = new Set([
      ...datosGraficaActual.map(d => d.fecha),
      ...datosGraficaAnterior.map(d => d.fecha)
    ]);

    return Array.from(fechasUnicas).sort().map(fecha => {

      // Agrupar datos por mes
      const fechaMes = dayjs(fecha).format('DD/MM');
      const datosMesActual = datosGraficaActual.filter(d => dayjs(d.fecha).format('DD/MM') === fechaMes);
      const datosMesAnterior = datosGraficaAnterior.filter(d => dayjs(d.fecha).format('DD/MM') === fechaMes);

      return {
        fecha: dayjs(fecha).format('DD/MM'), // Formato de fecha para mostrar
        fechaCompleta: fecha, // Mantener fecha completa para ordenamiento
        // Datos del período actual
        actualImporte: datosMesActual.reduce((suma, d) => suma + (d.IMPORTE || 0), 0),
        actualLente: datosMesActual.reduce((suma, d) => suma + (d.LENTE || 0), 0),
        actualMontura: datosMesActual.reduce((suma, d) => suma + (d.MONTURA || 0), 0),
        actualGafa: datosMesActual.reduce((suma, d) => suma + (d.GAFA || 0), 0),
        actualLenteContacto: datosMesActual.reduce((suma, d) => suma + (d['LENTE DE CONTACTO'] || 0), 0),
        actualServicio: datosMesActual.reduce((suma, d) => suma + (d.SERVICIO || 0), 0),
        actualTickets: datosMesActual.reduce((suma, d) => suma + (d.tickets || 0), 0),
        actualCantidad: datosMesActual.reduce((suma, d) => suma + (d.cantidad || 0), 0),
        actualTicketPromedio: datosMesActual.reduce((suma, d) => suma + (d.ticketPromedio || 0), 0) / datosMesActual.length,
        actualPrecioPromedio: datosMesActual.reduce((suma, d) => suma + (d.precioPromedio || 0), 0) / datosMesActual.length,
        // Datos del período anterior
        anteriorImporte: datosMesAnterior.reduce((suma, d) => suma + (d.IMPORTE || 0), 0),
        anteriorLente: datosMesAnterior.reduce((suma, d) => suma + (d.LENTE || 0), 0),
        anteriorMontura: datosMesAnterior.reduce((suma, d) => suma + (d.MONTURA || 0), 0),
        anteriorGafa: datosMesAnterior.reduce((suma, d) => suma + (d.GAFA || 0), 0),
        anteriorLenteContacto: datosMesAnterior.reduce((suma, d) => suma + (d['LENTE DE CONTACTO'] || 0), 0),
        anteriorServicio: datosMesAnterior.reduce((suma, d) => suma + (d.SERVICIO || 0), 0),
        anteriorTickets: datosMesAnterior.reduce((suma, d) => suma + (d.tickets || 0), 0),
        anteriorCantidad: datosMesAnterior.reduce((suma, d) => suma + (d.cantidad || 0), 0),
        anteriorTicketPromedio: datosMesAnterior.reduce((suma, d) => suma + (d.ticketPromedio || 0), 0) / datosMesAnterior.length,
        anteriorPrecioPromedio: datosMesAnterior.reduce((suma, d) => suma + (d.precioPromedio || 0), 0) / datosMesAnterior.length,
      };
    });
  };
