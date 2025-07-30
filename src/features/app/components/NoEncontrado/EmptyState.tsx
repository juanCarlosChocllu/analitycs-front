import { Card } from "@mui/material"
import { Search, Lightbulb } from "lucide-react"

const suggestionsDefault = [
  "Verifica la ortografía de las palabras clave",
  "Usa términos más generales o sinónimos",
  "Reduce el número de filtros aplicados",
  "Intenta con una búsqueda más amplia",
]

export function EmptyState({ suggestions=suggestionsDefault }: { suggestions: string[] }) {

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icono principal con gradiente y animación sutil */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center shadow-lg">
          <Search className="w-12 h-12 text-indigo-500" strokeWidth={1.5} />
        </div>
        {/* Círculos decorativos */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 rounded-full opacity-60"></div>
        <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-indigo-200 rounded-full opacity-40"></div>
      </div>

      {/* Título principal */}
      <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">No se encontraron resultados</h2>

      {/* Subtítulo con mejor contraste */}
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md leading-relaxed">
        No pudimos encontrar lo que buscas. Prueba con estos consejos para obtener mejores resultados.
      </p>

      {/* Tarjeta de sugerencias */}
      <Card className="w-full max-w-lg p-6 mb-8 border-0 shadow-sm bg-amber-50 border-l-4 border-l-amber-400">
        <div className="flex items-start space-x-3">
          <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-3">Sugerencias para mejorar tu búsqueda:</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-amber-800 flex items-start">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

    </div>
  )
}
