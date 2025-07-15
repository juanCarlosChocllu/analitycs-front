import ExcelJS from "exceljs";
import type { SucursalData } from "../../interface/IndicadorSucursal";
export const exportarExcelPorSucursal = async (dataSucursal:SucursalData[]) => {

  const workbook = new ExcelJS.Workbook();
  const worksheetOne = workbook.addWorksheet("IndicadoresPorSucursal");
  worksheetOne.columns = [
    { header: "Id", key: "id"  },
    { header: "Sucursal", key: "sucursal" },
    { header: "Total Ticket", key: "totalTicket" },
    { header: "Venta Total", key: "ventaTotal" },
    { header: "Total Importe", key: "totalImporte" },
    { header: "Cantidad", key: "cantidad" },
    { header: "Tasa Conversion", key: "tasaConversion" },
    { header: "Ticket Promedio", key: "ticketPromedio" },
    { header: "Unidad por Ticket", key: "unidadPorTicket" },
    { header: "Precio Promedio", key: "precioPromedio" },
  ];

  
  
  worksheetOne.addRows(
    dataSucursal.map((data) => ({
      id: data.id,
      sucursal: data.sucursal,
      totalTicket: data.totalTicket,
      ventaTotal: data.ventaTotal,
      totalImporte: data.totalImporte,
      cantidad: data.cantidad,
      tasaConversion: data.tasaConversion,
      ticketPromedio: data.ticketPromedio,
      unidadPorTicket: data.unidadPorTicket,
      precioPromedio: data.precioPromedio,
    }))
  );

  worksheetOne.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `indicadores-por-sucursal.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
