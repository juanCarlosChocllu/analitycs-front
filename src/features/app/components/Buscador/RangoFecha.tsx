import type { RangoFechaI } from "../../interfaces/BuscadorI"


export const RangoFecha = ({fechaFin,fechaInicio,setFechaFin ,setFechaInicio}:RangoFechaI) => {
  return (
     <div>
              <label className="block text-sm font-semibold text-gray-700">
                Rango de Fechas
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
  )
}
