import { useContext, useEffect, useState } from "react";

import {
  getEmpresas,
  getSucursalesPorEmpresa,
  getTipoVenta,
  listarTodasLasScursales,
} from "../../service/appService";
import type {
  EmpresasI,
  FiltroBuscadorI,
  filtroBuscadorI,
  SucursalI,
  TipoVentaI,
} from "../../interfaces/BuscadorI";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { formatFecha } from "../../util/formatFecha";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MultiSelectBuscador from "./SeleccionMultiple";
import { Box } from "@mui/material";
import { FiltroFecha } from "../FiltroFecha/FiltroFecha";
import { RangoFecha } from "./RangoFecha";
import { AutenticacionContext } from "../../context/AuntenticacionProvider";

const tipoVentaDefecto: string[] = [
  "68d6ec1640097b172ba86eb0",
  "68d6eca140097b172ba8b893",
];
const filtroPorDefecto = [
  {
    path: [
      "/listar/rendimiento/asesor",
      "/rendimiento/semanal/asesor",
      "/avance/metas/asesor",
      "/avance/ventas/asesor",
    ],
    flagVenta: { Flag: "REALIZADAS", estado: true },
    comision: true,
    tipoVenta: tipoVentaDefecto,
  },
];

export function BuscadorBase({ setFiltro }: FiltroBuscadorI) {
  const date = new Date();
  const { idEmpresa, rol, idSucursal } = useContext(AutenticacionContext);

  const [region, setRegion] = useState<string>("BOLIVIA");
  const [empresas, setEmpresas] = useState<EmpresasI[]>([]);
  const [tipoVenta, setTipoVentas] = useState<TipoVentaI[]>([]);
  const [empresa, setEmpresa] = useState<string>("");
  const [sucursales, setSucursales] = useState<SucursalI[]>([]);
  const [todasSucursales, setTodasScursales] = useState<SucursalI[]>([]);
  const [fechaInicio, setFechaInicio] = useState<string>(formatFecha(date));
  const [fechaFin, setFechaFin] = useState<string>(formatFecha(date));
  const [comisiona, setComisiona] = useState<boolean>(false);
  const [noComisiona, setNoComisiona] = useState<boolean>(false);
  const [realizadas, setRealizadas] = useState<boolean>(false);
  const [finalizadas, setFinalizadas] = useState<boolean>(false);
  const [disableEmpresa, setDisableEmpresa] = useState<boolean>(false);
  const [disableSucursal, setDisableSucursal] = useState<boolean>(false);
  const [disableTipoVenta, setDisableTipoVenta] = useState<boolean>(false);
  const [sucursalesSeleccionados, setSucursalesSeleccionados] = useState<
    string[]
  >([]);
  const [tipoVentaSelecionado, setTipoVentaSeleccionado] = useState<string[]>(
    []
  );

  const [flagVenta, setFlagVenta] = useState<string>("");

  // funciones de auto seleccion
  useEffect(() => {
    if (rol != "ADMINISTRADOR") {
      if (idEmpresa) {
        const path = window.location.pathname;
        setEmpresa(idEmpresa);
        setRealizadas(true);
        setFlagVenta("REALIZADAS");
        setDisableEmpresa(true);
        setDisableSucursal(true);
        setDisableTipoVenta(true);
        setComisiona(true);
        for (const item of filtroPorDefecto) {
          if (item.path.includes(path)) {
            setComisiona(item.comision);
            setFlagVenta(item.flagVenta.Flag);
            setRealizadas(item.flagVenta.estado);
          }
        }
      }
    } else {
      setEmpresa("TODAS");
      setComisiona(true);
      setFlagVenta("FINALIZADO");
      setFinalizadas(true);
    }
  }, [idEmpresa]);

  useEffect(() => {
    if (rol != "ADMINISTRADOR") {
      if (idSucursal && sucursales.length > 0) {
        const existe = sucursales.find((s) => s._id === idSucursal);
        if (existe) {
          setSucursalesSeleccionados([idSucursal]);
          findSucursalByNombre([idSucursal]);
        }
      }
    }
  }, [idSucursal, sucursales]);

  useEffect(() => {
    ///filtro por defecto tipo venta
    for (const item of filtroPorDefecto) {
      const path = window.location.pathname;
      if (item.path.includes(path)) {
        setTipoVentaSeleccionado(item.tipoVenta);
        onChangeTipoVenta(item.tipoVenta);
      }
    }
  }, []);

  //--------------------

  useEffect(() => {
    listarEmpresas();
    listarTipoVenta();
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
        if (region === "BOLIVIA") {
          setSucursales(
            response.filter((item) => !item.nombre.includes("PARAGUAY"))
          );
        } else if (region === "PARAGUAY") {
          setSucursales(
            response.filter((item) => item.nombre.includes(region))
          );
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
    } else if (empresa != "TODAS" && sucursalesSeleccionados.length <= 0) {
      sucursalesFiltradas = obtenerSucursalesPorRegion(sucursales);
    } else if (sucursalesSeleccionados.length > 0) {
      sucursalesFiltradas = sucursalesSeleccionados;
    }

    const dataFilter: filtroBuscadorI = {
      sucursal: sucursalesFiltradas,
      fechaFin: fechaFin,
      fechaInicio: fechaInicio,
      flagVenta: flagVenta,
      tipoVenta: tipoVentaSelecionado,
      comisiona: !comisiona && !noComisiona ? null : comisiona ? true : false,
    };

    setFiltro(dataFilter);
  };

  const findSucursalByNombre = (nombre: string[]) => {
    setSucursalesSeleccionados(nombre);
  };

  const onChangeTipoVenta = (nombre: string[]) => {
    setTipoVentaSeleccionado(nombre);
  };

  const obtenerSucursalesPorRegion = (sucursales: SucursalI[]) => {
    if (region === "BOLIVIA") {
      return sucursales
        .filter((item) => !item.nombre.includes("PARAGUAY"))
        .map((item) => item._id);
    } else if (region === "PARAGUAY") {
      return sucursales
        .filter((item) => item.nombre.includes(region))
        .map((item) => item._id);
    }
    return [];
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[95%] mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            {/* Título */}
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Filtros de Búsqueda
              </h2>
            </div>

            {/* Región */}
            <div className="flex items-center space-x-2">
              {region && (
                <div>
                  {region === "BOLIVIA" ? (
                    <img src="/banderaBolivia.svg" alt="Bolivia" width={32} />
                  ) : (
                    <img src="/banderaParaguay.svg" alt="Paraguay" width={32} />
                  )}
                </div>
              )}
              <FormControl fullWidth size="small" sx={{ width: "200px" }}>
                <InputLabel id="region-label">Región</InputLabel>
                <Select
                  labelId="region-label"
                  id="region"
                  value={region}
                  defaultValue="BOLIVIA"
                  label="Región"
                  onChange={(e) => setRegion(e.target.value)}
                  renderValue={(selected) => selected}
                >
                  <MenuItem value="BOLIVIA">
                    <em className="flex items-center gap-2">
                      <img src="../banderaBolivia.svg" alt="" />
                      BOLIVIA
                    </em>
                  </MenuItem>
                  <MenuItem value="PARAGUAY">
                    <em className="flex items-center gap-2">
                      <img src="../banderaParaguay.svg" alt="" />
                      PARAGUAY
                    </em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            <Box mt={2.6}>
              <FormControl fullWidth size="small">
                <InputLabel id="empresa-label">Empresa</InputLabel>
                <Select
                  labelId="empresa-label"
                  id="empresa"
                  value={empresa}
                  disabled={disableEmpresa}
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
              disable={disableSucursal}
              value={sucursalesSeleccionados}
              onChange={(value: string[]) => findSucursalByNombre(value)}
              setValue={(value: string[]) => setSucursalesSeleccionados(value)}
              placeholder="Seleccione una sucursal"
              options={sucursales}
            />

            <MultiSelectBuscador
              label="Tipo de venta:"
              disable={disableTipoVenta}
              value={tipoVentaSelecionado}
              onChange={(value: string[]) => onChangeTipoVenta(value)}
              setValue={(value: string[]) => setTipoVentaSeleccionado(value)}
              placeholder="Seleccione un tipo de venta"
              options={tipoVenta}
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

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={rol != "ADMINISTRADOR" && true}
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
                    disabled={rol != "ADMINISTRADOR" && true}
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
                    disabled={rol != "ADMINISTRADOR" && true}
                    checked={realizadas}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRealizadas(checked);
                      setFlagVenta("REALIZADAS");
                      if (checked) setFinalizadas(false);
                    }}
                  />
                }
                label="Realizadas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={rol != "ADMINISTRADOR" && true}
                    checked={finalizadas}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFinalizadas(checked);
                      setFlagVenta("FINALIZADO");
                      if (checked) setRealizadas(false);
                    }}
                  />
                }
                label="Finalizadas"
              />
            </FormGroup>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 ">
            <button
              onClick={() => onClickFiltro()}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
