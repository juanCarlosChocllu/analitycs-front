import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Eye, EyeOff, Search } from "lucide-react";
import Button from "@mui/material/Button";
import "dayjs/locale/es";
import { FiltroFecha } from "../../app/components/FiltroFecha/FiltroFecha";
import { listarRecetasMedicos } from "../services/apiMedicos";
import type { RecetaData } from "../interfaces/RecetaMedico";
import { DetalleReceta } from "../Components/DetalleReceta";
import { Input } from "@mui/material";

dayjs.locale("es");

// Tipos y constantes
const OPCIONES_FILAS_POR_PAGINA = [10, 20, 30, 50, 100] as const;
const FILAS_POR_PAGINA_INICIAL = 20;

const TIPO_ORDENAMIENTO = {
  ASCENDENTE: "asc",
  DESCENDENTE: "desc",
} as const;

const CAMPOS_ORDENABLES = {
  MEDICO: "medico",
  ESPECIALIDAD: "especialidad",
  CANTIDAD_MEDICIONES: "recetasRegistradas",
  MEDICIONES_CONVERTIDAS_A_VENTA: "ventasRealizadas",
  TASA_CONVERSION: "tasaConversion",
} as const;

// Tipos
type TipoOrdenamiento = typeof TIPO_ORDENAMIENTO[keyof typeof TIPO_ORDENAMIENTO];
type CampoOrdenable = typeof CAMPOS_ORDENABLES[keyof typeof CAMPOS_ORDENABLES];

