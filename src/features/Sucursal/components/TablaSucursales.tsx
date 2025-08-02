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
import { Input, TableFooter } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import type { DataAsesor } from "../interface/asersor.interface";
import { Search } from "lucide-react";



// Tipos y constantes
const OPCIONES_FILAS_POR_PAGINA = [10, 20, 30, 50, 100] as const;


const FILAS_POR_PAGINA_INICIAL = 20;
const TIPO_ORDENAMIENTO = {
  ASCENDENTE: "asc",
  DESCENDENTE: "desc",
} as const;

const CAMPOS_ORDENABLES = {
  ID: "_id",
  SUCURSAL: "sucursal",
  ASESOR: "asesor",
  TICKETS: "totalTicket",
  CANTIDAD: "cantidad",
  IMPORTE_TOTAL: "importeTotalSuma",
  PRECIO_PROMEDIO: "precioPromedio",
  TICKET_PROMEDIO: "ticketPromedio",
  UNIDAD_POR_TICKET: "unidadPorTicket",
  VENTA_TOTAL: "ventaTotal",
} as const;

const formatName = (name: string) => {
  const words = name.split(' ');
  if (words.length > 2) {
    return `${words[0]} ${words[1]}...`;
  }
  return name;
};

// Tipos
type TipoOrdenamiento = typeof TIPO_ORDENAMIENTO[keyof typeof TIPO_ORDENAMIENTO];
type CampoOrdenable = typeof CAMPOS_ORDENABLES[keyof typeof CAMPOS_ORDENABLES];
interface Props {
  data: DataAsesor[];
}

