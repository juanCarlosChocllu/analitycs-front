import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { useState } from "react";

dayjs.locale("es");

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
  ];

interface FiltroFechaProps {
   setFechaInicio: (fecha: Dayjs) => void;
   setFechaFin: (fecha: Dayjs) => void;
}

export const FiltroFecha = ({ setFechaInicio, setFechaFin }: FiltroFechaProps) => {
    const [activeButton, setActiveButton] = useState<string>("hoy");
    const seleccionarFecha = (option: string): void => {
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
          default:
            return;
        }
        setFechaInicio(startDate);
        setFechaFin(endDate);
      };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border lg:w-[40%] md:w-[70%] w-full">
    <div className="inline-flex bg-gray-100 rounded-lg p-2 w-full justify-center items-center">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => seleccionarFecha(button.id)}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
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
  )
}
