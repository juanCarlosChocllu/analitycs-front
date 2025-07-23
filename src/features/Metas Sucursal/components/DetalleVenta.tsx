// Interfaces basadas en tu código

import dayjs from "dayjs"
import type { Detalle, DetalleVenta} from "../../app/interfaces/DetalleVenta.interface"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"


const obtenerColorEstado = (estado: string): string => {
  if (estado === "FINALIZADO") return "bg-emerald-200 text-emerald-800"
  return "bg-yellow-200 text-yellow-800"
}
  
  export default function DetalleVentaTable({ detalleVenta}: { detalleVenta?: DetalleVenta }) {
    const region = localStorage.getItem("region") || "BOLIVIA"
    const moneda = region === "BOLIVIA" ? "Bs." : "Gs."
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        {/* Encabezado */}
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-lg font-semibold text-blue-900">
              ID de Venta: <span className="font-mono">{detalleVenta?.id_venta}</span>
            </p>
          </div>
        </div>
  
        {/* Tabla */}
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <Table className="min-w-full bg-white">
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Producto
                </TableCell>
                <TableCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Importe
                </TableCell>
                <TableCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tracking
                </TableCell>
                <TableCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Fecha Venta
                </TableCell>
                <TableCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Estado
                </TableCell>
                <TableCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Fecha Finalización
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-200">
              {detalleVenta?.detalle.map((detalle: Detalle, index: number) => (
                <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <TableCell className="px-6 py-4 border-b">
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900">{detalle.producto}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 border-b">
                    <span className="text-lg font-semibold text-green-600">{moneda}{detalle.importe.toLocaleString('en-US')}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 border-b">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{detalle.tracking}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 border-b">
                    <span className="text-gray-900">
                      {dayjs(detalle.fechaVenta).format('DD/MM/YYYY')}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 border-b">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${obtenerColorEstado(detalle.flagVenta)}`}
                    >
                      {detalle.flagVenta}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 border-b">
                    {detalle.fechaFinalizacion ? (
                      <span className="text-gray-900">
                        {dayjs(detalle.fechaFinalizacion).format('DD/MM/YYYY')}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Pendiente</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
  
        {/* Resumen */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total de productos: {detalleVenta?.detalle.length}</span>
            <span className="text-xl font-bold text-green-600">
              Total: {moneda}{detalleVenta?.detalle.reduce((sum: number, item: Detalle) => sum + item.importe, 0).toLocaleString('en-US')}
            </span>
          </div>
        </div>
      </div>
    )
  }
  