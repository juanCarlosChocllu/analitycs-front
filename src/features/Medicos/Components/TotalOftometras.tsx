import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { calcularVariacionPorcentual } from "../../app/util/variacion";
import type { SucursalVenta } from "../interfaces/Medicos";
import { filtroMedicoEspecialidad } from "../utils/filtroMedicoEspecialidad";
import { formatearImporte } from "../utils/funcionesDeCalculo";

interface TablaMedicoProps {
    dataActual: SucursalVenta[];
    dataAnterior: SucursalVenta[];
}

export const TotalOftometras = ({dataActual,dataAnterior}:TablaMedicoProps) => {
  const [dataActualOptometra, dataAnteriorOptometra] = filtroMedicoEspecialidad(
    { dataActual, dataAnterior },
    "OPTOMETRA"
  );
  const recetasActual = dataActualOptometra.reduce(
    (acc, item) => item.cantidad + acc,
    0
  );
  const importeActual = dataActualOptometra
    .filter((item) => item.sucursal != "OPTICENTRO PARAGUAY")
    .reduce((acc, item) => item.importe + acc, 0);
  const ventasLenteLcActual = dataActualOptometra.reduce(
    (acc, item) => item.ventasLenteLc + acc,
    0
  );

  const recetasAnterior = dataAnteriorOptometra.reduce(
    (acc, item) => item.cantidad + acc,
    0
  );
  const importeAnterior = dataAnteriorOptometra
    .filter((item) => item.sucursal != "OPTICENTRO PARAGUAY")
    .reduce((acc, item) => item.importe + acc, 0);
  const ventasLenteLcAnterior = dataAnteriorOptometra.reduce(
    (acc, item) => item.ventasLenteLc + acc,
    0
  );
  return (
    <div className="text-center w-[95%] mx-auto mt-4">
    <div className="text-center">
      {" "}
      <h2 className="text-lg font-semibold text-gray-900 uppercase">Total Optometras</h2>
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
              Var importe
            </TableCell>
            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Var lente + lc
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
              {formatearImporte(importeActual, "OPTICENTRO PARAGUAY")}
            </TableCell>

            <TableCell
              className={`px-4 py-2 text-sm text-gray-600 ${
                parseFloat(
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
              className={`px-4 py-2 text-sm text-gray-600 ${
                parseFloat(
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
              className={`px-4 py-2 text-sm text-gray-600 ${
                parseFloat(
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
            {formatearImporte(importeAnterior, "OPTICENTRO PARAGUAY")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    </div>
  )
}
