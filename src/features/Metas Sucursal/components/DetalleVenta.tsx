// Interfaces basadas en tu código

import dayjs from "dayjs"
import type { Detalle, DetalleVenta} from "../../app/interfaces/DetalleVenta.interface"

  // Función para obtener el producto principal
  const obtenerProductoPrincipal = (producto: string): string => {
    if (producto === "GAFA") return `Gafa: ${producto}`
    if (producto === "LENTE_DE_CONTACTO") return `Lente de Contacto: ${producto}`
    if (producto === "LENTE") return `Lente: ${producto}`
    if (producto === "MONTURA") return `Montura: ${producto}`
    if (producto === "OTRO_PRODUCTO") return `Otro: ${producto}`
    return "Sin especificar"
  }
  
  // Función para obtener detalles adicionales del producto
  const obtenerDetallesProducto = (producto: string): string[] => {
    const detalles: string[] = []
    if (producto === "LENTE" && detalles.indexOf(`Lente: ${producto}`) === -1) detalles.push(`Lente: ${producto}`)
    if (producto === "MONTURA" && detalles.indexOf(`Montura: ${producto}`) === -1) detalles.push(`Montura: ${producto}`)
    if (producto === "GAFA" && detalles.indexOf(`Lente: ${producto}`) === -1) detalles.push(`Lente: ${producto}`)
    if (producto === "GAFA" && detalles.indexOf(`Montura: ${producto}`) === -1) detalles.push(`Montura: ${producto}`)
    return detalles
  }
  
  // Función para obtener el color del estado
  const obtenerColorEstado = (estado: string): string => {
    switch (estado.toLowerCase()) {
      case "completada":
        return "bg-green-100 text-green-800 border-green-200"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "en proceso":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }
  
  export default function DetalleVentaTable({ detalleVenta}: { detalleVenta?: DetalleVenta }) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Detalle de Venta</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-lg font-semibold text-blue-900">
              ID de Venta: <span className="font-mono">{detalleVenta?.id_venta}</span>
            </p>
          </div>
        </div>
  
        {/* Tabla */}
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Producto
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Importe
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tracking
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Fecha Venta
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Fecha Finalización
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detalleVenta?.detalle.map((detalle: Detalle, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 border-b">
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900">{obtenerProductoPrincipal(detalle.producto)}</p>
                      {obtenerDetallesProducto(detalle.producto).map((detalle_producto: string, idx: number) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {detalle_producto}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span className="text-lg font-semibold text-green-600">Bs.{detalle.importe.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{detalle.tracking}</span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span className="text-gray-900">
                      {dayjs(detalle.fechaVenta).format('DD/MM/YYYY')}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${obtenerColorEstado(detalle.flagVenta)}`}
                    >
                      {detalle.flagVenta}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    {detalle.fechaFinalizacion ? (
                      <span className="text-gray-900">
                        {dayjs(detalle.fechaFinalizacion).format('DD/MM/YYYY')}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Pendiente</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Resumen */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total de productos: {detalleVenta?.detalle.length}</span>
            <span className="text-xl font-bold text-green-600">
              Total: Bs.{detalleVenta?.detalle.reduce((sum: number, item: Detalle) => sum + item.importe, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    )
  }
  