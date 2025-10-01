import { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import type { EmpresasI, filtroBuscadorI, FiltroBuscadorI, SucursalI } from "../../app/interfaces/BuscadorI";
import { formatFecha } from "../../app/util/formatFecha";
import { getEmpresas, getSucursalesPorEmpresa, listarTodasLasScursales } from "../../app/service/appService";
import MultiSelectBuscador from "../../app/components/Buscador/SeleccionMultiple";
import { RangoFecha } from "../../app/components/Buscador/RangoFecha";
import { FiltroFecha } from "../../app/components/FiltroFecha/FiltroFecha";
import { Box } from "@mui/material";
import { Filter } from "lucide-react";


export function BuscadorCotizacion({ setFiltro }: FiltroBuscadorI) {
  const date = new Date();
  const [region, setRegion] = useState<string>("BOLIVIA");
  const [empresas, setEmpresas] = useState<EmpresasI[]>([]);
  const [empresa, setEmpresa] = useState<string>("");
  const [sucursales, setSucursales] = useState<SucursalI[]>([]);
  const [todasSucursales, setTodasScursales] = useState<SucursalI[]>([]);
  const [fechaInicio, setFechaInicio] = useState<string>(formatFecha(date));
  const [fechaFin, setFechaFin] = useState<string>(formatFecha(date));

;

  const [sucursalesSeleccionados, setSucursalesSeleccionados] = useState<
    string[]
  >([]);


  useEffect(() => {
    listarEmpresas();
    localStorage.setItem("region", region);
    if (empresa && empresa !== "TODAS") {
      listarSucursal();
      setSucursalesSeleccionados([]);
      setSucursales([]);
    }
    if (empresa === "TODAS") {
      todasLasSucursales();
      setSucursalesSeleccionados([]);
      setTodasScursales([]);
    }
  }, [empresa, region]);

  const listarEmpresas = async () => {
    try {
      const response = await getEmpresas();
      setEmpresas(response);
    } catch (error) {
      console.log(error);
    }
  };

  

  const listarSucursal = async () => {
    try {
      if (empresa) {
        const response = await getSucursalesPorEmpresa(empresa);
        if (region === "BOLIVIA") {
          setSucursales(response.filter((item) => !item.nombre.includes("PARAGUAY")));
        } else if (region === "PARAGUAY") {
          setSucursales(response.filter((item) => item.nombre.includes(region)));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const todasLasSucursales = async () => {
    try {
      if (empresa) {
        const response = await listarTodasLasScursales();
     
        setTodasScursales(response);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const onClickFiltro = () => {
    let sucursalesFiltradas: string[] = [];
    
    if (empresa === "TODAS") {
      
      sucursalesFiltradas = obtenerSucursalesPorRegion(todasSucursales);
    } else if (empresa != 'TODAS' && sucursalesSeleccionados.length <= 0) {
      sucursalesFiltradas = obtenerSucursalesPorRegion(sucursales);
    } else if (sucursalesSeleccionados.length > 0) {
      

      sucursalesFiltradas = sucursalesSeleccionados
    }

    const dataFilter: filtroBuscadorI = {
      sucursal: sucursalesFiltradas,
      fechaFin: fechaFin,
      fechaInicio: fechaInicio,
    
    
    };



    setFiltro(dataFilter);
  };



  const findSucursalByNombre = (nombre: string[]) => {
    setSucursalesSeleccionados(nombre)
  };

 

  const obtenerSucursalesPorRegion = (sucursales: SucursalI[]) => {
    if (region === "BOLIVIA") {
      return sucursales.filter((item) => !item.nombre.includes("PARAGUAY")).map((item) => item._id);
    } else if (region === "PARAGUAY") {
      return sucursales.filter((item) => item.nombre.includes(region)).map((item) => item._id);
    }
    return [];
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
            <div className="flex items-center space-x-2">
              {region &&
                <div>
                  {region === "BOLIVIA" ? (
                    <img src="../banderaBolivia.svg" alt="Bolivia" width={32} />
                  ) : (
                    <img src="../banderaParaguay.svg" alt="Paraguay" width={32} />
                  )}
                </div>
              }
              <FormControl fullWidth size="small" sx={{ width: '200px' }}>
                <InputLabel id="region-label">Regi&oacute;n</InputLabel>
                <Select
                  labelId="region-label"
                  id="region"
                  value={region}
                  defaultValue="BOLIVIA"
                  label="Region"
                  onChange={(e) => setRegion(e.target.value)}
                  renderValue={(selected) => selected}
                >
                  <MenuItem value="BOLIVIA">
                    <em className="flex items-center space-x-2 gap-2"><img src="../banderaBolivia.svg" alt="" />BOLIVIA</em>
                  </MenuItem>
                  <MenuItem value="PARAGUAY">
                    <em className="flex items-center space-x-2 gap-2"><img src="../banderaParaguay.svg" alt="" />PARAGUAY</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            <Box>
              <FormControl fullWidth size="small">
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
            </Box>


            <MultiSelectBuscador
              label="Sucursal:"
              value={sucursalesSeleccionados}
              onChange={(value: string[]) => findSucursalByNombre(value)}
              setValue={(value: string[]) => setSucursalesSeleccionados(value)}
              placeholder="Seleccione una sucursal"
              options={sucursales}
            />

          

            <Box mt={2.8}>
              <RangoFecha
                fechaFin={fechaFin}
                fechaInicio={fechaInicio}
                setFechaFin={setFechaFin}
                setFechaInicio={setFechaInicio}
              />
            </Box>
          </div>
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Rangos de Fecha Rápidos
            </h3>
            <FiltroFecha
              setFechaFin={setFechaFin as any}
              setFechaInicio={setFechaInicio as any}
            />

           
            
              
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 ">
            <button
              onClick={() => onClickFiltro()}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
