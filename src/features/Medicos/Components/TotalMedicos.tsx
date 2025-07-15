import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { calcularVariacionPorcentual } from "../../app/utils/variacion";

interface TotalMedicosProps {
    dataActual: any;
    dataAnterior: any;
}

export const TotalMedicos = ({ dataActual, dataAnterior }: TotalMedicosProps) => {
    const recetasActual = dataActual.reduce(
        (acc: number, item: any) => item.totalRecetas + acc,
        0
    );

    const ventasLenteLcActual = dataActual.reduce(
        (acc: number, item: any) => item.ventaLenteLc + acc,
        0
    );

    const importeActual = dataActual.reduce((acc: number, item: any) => item.importe + acc, 0);

    const recetasAnterior = dataAnterior.reduce(
        (acc: number, item: any) => item.totalRecetas + acc,
        0
    );

    const ventasLenteLcAnterior = dataAnterior.reduce(
        (acc: number, item: any) => item.ventaLenteLc + acc,
        0
    );

    const importeAnterior = dataAnterior.reduce(
        (acc: number, item: any) => item.importe + acc,
        0
    );

    return (
        <div className="text-center">
            <div className="text-center">
                <h2>Total Medicos</h2>
            </div>
            <div className="min-w-full table-auto border-collapse border border-gray-500">
                <Table className="rounded-lg">
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-3 py-2  font-semibold text-center" colSpan={3}> Venta lente</TableCell>
                            <TableCell className="px-3 py-2 text-left font-semibold" colSpan={3}></TableCell>
                            <TableCell className="px-3 py-2 text-center font-semibold" colSpan={3}>Ventas Anterior</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-100">
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Venta lente + lc</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Venta lente</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Importe</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Var unidad</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Var importe</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Var lente + lc</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Venta lente + lc</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Venta lente</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700"> Importe</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="bg-gray-100">
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">{ventasLenteLcActual}</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">{recetasActual}</TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">{parseFloat(importeActual).toLocaleString("en-US")} Bs</TableCell>
                            <TableCell className={`px-4 py-2 text-sm text-gray-600 ${
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
                              }`} >{calcularVariacionPorcentual(recetasActual, recetasAnterior)}
                            </TableCell>
                            <TableCell className={`px-4 py-2 text-sm text-gray-600 ${
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
                              }`} >{calcularVariacionPorcentual(importeActual, importeAnterior)} %
                            </TableCell>
                            <TableCell className={`px-4 py-2 text-sm text-gray-600 ${
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
                              }`} >{calcularVariacionPorcentual(ventasLenteLcActual, ventasLenteLcAnterior)} %
                            </TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                {ventasLenteLcActual}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                {recetasAnterior}
                            </TableCell>
                            <TableCell>
                                {parseFloat(importeAnterior).toLocaleString("en-US")} Bs
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
