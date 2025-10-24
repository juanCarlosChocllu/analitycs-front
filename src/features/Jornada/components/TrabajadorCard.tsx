import { useEffect, useState } from "react";
import { CalendarioMes } from "./CalendarioMes";
import { crearJornada, eliminarJornada } from "../service/jornadaService";
import type { JornadaI } from "../interface/jornada";
import toast from "react-hot-toast";
import { useEstadoReload } from "../../app/zustand/estadosZustand";

interface TrabajadorProps {
  nombre: string;
  color: string;
  ano: number;
  mesActual: number;
  asesor: string;
  jornada: JornadaI;
}

export const TrabajadorCard: React.FC<TrabajadorProps> = ({
  nombre,
  color,
  ano,
  mesActual,
  asesor,
  jornada,
}) => {
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const [modoSeleccion, setModoSeleccion] = useState<"inicio" | "fin">(
    "inicio"
  );
  const [desdeBackend, setDesdeBackend] = useState(false);
  const { triggerReload } = useEstadoReload();
  const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
  const anoMesAnterior = mesActual === 0 ? ano - 1 : ano;

  const handleClickDia = async (dia: Date) => {
    setDesdeBackend(true);
    if (modoSeleccion === "inicio") {
      setFechaInicio(dia);
      setFechaFin(null);
      setModoSeleccion("fin");
    } else {
      if (fechaInicio && dia < fechaInicio) {
        setFechaInicio(dia);
        setFechaFin(null);
      } else {
        setFechaFin(dia);
        setModoSeleccion("inicio");
      }
    }
  };
  useEffect(() => {
    if (fechaInicio && fechaFin && desdeBackend) {
      const registrarJornada = async () => {
        try {
          const response = await crearJornada(asesor, fechaInicio, fechaFin);

          if (response.status == 201) {
            triggerReload();
            toast.success("Registrado");
          }
        } catch (error) {
          console.log("Error al registrar jornada:", error);
        }
      };

      registrarJornada();
    }
  }, [fechaInicio, fechaFin]);

  const limpiarSeleccion = async () => {
    if (jornada) {
      setFechaInicio(null);
      setFechaFin(null);
      setModoSeleccion("inicio");
      try {
        const response = await eliminarJornada(jornada._id);
        if (response.status === 200) {
          triggerReload();
          toast.error("eliminado");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (jornada) {
      const f1 = new Date(jornada.fechaInicio);
      const f2 = new Date(jornada.fechaFin);
      setFechaInicio(f1);
      setFechaFin(f2);
    }
  }, []);

  let diasTrabajados = 0;

  if (fechaInicio && fechaFin) {
    for (
      let d = new Date(fechaInicio);
      d <= fechaFin;
      d.setDate(d.getDate() + 1)
    ) {
      const diaSemana = d.getDay();
      if (diaSemana !== 0) {
        diasTrabajados++;
      }
    }
  }

  const formatearFecha = (fecha: Date | null) => {
    if (!fecha) return "---";
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          ></span>
          {nombre}
        </h3>
        <div className="text-right">
          <p className="text-xs text-gray-500">Días trabajados</p>
          <span className="text-2xl font-extrabold text-gray-800">
            {diasTrabajados}
          </span>
        </div>
      </header>

      {/* Información del rango seleccionado */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-600 mb-2 flex justify-between items-center">
          <span className="font-semibold">Período comercial:</span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              modoSeleccion === "inicio"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {modoSeleccion === "inicio"
              ? "📍 Selecciona inicio"
              : "📍 Selecciona fin"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500">Inicio</div>
            <div className="text-sm font-bold text-gray-800">
              {formatearFecha(fechaInicio)}
            </div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500">Fin</div>
            <div className="text-sm font-bold text-gray-800">
              {formatearFecha(fechaFin)}
            </div>
          </div>
        </div>
        {(fechaInicio || fechaFin) && (
          <button
            onClick={limpiarSeleccion}
            className="mt-2 w-full text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            ✕ Limpiar selección
          </button>
        )}
      </div>

      <div className="space-y-4">
        <CalendarioMes
          ano={anoMesAnterior}
          mes={mesAnterior}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          modoSeleccion={modoSeleccion}
          onClickDia={handleClickDia}
          color={color}
          jornada={jornada}
        />

        <div className="border-t border-gray-200 pt-4">
          <CalendarioMes
            ano={ano}
            mes={mesActual}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            modoSeleccion={modoSeleccion}
            onClickDia={handleClickDia}
            color={color}
            jornada={jornada}
          />
        </div>
      </div>
    </div>
  );
};
