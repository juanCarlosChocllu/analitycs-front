import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import { obtenerCicloComercial } from "../../service/appService";
import utc from "dayjs/plugin/utc";
import type { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
dayjs.locale("es");
dayjs.extend(utc);
interface ButtonConfig {
  id: string;
  label: string;
  fullLabel: string;
}
const buttons: ButtonConfig[] = [
  { id: "hoy", label: "Hoy", fullLabel: "Día actual" },
  { id: "diaAnt", label: "D. ant", fullLabel: "Día anterior" },
  { id: "semana", label: "S. ant", fullLabel: "Semana anterior" },
  { id: "mes", label: "Mes", fullLabel: "Mes actual" },
  { id: "mesAnt", label: "M. ant", fullLabel: "Mes anterior" },
  { id: "anio", label: "Año", fullLabel: "Año actual" },
  { id: "anioAnt", label: "A. ant", fullLabel: "Año anterior" },
  { id: "comercial", label: "Ciclo comercial", fullLabel: "ciclo Comercial" },
];

interface FiltroFechaProps {
  setFechaInicio: (fecha: Dayjs) => void;
  setFechaFin: (fecha: Dayjs) => void;
}

export const FiltroFecha = ({
  setFechaInicio,
  setFechaFin,
}: FiltroFechaProps) => {
  const [activeButton, setActiveButton] = useState<string>("diaAnt");
  const [fechaInicioComercial, setFechaInicioComercial] = useState<Date>();
  const [fechaFinComercial, setFechaFinComercial] = useState<Date>();
  useEffect(() => {
    seleccionarFecha("diaAnt");
  }, []);
  const seleccionarFecha = async (option: string): Promise<void> => {
    setActiveButton(option);
    let startDate: Dayjs, endDate: Dayjs;

    switch (option) {
      case "hoy":
        startDate = dayjs().startOf("day");
        endDate = dayjs().endOf("day");
        break;
      case "diaAnt":
        startDate = dayjs().subtract(1, "day").startOf("day");
        endDate = dayjs().subtract(1, "day").endOf("day");
        break;
      case "semana":
        startDate = dayjs().subtract(1, "week").startOf("week");
        endDate = dayjs().subtract(1, "week").endOf("week");
        break;
      case "mes":
        startDate = dayjs().startOf("month");
        endDate = dayjs().endOf("month");
        break;
      case "mesAnt":
        startDate = dayjs().subtract(1, "month").startOf("month");
        endDate = dayjs().subtract(1, "month").endOf("month");
        break;
      case "anio":
        startDate = dayjs().startOf("year");
        endDate = dayjs().endOf("year");
        break;
      case "anioAnt":
        startDate = dayjs().subtract(1, "year").startOf("year");
        endDate = dayjs().subtract(1, "year").endOf("year");
        break;

      case "comercial":
        if (!fechaInicioComercial || !fechaFinComercial) {
          try {
            const response = await obtenerCicloComercial();
            setFechaInicioComercial(response.fechaInicio);
            setFechaFinComercial(response.fechaFin);

            const start = dayjs(response.fechaInicio).startOf("day");
            const end = dayjs(response.fechaFin).endOf("day");

            setFechaInicio(start);
            setFechaFin(end);
          } catch (error) {
            const e = error as AxiosError<any>;
            if (e.status == 404) {
              toast.error(e.response?.data.message);
            } else {
              toast.error(e.response?.data.message);
            }
            setFechaInicio(dayjs().startOf("day"));
            setFechaFin(dayjs().endOf("day"));
          }
        } else {
          setFechaInicio(dayjs(fechaInicioComercial).startOf("day"));
          setFechaFin(dayjs(fechaFinComercial).endOf("day"));
        }
        return;
      default:
        return;
    }
    setFechaInicio(startDate);
    setFechaFin(endDate);
  };

  return (
    <div className="bg-white p-2 rounded-xl shadow-sm border lg:w-[40%] md:w-[70%] w-full">
          <Toaster position="top-center" reverseOrder={false} />
      <div
        className="
      grid grid-cols-2 gap-2     
      sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:gap-2 
      bg-gray-100 rounded-lg p-1 w-full
    "
      >
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => seleccionarFecha(button.id)}
            className={`px-2 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
              activeButton === button.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title={button.fullLabel}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};
