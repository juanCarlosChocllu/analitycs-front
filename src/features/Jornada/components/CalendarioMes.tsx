import type { JornadaI } from "../interface/jornada";

interface CalendarioMesProps {
  ano: number;
  mes: number;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  modoSeleccion: "inicio" | "fin";
  onClickDia: (dia: Date) => void;
  color: string;
  jornada: JornadaI;
}

export const CalendarioMes: React.FC<CalendarioMesProps> = ({
  ano,
  mes,
  fechaInicio,
  fechaFin,
  onClickDia,
  color,
  jornada,
}) => {
  const diasMes = generarDiasDelMes(ano, mes);
  const diasRellenoInicio = getDiasRellenoInicio(ano, mes);
  const diasRellenoFin = getDiasRellenoFin(ano, mes);
  const todosDias = [...diasRellenoInicio, ...diasMes, ...diasRellenoFin];

  const nombreMes = new Date(ano, mes).toLocaleString("es-ES", {
    month: "long",
  });
  const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <div>
      <h4 className="capitalize text-sm font-semibold text-gray-700 mb-3 pb-2">
        {nombreMes} {ano}
      </h4>

      {/* Encabezado de días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {diasSemana.map((dia) => (
          <div
            key={dia}
            className="text-center text-xs font-semibold text-gray-500 py-1"
          >
            {dia}
          </div>
        ))}
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {todosDias.map((dia, idx) => {
          const diaStr = dia.toISOString().split("T")[0];
          const esFinDeSemana = [0, 6].includes(dia.getDay());
          const esMesActual = dia.getMonth() === mes;
          const esInicio =
            fechaInicio && dia.toDateString() === fechaInicio.toDateString();
          const esFin =
            fechaFin && dia.toDateString() === fechaFin.toDateString();
          const enRango = estaDentroDelRango(dia, fechaInicio, fechaFin);

          return (
            <button
              key={`${diaStr}-${idx}`}
              onClick={() => esMesActual && onClickDia(dia)}
              disabled={ !!jornada}
              className={`py-2 rounded-md border text-center font-medium transition-all duration-150 relative ${
                !esMesActual
                  ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                  : esInicio || esFin
                  ? `text-white border-transparent shadow-lg ring-2 ring-offset-1` // Mantener ring
                  : enRango
                  ? "text-white border-transparent"
                  : esFinDeSemana
                  ? "bg-red-50 text-red-500 border-red-100 hover:bg-red-100"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:shadow-md"
              }`}
              style={{
                backgroundColor:
                  (esInicio || esFin || enRango) && esMesActual
                    ? color
                    : undefined,
                opacity: enRango && !esInicio && !esFin ? 0.7 : 1,
              }}
            >
              {dia.getDate()}
              {esInicio && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
              )}
              {esFin && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const getDiasRellenoInicio = (ano: number, mes: number): Date[] => {
  const primerDia = new Date(ano, mes, 1);
  const diaSemana = primerDia.getDay();
  const diasRelleno: Date[] = [];

  const diasARellenar = diaSemana === 0 ? 6 : diaSemana - 1;

  for (let i = diasARellenar; i > 0; i--) {
    const fecha = new Date(ano, mes, 1 - i);
    diasRelleno.push(fecha);
  }

  return diasRelleno;
};

const getDiasRellenoFin = (ano: number, mes: number): Date[] => {
  const ultimoDia = new Date(ano, mes + 1, 0);
  const diaSemana = ultimoDia.getDay();
  const diasRelleno: Date[] = [];

  const diasARellenar = diaSemana === 0 ? 0 : 7 - diaSemana;

  for (let i = 1; i <= diasARellenar; i++) {
    const fecha = new Date(ano, mes + 1, i);
    diasRelleno.push(fecha);
  }

  return diasRelleno;
};

// Función para verificar si una fecha está en un rango
const estaDentroDelRango = (
  fecha: Date,
  inicio: Date | null,
  fin: Date | null
): boolean => {
  if (!inicio || !fin) return false;
  const fechaTime = fecha.getTime();
  const inicioTime = inicio.getTime();
  const finTime = fin.getTime();
  return fechaTime >= inicioTime && fechaTime <= finTime;
};

const generarDiasDelMes = (ano: number, mes: number): Date[] => {
  const dias: Date[] = [];
  const fechaInicio = new Date(ano, mes, 1);
  const fechaFin = new Date(ano, mes + 1, 0);
  for (
    let d = new Date(fechaInicio);
    d <= fechaFin;
    d.setDate(d.getDate() + 1)
  ) {
    dias.push(new Date(d));
  }
  return dias;
};
