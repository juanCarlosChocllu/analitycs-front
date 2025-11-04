import type { MarcaI } from "../interface/marcaInterface";
import * as ExcelJs from "exceljs";
export async function generarExcelMarca(data: MarcaI[]) {
  const libro = new ExcelJs.Workbook();
  const hoja = libro.addWorksheet("Hoja 1");

  hoja.columns = [
    {
      header: "id",
      key: "id",
    },
    {
      header: "marca",
      key: "marca",
    },
    {
      header: "categoria",
      key: "categoria",
    },
  ];

  for (const item of data) {
    hoja.addRow({
      id: item._id,
      marca: item.nombre,
      categoria: item.categoria,
    });
  }

  const buffer = await libro.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Marcas.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
