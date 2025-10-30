import toast from "react-hot-toast";
import { useEstadoReload } from "../../app/zustand/estadosZustand";
import type { JornadaI } from "../interface/jornada";
import { eliminarJornada } from "../service/jornadaService";
import { Trash2 } from "lucide-react";

export const Jornadas = ({ jornada }: { jornada: JornadaI[] }) => {
  const { triggerReload } = useEstadoReload();

  const btnEliminarJornada = async (id: string) => {
    try {
      const response = await eliminarJornada(id);
      if (response.status === 200) {
        triggerReload();
        toast.error("Jornada eliminada");
      }
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  return (
    <div className="mb-4">
        
      <h4 className="font-semibold text-gray-800 text-xs uppercase tracking-wide mb-2">
        Jornadas registradas
      </h4>

      {jornada && jornada.length > 0 ? (
        <ul className="text-xs text-gray-700 space-y-1 max-h-32 overflow-y-auto bg-gray-50 rounded-md p-2 border border-gray-100">
          {jornada.map((j, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-2 py-1 bg-white rounded border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-1 text-gray-600">
                <span className="font-medium text-gray-800">
                  {new Date(j.fechaInicio).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="text-gray-400">→</span>
                <span className="font-medium text-gray-800">
                  {new Date(j.fechaFin).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-[0.6rem] bg-blue-100 text-blue-700 px-1 py-0.5 rounded-full">
                  <span className="font-semibold">{j.diasLaborales}</span>
                  <span>días</span>
                </div>
                <button
                  onClick={() => btnEliminarJornada(j._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Eliminar jornada"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-400 italic">Sin jornadas registradas</p>
      )}
    </div>
  );
};
