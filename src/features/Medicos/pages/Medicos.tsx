import { Stethoscope } from "lucide-react";
import { FiltroMedico } from "../../app/components/Filtro/FiltroMedico";
import { TablaMedico } from "../Components/TablaMedico";
import { HeardeTitulo } from "../../app/components/Header/HeardeTitulo";
import { useEffect, useState } from "react";
import { optometraActual, optometraAnterior } from "../services/apiMedicos";
import type { ventaMedicoInterface } from "../interfaces/FiltroMedico";

export default function Medicos() {
  const [filtersActual, setFiltersActual] = useState<ventaMedicoInterface>(
    {
      empresa: [],
      sucursal: [],
      tipoVenta: [],
      flagVenta: "",
      comisiona: false,
      fechaInicio: "",
      fechaFin: "",
      especialidad: "",
    }
  );
  const [dataActual, setDataAtual] = useState([]);
  const [dataAnterior, setDataAnterior] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleSearch()
  }, [filtersActual]);
  const handleSearch = async () => {
    try {
      setLoading(true);
      const [responseActual, responseAnterior] = await Promise.all([
        optometraActual(filtersActual),
        optometraAnterior(filtersActual),
      ]);
      setDataAtual(responseActual);
      setDataAnterior(responseAnterior);
      setLoading(false);
      console.table(responseActual);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="p-4">
      {loading && <span>Cargando...</span> }
      <HeardeTitulo
        titulo="KPIs de Desempeño de Médicos"
        subtitulo="Analiza el rendimiento y métricas de desempeño del personal médico"
        icono={<Stethoscope className="w-8 h-8 text-blue-600" />}
      />
      <FiltroMedico  onFilterChange={setFiltersActual}/>
      <TablaMedico dataActual={dataActual} dataAnterior={dataAnterior} />
    
    </div>
  );
}
