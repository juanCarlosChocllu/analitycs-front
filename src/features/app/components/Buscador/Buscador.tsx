import { useEffect, useState } from "react";
import { Search, ChevronDown, Filter, X, Check } from "lucide-react";
import {
  getEmpresas,
  getSucursalesPorEmpresa,
  getTipoVenta,
} from "../../service/appService";
import type {
  EmpresasI,
  FiltroBuscadorI,
  filtroBuscadorI,
  SelectFieldProps,
  SucursalI,
  TipoVentaI,
} from "../../interfaces/BuscadorI";
import {
  SeleccionMultiple,
  SucursalMultiSelect,
  TipoVentaMultiSelect,
} from "./SeleccionMultiple";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { RangoFecha } from "./RangoFecha";
import { formatFecha } from "../../util/formatFecha";
import {
  format,
  subMonths,
  subDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const DateRangeButton = ({
  label,
  onClick,
}: {
  label: string;

  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-20`}
  >
    {label}
  </button>
);

export function Buscador({ setFiltro,filtro }: FiltroBuscadorI) {
  const date = new Date();
  const [empresas, setEmpresas] = useState<EmpresasI[]>([]);
  const [tipoVenta, setTipoVentas] = useState<TipoVentaI[]>([]);
  const [empresa, setEmpresa] = useState<string>("");
  const [sucursales, setSucursales] = useState<SucursalI[]>([]);
  const [fechaInicio, setFechaInicio] = useState<string>(formatFecha(date));
  const [fechaFin, setFechaFin] = useState<string>(formatFecha(date));
  const [comisiona, setComisiona] = useState<boolean>(false);
  const [noComisiona, setNoComisiona] = useState<boolean>(false);
  const [realizadas, setRealizadas] = useState<boolean>(false);
  const [finalizadas, setFinalizadas] = useState<boolean>(false);
  const [sucursalesSeleccionados, setSucursalesSeleccionados] = useState<string[]>([]);
  const [tipoVentaSelecionado, setTipoVentaSeleccionado] = useState<string[]>([]);
  const [flagVenta, setFlagVenta] = useState<string>('');
  
  useEffect(() => {
    listarEmpresas();
    listarTipoVenta();
    if (empresa) {
      listarSucursal();
    }
  }, [empresa]);

  const listarEmpresas = async () => {
    try {
      const response = await getEmpresas();
      setEmpresas(response);
    } catch (error) {
      console.log(error);
    }
  };

  const listarTipoVenta = async () => {
    try {
      const response = await getTipoVenta();
      setTipoVentas(response);
    } catch (error) {
      console.log(error);
    }
  };

  const listarSucursal = async () => {
    try {
      if (empresa) {
        const response = await getSucursalesPorEmpresa(empresa);
        setSucursales(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickFiltro = () => {
 
      const dataFilter: filtroBuscadorI = {
      empresa: empresa === "TODAS" ? empresas.map((item) => item._id) : [empresa],
      sucursal: empresa === "TODAS" ? []: sucursalesSeleccionados.length > 0 ?sucursalesSeleccionados : sucursales.map((item)=> item._id),
      fechaFin: fechaFin,
      fechaInicio: fechaInicio,
      flagVenta: flagVenta,
      tipoVenta: tipoVentaSelecionado,
      comisiona: !comisiona && !noComisiona ? null : comisiona ? true : false
    }
    
    
    setFiltro(dataFilter)


  }


  const timeRangeButtons = [
    { label: "Día anterior", value: "dia-ant" },
    { label: "Semana anterior", value: "sem-ant" },
    { label: "Este mes", value: "mes" },
    { label: "Mes anterior", value: "mes-ant" },
    { label: "Este año", value: "año" },
    { label: "Año anterior", value: "año-ant" },
  ];
  const handleCustomDateOption = (option: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (option) {
      case "dia-ant":
        startDate = startOfDay(subDays(now, 1));
        endDate = endOfDay(subDays(now, 1));
        break;

      case "sem-ant":
        startDate = startOfWeek(subDays(now, 7), { weekStartsOn: 1 });
        endDate = endOfWeek(subDays(now, 7), { weekStartsOn: 1 });
        break;

      case "mes":
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;

      case "mes-ant":
        startDate = startOfMonth(subMonths(now, 1));
        endDate = endOfMonth(subMonths(now, 1));
        break;

      case "año":
        startDate = startOfYear(now);
        endDate = endOfYear(now);
        break;

      case "año-ant":
        const previousYear = now.getFullYear() - 1;
        startDate = new Date(previousYear, 0, 1);
        endDate = new Date(previousYear, 11, 31);
        break;

      default:
        return;
    }
    setFechaInicio(formatFecha(startDate));
    setFechaFin(formatFecha(endDate));
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-[95%] mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Filtros de Búsqueda
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            <FormControl fullWidth>
              <InputLabel id="empresa-label">Empresa</InputLabel>
              <Select
                labelId="empresa-label"
                id="empresa"
                value={empresa}
                label="Empresa"
                onChange={(e) => setEmpresa(e.target.value)}
              >
                <MenuItem value="TODAS">
                  <em>TODAS</em>
                </MenuItem>
                {empresas.map((empresa) => (
                  <MenuItem key={empresa._id} value={empresa._id}>
                    {empresa.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <SucursalMultiSelect sucursales={sucursales} setSucursales={setSucursalesSeleccionados} />

            <TipoVentaMultiSelect tipoVenta={tipoVenta} setTipoVenta={setTipoVentaSeleccionado} />
            <RangoFecha
              fechaFin={fechaFin}
              fechaInicio={fechaInicio}
              setFechaFin={setFechaFin}
              setFechaInicio={setFechaInicio}
            />
          </div>
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Rangos de Fecha Rápidos
            </h3>
            <div className="flex flex-wrap gap-2">
              {timeRangeButtons.map((button) => (
                <DateRangeButton
                  key={button.value}
                  label={button.label}
                  onClick={() => handleCustomDateOption(button.value)}
                />
              ))}
            </div>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comisiona}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setComisiona(checked);

                      if (checked) setNoComisiona(false);
                    }}
                  />
                }
                label="Comisiona"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noComisiona}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setNoComisiona(checked);

                      if (checked) setComisiona(false);
                    }}
                  />
                }
                label="No comisiona"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={realizadas}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRealizadas(checked);
                      setFlagVenta('REALIZADAS')
                      if (checked) setFinalizadas(false);
                    }}
                  />
                }
                label="Realizadas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={finalizadas}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFinalizadas(checked);
                      setFlagVenta('FINALIZADA')
                      if (checked) setRealizadas(false);
                    }}
                  />
                }
                label="Finalizadas"
              />
            </FormGroup>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 ">
            <button onClick={() => onClickFiltro()} className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
