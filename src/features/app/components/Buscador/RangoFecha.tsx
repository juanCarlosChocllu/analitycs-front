import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import type { RangoFechaI } from "../../interfaces/BuscadorI"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs";


export const RangoFecha = ({fechaFin,fechaInicio,setFechaFin ,setFechaInicio}:RangoFechaI) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
    <div className="flex items-center space-x-2">
      <DatePicker
        label="Fecha de Inicio"
        value={dayjs(fechaInicio)}
        onChange={(value) => setFechaInicio(value?.format('YYYY-MM-DD') || '')}
        maxDate={dayjs(fechaFin)}
        slotProps={{
          textField: {
            size: 'small',
            className: 'flex-1'
          }
        }}
      />
      <span className="text-gray-500 text-sm">-</span>
      <DatePicker
        label="Fecha de Fin"
        value={dayjs(fechaFin)}
        onChange={(value) => setFechaFin(value?.format('YYYY-MM-DD') || '')}
        minDate={dayjs(fechaInicio)}
        slotProps={{
          textField: {
            size: 'small',
            className: 'flex-1'
          }
        }}
      />
    </div>
  </LocalizationProvider>
  )
}
