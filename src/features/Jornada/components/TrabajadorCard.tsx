import { useEffect, useState } from "react";
import { CalendarioMes } from "./CalendarioMes";
import { crearJornada, } from "../service/jornadaService";
import type { JornadaI } from "../interface/jornada";
import toast from "react-hot-toast";
import { useEstadoReload } from "../../app/zustand/estadosZustand";

import { Jornadas } from "./Jornadas";

interface TrabajadorProps {
  nombre: string;
  ano: number;
  mesActual: number;
  asesor: string;
  jornada: JornadaI[];
  sucursal: string;
}

export const TrabajadorCard: React.FC<TrabajadorProps> = ({
  nombre,
  ano,
  mesActual,
  asesor,
  jornada,
  sucursal,
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

  const jornadasNormalizadas: JornadaI[] = jornada.map((j) => ({
    ...j,
    inicio: new Date(j.fechaInicio),
    fin: new Date(j.fechaFin),
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
      <header className="flex justify-between items-center mb-4">
        <p className="font-bold text-gray-800 flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: '#06B6D4' }}
          ></span>
          {nombre}
        </p>
        <div className="text-right">
          <p className="text-xs text-gray-500">Días trabajados</p>
          <span className="text-2xl font-extrabold text-gray-800">
            {jornada.reduce((acc, item) => item.diasLaborales + acc, 0)}
          </span>
        </div>
      </header>
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-600 mb-2 flex justify-between items-center">
          {sucursal}
        </div>
      </div>
      <Jornadas jornada={jornada} />

      <div className="space-y-4">
        <CalendarioMes
          ano={anoMesAnterior}
          mes={mesAnterior}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          onClickDia={handleClickDia}
        
          jornadasMarcadas={jornadasNormalizadas}
        />

        <div className="border-t border-gray-200 pt-4">
          <CalendarioMes
            ano={ano}
            mes={mesActual}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            onClickDia={handleClickDia}
  
            jornadasMarcadas={jornadasNormalizadas}
          />
        </div>
      </div>
    </div>
  );
};
