import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { FilterScursalI, FilterTipoVenta, SucursalI, TipoVentaI } from "../../interfaces/BuscadorI";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export const SeleccionMultiple = ({
  label,
  value,
  onChange,
  placeholder,
  options
}: {
  label: string;
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label)
    .join(', ');

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      >
        <span className={value.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
          {selectedLabels || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 absolute right-3 top-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option.value)}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};



export const SucursalMultiSelect = ({sucursales,setSucursales}:FilterScursalI ) => {
  const [selectedSucursales, setSelectedSucursales] = useState<string[]>([]);

  const handleChange = (event:any) => {
    const {
      target: { value },
    } = event;
    setSelectedSucursales(typeof value === 'string' ? value.split(',') : value);
    
  
  };
  useEffect(()=>{
        setSucursales(selectedSucursales)
  },[selectedSucursales])

  return (
    <FormControl fullWidth>
      <InputLabel id="sucursal-label">Sucursal</InputLabel>
      <Select
        labelId="sucursal-label"
        id="sucursal"
        multiple
        value={selectedSucursales}
        onChange={handleChange}
        renderValue={(selected) =>
          sucursales
            .filter((s) => selected.includes(s._id))
            .map((s) => s.nombre)
            .join(', ')
        }
      >
        {sucursales.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            <Checkbox checked={selectedSucursales.includes(item._id)} />
            <ListItemText primary={item.nombre} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


export const TipoVentaMultiSelect = ({tipoVenta,setTipoVenta}:FilterTipoVenta ) => {
  const [selectedTipoVenta, setSelectedTipoVenta] = useState<string[]>([]);

  const handleChange = (event:any) => {
    const {
      target: { value },
    } = event;
    setSelectedTipoVenta(typeof value === 'string' ? value.split(',') : value);
  };
 useEffect(()=>{
        setTipoVenta(selectedTipoVenta)
  },[selectedTipoVenta])
  return (
    <FormControl fullWidth>
      <InputLabel id="tipoVenta-label">Tipo de venta</InputLabel>
      <Select
        labelId="tipoVenta-label"
        id="tipoVenta"
        multiple
        value={selectedTipoVenta}
        onChange={handleChange}
        renderValue={(selected) =>
          tipoVenta
            .filter((s) => selected.includes(s._id))
            .map((s) => s.nombre)
            .join(', ')
        }
      >
        {tipoVenta.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            <Checkbox checked={selectedTipoVenta.includes(item._id)} />
            <ListItemText primary={item.nombre} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};