export const RecetaMedico: React.FC = () => {
  const [paginaActual, setPaginaActual] = React.useState<number>(0);
  const [medico, setMedico] = React.useState<string>("");
  const [recetaInicial, setRecetaInicial] = React.useState<RecetaData[]>([]);
  const [filasPorPagina, setFilasPorPagina] = React.useState<number>(FILAS_POR_PAGINA_INICIAL);
  const [estaCargando, setEstaCargando] = React.useState<boolean>(false);
  const [tasaTotalConversion, setTasaTotalConversion] = useState<number>(0);
  const [indiceFilaExpandida, setIndiceFilaExpandida] = React.useState<number | null>(null);
  const [fechaInicio, setFechaInicio] = React.useState<Dayjs>(dayjs());
  const [fechaFin, setFechaFin] = React.useState<Dayjs>(dayjs());
  const [recetas, setRecetas] = React.useState<RecetaData[]>([]);
  const [tipoOrdenamiento, setTipoOrdenamiento] = React.useState<TipoOrdenamiento>(TIPO_ORDENAMIENTO.ASCENDENTE);
  const [campoOrdenadoPor, setCampoOrdenadoPor] = React.useState<CampoOrdenable>(CAMPOS_ORDENABLES.MEDICO);
 
  useEffect(() => {
    console.log("useEffect ejecutándose");
    console.log("fechaInicio:", fechaInicio.toISOString().split("T")[0]);
    console.log("fechaFin:", fechaFin.toISOString().split("T")[0]);

    setEstaCargando(true);

    listarRecetasMedicos(
      {
        fechaInicio: fechaInicio.toISOString().split("T")[0],
        fechaFin: fechaFin.toISOString().split("T")[0],
      }
    )
      .then((datos: RecetaData[]) => {
        console.log("Respuesta recibida:", datos);
        setRecetas(datos);
        setEstaCargando(false);
      })
      .catch((error: Error) => {
        console.error("Error:", error);
        setEstaCargando(false);
      });
  }, []);

  const manejarCambioPagina = (nuevaPagina: number): void => {
    setPaginaActual(nuevaPagina);
  };

  const manejarCambioFilasPorPagina = (evento: React.ChangeEvent<HTMLInputElement>): void => {
    setFilasPorPagina(+evento.target.value);
    setPaginaActual(0);
  };

  const alternarDetalle = (indice: number): void => {
    setIndiceFilaExpandida((indiceAnterior) =>
      indiceAnterior === indice ? null : indice
    );
  };

  const compararDescendente = (a: RecetaData, b: RecetaData, campoOrdenamiento: CampoOrdenable): number => {
    const valorA = a[campoOrdenamiento];
    const valorB = b[campoOrdenamiento];

    if (valorB < valorA) return -1;
    if (valorB > valorA) return 1;
    return 0;
  };

  const obtenerComparador = (orden: TipoOrdenamiento, campoOrdenamiento: CampoOrdenable) => {
    return orden === TIPO_ORDENAMIENTO.DESCENDENTE
      ? (a: RecetaData, b: RecetaData) => compararDescendente(a, b, campoOrdenamiento)
      : (a: RecetaData, b: RecetaData) => -compararDescendente(a, b, campoOrdenamiento);
  };

  const manejarSolicitudOrdenamiento = (propiedad: CampoOrdenable): void => {
    const esAscendente =
      campoOrdenadoPor === propiedad &&
      tipoOrdenamiento === TIPO_ORDENAMIENTO.ASCENDENTE;
    const nuevoTipoOrdenamiento = esAscendente
      ? TIPO_ORDENAMIENTO.DESCENDENTE
      : TIPO_ORDENAMIENTO.ASCENDENTE;

    setTipoOrdenamiento(nuevoTipoOrdenamiento);
    setCampoOrdenadoPor(propiedad);
  };

  const crearManejadorOrdenamiento = (propiedad: CampoOrdenable) => () => {
    manejarSolicitudOrdenamiento(propiedad);
  };

  const recetasOrdenadas = React.useMemo(
    () =>
      [...recetas].sort(obtenerComparador(tipoOrdenamiento, campoOrdenadoPor)),
    [recetas, tipoOrdenamiento, campoOrdenadoPor]
  );

  const estiloVisualmenteOculto: React.CSSProperties = {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  };

  const crearEtiquetaOrdenamiento = (campo: CampoOrdenable, texto: string) => (
    <TableSortLabel
      active={campoOrdenadoPor === campo}
      direction={
        campoOrdenadoPor === campo
          ? tipoOrdenamiento
          : TIPO_ORDENAMIENTO.ASCENDENTE
      }
      onClick={crearManejadorOrdenamiento(campo)}
    >
      {texto}
      {campoOrdenadoPor === campo ? (
        <Box component="span" sx={estiloVisualmenteOculto}>
          {tipoOrdenamiento === TIPO_ORDENAMIENTO.DESCENDENTE
            ? "ordenado descendente"
            : "ordenado ascendente"}
        </Box>
      ) : null}
    </TableSortLabel>
  );

  const buscarRecetas = (): void => {
    setEstaCargando(true);

    listarRecetasMedicos(
      {
        fechaInicio: fechaInicio.toISOString().split("T")[0],
        fechaFin: fechaFin.toISOString().split("T")[0],
      }
    )
      .then((datos: RecetaData[]) => {
        console.log("Respuesta recibida:", datos);
        setRecetas(datos);
        setRecetaInicial(datos);
        setEstaCargando(false);
      })
      .catch((error: Error) => {
        console.error("Error:", error);
        setEstaCargando(false);
      });
  };
  const filtrarRecetasPorMedico = (): void => {
    const recetasFiltradas = recetaInicial.filter((receta) => receta.medico.toLowerCase().includes(medico.toLowerCase()));
    setRecetas(recetasFiltradas);
  };

  const calcularTasaConversion = (): void => {
    if (recetas.length === 0) {
      setTasaTotalConversion(0);
      return;
    }
    const totalRecetas = recetas.reduce((total, fila) => total + fila.recetasRegistradas, 0);
    const totalVentas = recetas.reduce((total, fila) => total + fila.ventasRealizadas, 0);
    const tasaConversion = (totalVentas / totalRecetas) * 100;
    setTasaTotalConversion(Number(tasaConversion.toFixed(2)));
  };

  useEffect(() => {
    calcularTasaConversion();
  }, [recetas]);

  useEffect(() => {
    filtrarRecetasPorMedico();
  }, [medico]);

  return (
    <div className="flex justify-center w-full bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 min-h-screen gap-10 bg-gray-50 m-auto w-[80%]">
       <div className="flex flex-col justify-center">
       <div className="grid lg:grid-cols-3 gap-5 items-center mb-10 justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <div className="grid grid-cols-2 gap-4 justify-center">
              <DatePicker
                label="Fecha de Inicio"
                value={fechaInicio}
                onChange={(newValue: Dayjs | null) => newValue && setFechaInicio(newValue)}
                maxDate={fechaFin}
                sx={{ width: "100%" }}
              />

              <DatePicker
                label="Fecha de Fin"
                value={fechaFin}
                onChange={(newValue: Dayjs | null) => newValue && setFechaFin(newValue)}
                minDate={fechaInicio}
                sx={{ width: "100%" }}
              />
            </div>
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={buscarRecetas}
            className="min-w-[140px] lg:w-[200px] lg:min-h-[50px] px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-400 text-white font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md"
          >
            <Search className="w-4 h-4" />
            Buscar
          </Button>
        </div>
        <div className="flex justify-center lg:justify-start">
          <FiltroFecha setFechaInicio={setFechaInicio} setFechaFin={setFechaFin}/>
        </div>

        <div className=" my-5 flex justify-center w-[70%] lg:w-[40%] mx-auto lg:mx-0 ">
          <Input
            type="text"
            endAdornment={<Search />}
            placeholder="Buscar médicos"
            onChange={(e) => setMedico(e.target.value)}
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-700 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-800 focus:border-blue-800"
          />
        </div>
       </div>

        
        <h1 className="text-2xl font-semibold text-[#374152] mb-4 text-center uppercase">
          Recetas de Médicos
        </h1>
        
        {estaCargando ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-purple-500"></div>
            <p className="text-2xl ml-2 text-purple-500">Cargando...</p>
          </div>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center uppercase">
                      {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.MEDICO, "Médico")}
                    </TableCell>

                    <TableCell className="text-center uppercase">
                      {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.ESPECIALIDAD, "Especialidad")}
                    </TableCell>

                    <TableCell className="text-center uppercase">
                      {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.CANTIDAD_MEDICIONES, "Cantidad Mediciones")}
                    </TableCell>

                    <TableCell className="text-wrap uppercase w-[250px]">
                      {crearEtiquetaOrdenamiento(
                        CAMPOS_ORDENABLES.MEDICIONES_CONVERTIDAS_A_VENTA,
                        "Mediciones Convertidas a Venta"
                      )}
                    </TableCell>

                    <TableCell className="text-center uppercase">
                      {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.TASA_CONVERSION, "Tasa de Conversión")}
                    </TableCell>
                    
                    <TableCell className="text-center uppercase">
                      Detalle
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recetasOrdenadas
                    .slice(
                      paginaActual * filasPorPagina,
                      paginaActual * filasPorPagina + filasPorPagina
                    )
                    .map((fila, indice) => {
                      const estaExpandida = indiceFilaExpandida === indice;

                      return (
                        <React.Fragment key={fila.id}>
                          <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell align="left">{fila.medico}</TableCell>
                            <TableCell align="center">{fila.especialidad}</TableCell>
                            <TableCell align="center">{fila.recetasRegistradas}</TableCell>
                            <TableCell align="center">{fila.ventasRealizadas}</TableCell>
                            <TableCell align="center">{fila.tasaConversion} %</TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                sx={{ textTransform: "none" }}
                                color={estaExpandida ? "secondary" : "primary"}
                                endIcon={estaExpandida ? <EyeOff /> : <Eye />}
                                onClick={() => alternarDetalle(indice)}
                              >
                                {estaExpandida ? "Ocultar" : "Ver"}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {estaExpandida && (
                            <TableRow>
                              <TableCell colSpan={6}>
                                <DetalleReceta recetasMedico={fila.recetasMedico} />
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell colSpan={2}>
                      <p className="text-right font-bold text-[#374152] uppercase italic">
                        Totales:
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-center font-bold">
                        {recetasOrdenadas.reduce((total, fila) => total + fila.recetasRegistradas, 0)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-center font-bold">
                        {recetasOrdenadas.reduce((total, fila) => total + fila.ventasRealizadas, 0)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-center font-bold">{tasaTotalConversion} %</p>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={OPCIONES_FILAS_POR_PAGINA}
              component="div"
              count={recetas.length}
              rowsPerPage={filasPorPagina}
              page={paginaActual}
              onPageChange={(_, nuevaPagina) => manejarCambioPagina(nuevaPagina)}
              onRowsPerPageChange={manejarCambioFilasPorPagina}
              labelRowsPerPage="Filas por página:"
            />
          </Paper>
        )}
      </div>
    </div>
  );
};