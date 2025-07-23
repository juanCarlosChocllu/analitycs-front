import type { MetaSucursalI, MetaSucursalFormateada } from '../interfaces/metaSucursal.interfaces';

export const formatearMetas = (
  metasActual: MetaSucursalI[],
  metasAnterior: MetaSucursalI[]
): MetaSucursalFormateada[] => {
    const dataFormateada: MetaSucursalFormateada[] = [];
    for (let cont = 0; cont < metasActual.length; cont++) {
      const data = {} as MetaSucursalFormateada;
      const actual = metasActual[cont];
      const anterior = metasAnterior[cont];
      if (actual.sucursal === anterior.sucursal) {

        data.fechaInicio = actual.fechaInicio;
        data.fechaFin = actual.fechaFin;
        //actual
        data._id = actual._id;
        data.sucursal = actual.sucursal;
        data.importeVentaActual = actual.importVenta;
        data.montoMetaActual = actual.montoMeta;
        data.cumplimientoImporteActual = actual.cumplimientoImporte;
        data.fechaInicio = actual.fechaInicio;
        data.fechaFin = actual.fechaFin;
         
        data.ticketVentaActual = actual.ticketVenta;
        data.ticketMetaActual = actual.ticketMeta;
        data.cumplimientoTickectActual = actual.cumplimientoTicket;
        data.indeceAvanceActual = actual.indeceAvance
        data.diasHabilesActual = actual.diasHAbiles
        
        //anterior
        data._id = anterior._id;
        data.sucursalAnterior = anterior.sucursal;
        data.importeVentaAnterior = anterior.importVenta;
        data.montoMetaAnterior = anterior.montoMeta;
        data.cumplimientoImporteAnterior = anterior.cumplimientoImporte;
        data.indeceAvanceAnterior = anterior.indeceAvance
        data.diasHabilesAnterior = anterior.diasHAbiles
        data.ticketVentaAnterior = anterior.ticketVenta;
        data.ticketMetaAnterior = anterior.ticketMeta;
        data.cumplimientoTickectAnterior = anterior.cumplimientoTicket;
        data.fechaInicio = anterior.fechaInicio;
        data.fechaFin = anterior.fechaFin;
      }
      dataFormateada.push(data);
    }
    return dataFormateada;
  };
  