export const TablaSucursales = ({ data }: Props) => {
  const [paginaActual, setPaginaActual] = useState<number>(0);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(FILAS_POR_PAGINA_INICIAL);
  const [tipoOrdenamiento, setTipoOrdenamiento] = useState<TipoOrdenamiento>(TIPO_ORDENAMIENTO.ASCENDENTE);
  const [campoOrdenadoPor, setCampoOrdenadoPor] = useState<CampoOrdenable>(CAMPOS_ORDENABLES.SUCURSAL);
  const [buscar, setBuscar] = useState<string>("");
  const [dataFiltrada, setDataFiltrada] = useState<DataAsesor[]>([]);

  const manejarCambioPagina = (nuevaPagina: number): void => {
    setPaginaActual(nuevaPagina);
  };

  const manejarCambioFilasPorPagina = (evento: React.ChangeEvent<HTMLInputElement>): void => {
    setFilasPorPagina(+evento.target.value);
    setPaginaActual(0);
  };


  const compararDescendente = (a: DataAsesor, b: DataAsesor, campoOrdenamiento: CampoOrdenable): number => {
    const valorA = a[campoOrdenamiento];
    const valorB = b[campoOrdenamiento];

    if (valorB < valorA) return -1;
    if (valorB > valorA) return 1;
    return 0;
  };

  const obtenerComparador = (orden: TipoOrdenamiento, campoOrdenamiento: CampoOrdenable) => {
    return orden === TIPO_ORDENAMIENTO.DESCENDENTE
      ? (a: DataAsesor, b: DataAsesor) => compararDescendente(a, b, campoOrdenamiento)
      : (a: DataAsesor, b: DataAsesor) => -compararDescendente(a, b, campoOrdenamiento);
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

  const dataOrdenada = useMemo(
    () =>
      [...dataFiltrada].sort(obtenerComparador(tipoOrdenamiento, campoOrdenadoPor)),
    [dataFiltrada, tipoOrdenamiento, campoOrdenadoPor]
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
  useEffect(() => {
    const dataFiltrada = data.filter((item) =>
      [item.sucursal, item.asesor].some((campo) =>
        campo.toLowerCase().includes(buscar.toLowerCase())
      )
    );
    setDataFiltrada(dataFiltrada);
  }, [buscar, data]);

  const crearEtiquetaOrdenamiento = (campo: CampoOrdenable, texto: string) => (
    <TableSortLabel
      active={campoOrdenadoPor === campo}
      direction={
        campoOrdenadoPor === campo
          ? tipoOrdenamiento
          : TIPO_ORDENAMIENTO.ASCENDENTE
      }
      onClick={crearManejadorOrdenamiento(campo)}
      sx={{
        fontWeight: "semi-bold",
        ":hover": {
          color: "#0CE8E8",
        },
      }}
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


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Tabla de Sucursales</h2>
      <div className="overflow-x-auto">

        <Paper>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "0.5rem",
              backgroundColor: "#fff",

              padding: "0.5rem",
              gap: "0.5rem",
              width: "40%",
              margin: "0 auto",
            }}
          >
            <Search />
            <Input
              type="text"
              placeholder="BUSCAR POR SUCURSAL O ASESOR"
              onChange={(e) => setBuscar(e.target.value)}
              sx={{
                width: "100%",
                border: "none",
                outline: "none",
                padding: "0.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                color: "#333",
                "::placeholder": {
                  color: "#999",
                },
              }}
            />
          </Box>
          <TableContainer>
            <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <TableHead>
                <TableRow className="border-b border-gray-200">
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.SUCURSAL, "Sucursal")}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.ASESOR, "Asesor")}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.TICKETS, "Tickets")}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.CANTIDAD, "Cantidad")}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.IMPORTE_TOTAL, "Importe Total")}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.PRECIO_PROMEDIO, "Precio Promedio")}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.TICKET_PROMEDIO, "Ticket Promedio")}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.UNIDAD_POR_TICKET, "Unidad por Ticket")}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.VENTA_TOTAL, "Venta Total")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataOrdenada.slice(paginaActual * filasPorPagina, (paginaActual + 1) * filasPorPagina).map((asesor, index) => (
                  <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <TableCell className="py-4 px-4">
                      <span className="text-gray-600">{asesor.sucursal}</span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{formatName(asesor.asesor)}</p>
                        <p className="text-sm text-gray-500">{asesor.asesor.split(' ').slice(2).join(' ')}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {asesor.totalTicket}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {asesor.cantidad}
                    </TableCell>
                    <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {asesor.importeTotalSuma.toLocaleString("en-US")}
                    </TableCell>
                    <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {asesor.precioPromedio.toLocaleString("en-US")}
                    </TableCell>
                    <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {asesor.ticketPromedio.toLocaleString("en-US")}
                    </TableCell>

                    <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {asesor.unidadPorTicket.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {asesor.ventaTotal.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow className="font-bold">
                  <TableCell className="px-4 py-2 text-left " colSpan={2} sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "center" }}>TOTAL</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "center" }}>
                    {data.reduce(
                      (total, asesor) => total + asesor.totalTicket,
                      0
                    )}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                    {data.reduce((total, asesor) => total + asesor.cantidad, 0)}
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                    {data
                      .reduce((total, asesor) => total + asesor.importeTotalSuma, 0)
                      .toLocaleString("en-US")}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                    {(
                      data.reduce(
                        (total, asesor) => total + asesor.importeTotalSuma,
                        0
                      ) /
                      data.reduce((total, asesor) => total + asesor.cantidad, 0)
                    ).toLocaleString("en-US")}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                    {(
                      data.reduce(
                        (total, asesor) => total + asesor.importeTotalSuma,
                        0
                      ) /
                      data.reduce(
                        (total, asesor) => total + asesor.totalTicket,
                        0
                      )
                    ).toLocaleString("en-US")}
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                    {(
                      data.reduce(
                        (total, asesor) => total + asesor.cantidad,
                        0
                      ) /
                      data.reduce(
                        (total, asesor) => total + asesor.totalTicket,
                        0
                      )
                    ).toLocaleString("en-US")}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                    {data
                      .reduce((total, asesor) => total + asesor.ventaTotal, 0)
                      .toLocaleString("en-US")}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={OPCIONES_FILAS_POR_PAGINA}
            component="div"
            count={data.length}
            rowsPerPage={filasPorPagina}
            page={paginaActual}
            onPageChange={(_, nuevaPagina) => manejarCambioPagina(nuevaPagina)}
            onRowsPerPageChange={manejarCambioFilasPorPagina}
            labelRowsPerPage="Filas por página:"
          />
        </Paper>

      </div>
    </div>
  )
}