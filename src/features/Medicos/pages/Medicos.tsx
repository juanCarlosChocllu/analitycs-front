import { Stethoscope } from "lucide-react";
import { FiltroMedico } from "../../app/components/Filtro/FiltroMedico";
import { TablaMedico } from "../Components/TablaMedico";
import { HeardeTitulo } from "../../app/components/Header/HeardeTitulo";

export default function Medicos() {
  return (
    <div className="p-4">
      <HeardeTitulo
        titulo="KPIs de Desempeño de Médicos"
        subtitulo="Analiza el rendimiento y métricas de desempeño del personal médico"
        icono={<Stethoscope className="w-8 h-8 text-blue-600" />}
      />
      <FiltroMedico />
      <TablaMedico />
    </div>
  );
}
