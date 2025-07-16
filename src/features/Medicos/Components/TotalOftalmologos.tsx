import type { MedicoVenta, SucursalVenta } from "../interfaces/Medicos";
import { filtroMedicoEspecialidad } from "../utils/filtroMedicoEspecialidad";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface TablaMedicoProps {
  dataActual: SucursalVenta[];
  dataAnterior: SucursalVenta[];
}

export const TotalOftalmologos = ({ dataActual, dataAnterior }: TablaMedicoProps) => {
  const [dataActualOftalmologo, dataAnteriorOftalmologo] =
    filtroMedicoEspecialidad({ dataActual, dataAnterior }, "OFTALMOLOGO");

  console.log(dataActualOftalmologo);

  function calcularVariacionPorcentual(actual: number, anterior: number): string {
    if (anterior === 0) return "N/A";
    const variacion = ((actual - anterior) / anterior) * 100;
    return variacion.toFixed(2);
  }

  const recetasActual = dataActualOftalmologo.reduce(
    (acc: number, item: MedicoVenta) => acc + item.cantidad,
    0
  );

  const ventasLenteLcActual = dataActualOftalmologo.reduce(
    (acc: number, item: MedicoVenta) => acc + item.ventasLenteLc,
    0
  );

  const importeActual = dataActualOftalmologo
    .filter((item: MedicoVenta) => item.sucursal !== "OPTICENTRO PARAGUAY")
    .reduce((acc: number, item: MedicoVenta) => acc + item.importe, 0);

  const recetasAnterior = dataAnteriorOftalmologo.reduce(
    (acc: number, item: MedicoVenta) => acc + item.cantidad,
    0
  );

  const ventasLenteLcAnterior = dataAnteriorOftalmologo.reduce(
    (acc: number, item: MedicoVenta) => acc + item.ventasLenteLc,
    0
  );

  const importeAnterior = dataAnteriorOftalmologo
    .filter((item: MedicoVenta) => item.sucursal !== "OPTICENTRO PARAGUAY")
    .reduce((acc: number, item: MedicoVenta) => acc + item.importe, 0);


  return (
    <div className="text-center w-[95%] mx-auto mt-4">
      <div className="text-center">
        {" "}
        <h2 className="text-lg font-semibold text-gray-900 uppercase">Total Oftalmologo</h2>
      </div>
      <div className="overflow-x-auto min-w-full table-auto border-collapse border border-gray-300 rounded-lg">

        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="px-3 py-2  font-semibold text-center" colSpan={3}>
                Ventas Actual
              </TableCell>
              <TableCell className="px-3 py-2 text-left font-semibold" colSpan={3}></TableCell>
              <TableCell className="px-3 py-2 text-center font-semibold" colSpan={3}>
                Ventas Anterior
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-100">
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Venta lente + lc
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Venta lente
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Importe
              </TableCell>

              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Var unidad
              </TableCell>

              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Var lente + lc
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Var importe
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Venta lente + lc
              </TableCell>

              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Venta lente
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Importe
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="bg-gray-100">
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {ventasLenteLcActual}
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {recetasActual}
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {parseFloat(importeActual.toString()).toLocaleString("en-US")} Bs
              </TableCell>

              <TableCell
                className={`px-4 py-2 text-sm text-gray-600 ${parseFloat(
                  calcularVariacionPorcentual(recetasActual, recetasAnterior)
                ) > 0
                    ? "bg-green-300"
                    : parseFloat(
                      calcularVariacionPorcentual(
                        recetasActual,
                        recetasAnterior
                      )
                    ) < 0
                      ? "bg-red-300"
                      : "bg-yellow-200"
                  }
                                                   
                                                  `}
              >
                {calcularVariacionPorcentual(recetasActual, recetasAnterior)} %
              </TableCell>
              <TableCell
                className={`px-4 py-2 text-sm text-gray-600 ${parseFloat(
                  calcularVariacionPorcentual(importeActual, importeAnterior)
                ) > 0
                    ? "bg-green-300"
                    : parseFloat(
                      calcularVariacionPorcentual(
                        importeActual,
                        importeAnterior
                      )
                    ) < 0
                      ? "bg-red-300"
                      : "bg-yellow-200"
                  }
                                                   
                                                  `}
              >
                {calcularVariacionPorcentual(importeActual, importeAnterior)} %
              </TableCell>
              <TableCell
                className={`px-4 py-2 text-sm text-gray-600 ${parseFloat(
                  calcularVariacionPorcentual(
                    ventasLenteLcActual,
                    ventasLenteLcAnterior
                  )
                ) > 0
                    ? "bg-green-300"
                    : parseFloat(
                      calcularVariacionPorcentual(
                        ventasLenteLcActual,
                        ventasLenteLcAnterior
                      )
                    ) < 0
                      ? "bg-red-300"
                      : "bg-yellow-200"
                  }
                                                   
                                                  `}
              >
                {calcularVariacionPorcentual(
                  ventasLenteLcActual,
                  ventasLenteLcAnterior
                )}{" "}
                %
              </TableCell>

              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {ventasLenteLcAnterior}
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {recetasAnterior}
              </TableCell>
              <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {parseFloat(importeAnterior.toString()).toLocaleString("en-US")} Bs
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
