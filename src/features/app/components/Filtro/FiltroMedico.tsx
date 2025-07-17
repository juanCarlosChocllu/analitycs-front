<<<<<<< HEAD
import { useState } from 'react';
import { SelectField } from './components/SelectField';
import { SearchField } from './components/SearchField';
import { CheckboxFilter } from './components/CheckboxFilter';
import { DateRangeButton } from './components/DateRangeButton';
=======
import { useEffect, useState } from "react";
import { SelectField } from "./components/SelectField";
import { SearchField } from "./components/SearchField";
import { CheckboxFilter } from "./components/CheckboxFilter";
import type {
  EmpresasI,
  SucursalI,
  TipoVentaI,
} from "../../interfaces/BuscadorI";
import { getEmpresas, getSucursalesPorEmpresa, getTipoVenta } from "../../service/appService";
import MultiSelect from "./components/MultiSelect";
import type { FiltroMedicoInterface, ventaMedicoInterface } from "../../../Medicos/interfaces/FiltroMedico";
import { seleccionarFecha } from "../../utils/seleccionarFecha";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
>>>>>>> 6b4cc98ffd866dc6f36f1a84d7a6727747ce97ac

interface FiltroMedicoProps {
    onFilterChange: React.Dispatch<React.SetStateAction<ventaMedicoInterface>>;
}

