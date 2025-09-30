import dayjs from "dayjs";
interface SeleccionarFechaProps {
    setActiveButton: React.Dispatch<React.SetStateAction<string>>;
    setFechaInicio: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
    setFechaFin: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
    option: string;
}
export const seleccionarFecha = ({ option, setActiveButton, setFechaInicio, setFechaFin }: SeleccionarFechaProps) => {
    setActiveButton(option);
    let startDate, endDate;
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
        startDate = dayjs().startOf("week");
        endDate = dayjs().endOf("week");
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