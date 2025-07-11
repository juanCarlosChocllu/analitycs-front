import { Stethoscope, Users } from "lucide-react"


export const TablaMedico = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
    <div className="flex items-center space-x-2 mb-4">
      <Users className="w-5 h-5 text-blue-600" />
      <h3 className="text-lg font-semibold text-gray-900">
        Resultados de KPIs Médicos
      </h3>
    </div>
    <div className="text-center py-12 text-gray-500">
      <Stethoscope className="w-12 h-12 mx-auto mb-4 text-gray-300" />
      <p className="text-sm">Configure los filtros para visualizar los KPIs de desempeño</p>
      <p className="text-xs text-gray-400 mt-1">Los datos se actualizarán automáticamente</p>
    </div>
  </div>
  )
}
