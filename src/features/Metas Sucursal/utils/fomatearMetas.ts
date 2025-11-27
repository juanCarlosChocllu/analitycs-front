import { calcularVariacionPorcentual } from "../../app/util/variacion";
import type {
  MetaSucursalI,
  MetaSucursalFormateada,
} from "../interfaces/metaSucursal.interfaces";
import * as ExcelJs from "exceljs";

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
      data.indeceAvanceActual = actual.indeceAvance;
      data.diasHabilesActual = actual.diasHAbiles;

      //anterior
      data._id = anterior._id;
      data.sucursalAnterior = anterior.sucursal;
      data.importeVentaAnterior = anterior.importVenta;
      data.montoMetaAnterior = anterior.montoMeta;
      data.cumplimientoImporteAnterior = anterior.cumplimientoImporte;
      data.indeceAvanceAnterior = anterior.indeceAvance;
      data.diasHabilesAnterior = anterior.diasHAbiles;
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

export async function exporExcelMetasSucursal(data: MetaSucursalFormateada[]) {
  const libro = new ExcelJs.Workbook();
  const hoja = libro.addWorksheet("Hoja 1");
  hoja.columns = [
    { header: "Sucursal", key: "sucursal" },
    { header: "Monto Meta Actual", key: "montoMetaActual" },
    { header: "Ticket Meta Actual", key: "ticketMetaActual" },
    { header: "Importe Venta Actual", key: "importeVentaActual" },
    { header: "Cumplimiento Importe Actual", key: "cumplimientoImporteActual" },
    { header: "Ticket Venta Actual", key: "ticketVentaActual" },
    { header: "Cumplimiento Ticket Actual", key: "cumplimientoTickectActual" },
    { header: "Variación Importe", key: "varTicket" },
    { header: "Variación Importe", key: "varImport" },
    { header: "Monto Meta Anterior", key: "montoMetaAnterior" },
    { header: "Importe Venta Anterior", key: "importeVentaAnterior" },

    {
      header: "Cumplimiento Importe Anterior",
      key: "cumplimientoImporteAnterior",
    },
    { header: "Ticket Venta Anterior", key: "ticketVentaAnterior" },
    {
      header: "Cumplimiento Ticket Anterior",
      key: "cumplimientoTickectAnterior",
    },
  ];

  for (const item of data) {
    hoja.addRow({
      sucursal: item.sucursal,
      montoMetaActual: item.montoMetaActual,
      ticketMetaActual: item.ticketMetaActual,
      importeVentaActual: item.importeVentaActual,
      cumplimientoImporteActual: `${item.cumplimientoImporteActual} %`,
      ticketVentaActual: item.ticketVentaActual,
      cumplimientoTickectActual: `${item.cumplimientoTickectActual} %`,
      varTicket: `${calcularVariacionPorcentual(
        item.ticketVentaActual,
        item.ticketVentaAnterior
      )} %`,
      varImport: `${calcularVariacionPorcentual(
        item.importeVentaActual,
        item.importeVentaAnterior
      )} %`,
      montoMetaAnterior: item.montoMetaAnterior,
      importeVentaAnterior: item.importeVentaAnterior,
      cumplimientoImporteAnterior: `${item.cumplimientoImporteAnterior} %`,
      ticketVentaAnterior: item.ticketVentaAnterior,
      cumplimientoTickectAnterior: `${item.cumplimientoTickectAnterior} %`,
    });
  }

  const buffer = await libro.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `metasSucursal.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
