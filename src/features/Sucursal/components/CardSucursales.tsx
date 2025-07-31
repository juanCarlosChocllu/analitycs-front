export const CardSucursales = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">Total Asesores</p>
                <p className="text-2xl font-bold text-gray-900">{processedData.allAsesores.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
            </div>
        </div>
    </div>

  )
}