export const FiltroMedico = ({onFilterChange}: FiltroMedicoProps) => {
  const [empresas, setEmpresas] = useState<EmpresasI[]>([]);
  const [sucursales, setSucursales] = useState<SucursalI[]>([]);
  const [tipoVenta, setTipoVenta] = useState<TipoVentaI[]>([]);
  const [nombreEmpresas, setNombreEmpresas] = useState<string[]>([]);
  const [nombreSucursales, setNombreSucursales] = useState<string[]>([]);
  const [nombreTipoVenta, setNombreTipoVenta] = useState<string[]>([]);
  const [fechaInicio, setFechaInicio] = useState<dayjs.Dayjs>(dayjs());
  const [fechaFin, setFechaFin] = useState<dayjs.Dayjs>(dayjs());
  const [activeButton, setActiveButton] = useState("hoy");
  const [filters, setFilters] = useState<FiltroMedicoInterface>({
    empresa: [],
    sucursal: [],
    tipoVenta: [],
    flagVenta: "",
    comisiona: false,
    fechaInicio: "",
    fechaFin: "",
  });

  // Additional filters not in the interface
  const [additionalFilters, setAdditionalFilters] = useState({
    noComisiona: false,
    optometristas: false,
    oftalmologos: false,
    realizadas: false,
    finalizadas: false,
    buscarMedico: "",
  });

  const updateFilter = (key: keyof (FiltroMedicoInterface & typeof additionalFilters), value: any) => {
    if (key in filters) {
      setFilters((prev) => ({ ...prev, [key]: value }));
    } else {
      setAdditionalFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Log filters after state update
  useEffect(() => {
    console.log("Filters updated:", { ...filters, ...additionalFilters });
  }, [filters, additionalFilters]);

  useEffect(() => {
    updateFilter("fechaInicio", fechaInicio.format('YYYY-MM-DD'));
    updateFilter("fechaFin", fechaFin.format('YYYY-MM-DD'));
  }, [fechaInicio, fechaFin]);

  const clearFilters = () => {
    setFilters({
      empresa: [],
      sucursal: [],
      tipoVenta: [],
      flagVenta: "",
      comisiona: false,
      fechaInicio: "",
      fechaFin: "",
    });
    setAdditionalFilters({
      noComisiona: false,
      optometristas: false,
      oftalmologos: false,
      realizadas: false,
      finalizadas: false,
      buscarMedico: "",
    });
    setActiveButton("hoy");
    // Reset dates to current date
    setFechaInicio(dayjs());
    setFechaFin(dayjs());
  };

  const buscarMedicos = () => {
    let idEmpresa: string[] = [];
    if (filters.empresa.includes("TODAS")) {
      idEmpresa = empresas.map((empresa) => empresa._id);
    } else {
      idEmpresa = empresas.filter((empresa) => filters.empresa.includes(empresa.nombre)).map((empresa) => empresa._id);
    }
    const idSucursal: string[] = sucursales.filter((sucursal) => filters.sucursal.includes(sucursal.nombre)).map((sucursal) => sucursal._id);
    const idTipoVenta: string[] = tipoVenta.filter((tipoVenta) => filters.tipoVenta.includes(tipoVenta.nombre)).map((tipoVenta) => tipoVenta._id);
    const comisiona = additionalFilters.noComisiona ? false : true;
    const especialidad = "";
    const flagVenta = additionalFilters.realizadas ? "REALIZADAS" : "FINALIZADO";
    const allFilters: ventaMedicoInterface = {  empresa: idEmpresa, sucursal: idSucursal, tipoVenta: idTipoVenta, comisiona, especialidad, flagVenta, fechaInicio: filters.fechaInicio, fechaFin: filters.fechaFin };
    console.log("Searching with filters:", allFilters);
    onFilterChange(allFilters);
  };

  const buttonTimeRange = [
    { id: "hoy", label: "Hoy", fullLabel: "Día actual" },
    { id: "diaAnt", label: "D. ant", fullLabel: "Día anterior" },
    { id: "semana", label: "S. ant", fullLabel: "Semana anterior" },
    { id: "mes", label: "Mes", fullLabel: "Mes actual" },
    { id: "mesAnt", label: "M. ant", fullLabel: "Mes anterior" },
    { id: "anio", label: "Año", fullLabel: "Año actual" },
    { id: "anioAnt", label: "A. ant", fullLabel: "Año anterior" },
  ];

  const hasActiveFilters = Object.values(filters).some((value) => {
    if (value === null) return false;
    if (typeof value === "boolean") return value;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.length > 0;
    return false;
  }) || Object.values(additionalFilters).some((value) => {
    if (typeof value === "boolean") return value;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.length > 0;
    return false;
  });

  useEffect(() => {
    obtenerEmpresas();
    obtenerTipoVenta();
  }, []);

  const obtenerEmpresas = async () => {
    try {
      const response = await getEmpresas();
      const nombresEmpresas = response.map((empresa) => empresa.nombre);
      setNombreEmpresas(nombresEmpresas);
      setEmpresas(response);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };

  const obtenerSucursales = async (empresaId: string) => {
    try {
      const response = await getSucursalesPorEmpresa(empresaId);
      const nombresSucursales = response.map((sucursal) => sucursal.nombre);
      setSucursales(response);
      setNombreSucursales(nombresSucursales);
    } catch (error) {
      console.error("Error al obtener sucursales:", error);
    }
  };

  const obtenerTipoVenta = async () => {
    try {
      const response = await getTipoVenta();
      const nombresTipoVenta = response.map((tipoVenta) => tipoVenta.nombre);
      setTipoVenta(response);
      setNombreTipoVenta(nombresTipoVenta);
    } catch (error) {
      console.error("Error al obtener tipo de venta:", error);
    }
  };

  const handleEmpresaChange = (value: string[]) => {
    updateFilter("empresa", value);
    // Clear sucursales when empresa changes
    updateFilter("sucursal", []);
    setSucursales([]);
    setNombreSucursales([]);

    // Load sucursales for the selected empresa
    if (value.length > 0) {
      const selectedEmpresa = empresas.find((empresa) => empresa.nombre === value[0]);
      if (selectedEmpresa) {
        obtenerSucursales(selectedEmpresa._id);
      }
    }
  };

  // Handle manual date changes
  const handleFechaInicioChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setFechaInicio(newValue);
      updateFilter("fechaInicio", newValue.format('YYYY-MM-DD'));
    }
  };

  const handleFechaFinChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setFechaFin(newValue);
      updateFilter("fechaFin", newValue.format('YYYY-MM-DD'));

    }
  };

  return (
    <div className=" mx-auto w-[90%]">
      {/* Filters Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {/* Main Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <SelectField
            label="Cadena:"
            value={filters.empresa[0] || ""}
            onChange={handleEmpresaChange}
            placeholder="Seleccione una cadena"
            options={nombreEmpresas}
          />
          <MultiSelect
            label="Sucursal:"
            value={filters.sucursal}
            onChange={(value) => updateFilter("sucursal", value)}
            setValue={(value) => updateFilter("sucursal", value)}
            placeholder="Seleccione una sucursal"
            options={nombreSucursales}
          />

          <MultiSelect
            label="Tipo de venta:"
            value={filters.tipoVenta}
            onChange={(value) => updateFilter("tipoVenta", value)}
            setValue={(value) => updateFilter("tipoVenta", value)}
            placeholder="Seleccione un tipo de venta"
            options={nombreTipoVenta}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              &nbsp;
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <div className="flex items-center space-x-2">
                <DatePicker
                  label="Fecha de Inicio"
                  value={fechaInicio}
                  onChange={handleFechaInicioChange}
                  maxDate={fechaFin}
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
                  value={fechaFin}
                  onChange={handleFechaFinChange}
                  minDate={fechaInicio}
                  slotProps={{
                    textField: {
                      size: 'small',
                      className: 'flex-1'
                    }
                  }}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>

        {/* Checkboxes and Date Range Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          {/* Left side - Checkboxes */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-4 border border-gray-200 p-2 rounded-lg">
              <CheckboxFilter
                label="Comisiona"
                checked={filters.comisiona === true}
                onChange={(checked) => updateFilter("comisiona", checked ? true : false)}
              />
              <CheckboxFilter
                label="No comisiona"
                checked={additionalFilters.noComisiona}
                onChange={(checked) => updateFilter("noComisiona", checked ? true : false)}
              />
            </div>

            <div className="flex items-center space-x-4 border border-gray-200 p-2 rounded-lg">
              <CheckboxFilter
                label="Optometristas"
                checked={additionalFilters.optometristas}
                onChange={(checked) => updateFilter("optometristas", checked)}
              />
              <CheckboxFilter
                label="Oftalmólogos"
                checked={additionalFilters.oftalmologos}
                onChange={(checked) => updateFilter("oftalmologos", checked)}
              />
            </div>

            <div className="flex items-center space-x-4 border border-gray-200 p-2 rounded-lg">
              <CheckboxFilter
                label="Realizadas"
                checked={additionalFilters.realizadas}
                onChange={(checked) => updateFilter("realizadas", checked)}
              />
              <CheckboxFilter
                label="Finalizadas"
                checked={additionalFilters.finalizadas}
                onChange={(checked) => updateFilter("finalizadas", checked)}
              />
            </div>
          </div>

          {/* Right side - Date Range Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 bg-gray-100 p-2 rounded-lg">
            {buttonTimeRange.map((button) => (
              <button
                key={button.id}
                onClick={() => seleccionarFecha({ option: button.id, setActiveButton, setFechaInicio, setFechaFin })}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeButton === button.id
                    ? "bg-gradient-to-r from-emerald-600 to-green-400 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
                title={button.fullLabel}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Doctor Row */}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <div className="max-w-md">
            <SearchField
              label="Buscar Médico:"
              value={additionalFilters.buscarMedico}
              onChange={(value) => updateFilter("buscarMedico", value)}
              placeholder="Ingrese el nombre del médico"
            />
          </div>
        </div>

        {/* Action Buttons */}
        {hasActiveFilters && (
          <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Limpiar filtros
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200"
              onClick={buscarMedicos}
            >
              Aplicar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};