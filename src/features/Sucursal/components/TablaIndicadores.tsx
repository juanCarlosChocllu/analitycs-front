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
import dayjs from "dayjs";
import "dayjs/locale/es";
import { TableFooter } from "@mui/material";
import type { SucursalData } from "../interface/IndicadorSucursal";
import { abreviarMoneda } from "../../app/util/abreviarMonenda";

dayjs.locale("es");

// Tipos y constantes
const OPCIONES_FILAS_POR_PAGINA = [10, 20, 30, 50, 100] as const;

const FILAS_POR_PAGINA_INICIAL = 50;
const TIPO_ORDENAMIENTO = {
  ASCENDENTE: "asc",
  DESCENDENTE: "desc",
} as const;

const CAMPOS_ORDENABLES = {
  ID: "id",
  SUCURSAL: "sucursal",
  CANTIDAD: "cantidad",
  PRECIO_PROMEDIO: "precioPromedio",
  TASA_CONVERSION: "tasaConversion",
  TICKET_PROMEDIO: "ticketPromedio",
  TOTAL_IMPORTE: "totalImporte",
  TOTAL_TICKET: "totalTicket",
  TRAFICO_CLIENTE: "traficoCliente",
  UNIDAD_POR_TICKET: "unidadPorTicket",
  VENTA_TOTAL: "ventaTotal",
} as const;

// Tipos
type TipoOrdenamiento = typeof TIPO_ORDENAMIENTO[keyof typeof TIPO_ORDENAMIENTO];
type CampoOrdenable = typeof CAMPOS_ORDENABLES[keyof typeof CAMPOS_ORDENABLES];
interface Props {
  data: SucursalData[];
}

export const TablaIndicadores: React.FC<Props> = ({ data }: Props) => {
  const [paginaActual, setPaginaActual] = React.useState<number>(0);
  const [filasPorPagina, setFilasPorPagina] = React.useState<number>(FILAS_POR_PAGINA_INICIAL);
  const [tipoOrdenamiento, setTipoOrdenamiento] = React.useState<TipoOrdenamiento>(TIPO_ORDENAMIENTO.ASCENDENTE);
  const [campoOrdenadoPor, setCampoOrdenadoPor] = React.useState<CampoOrdenable>(CAMPOS_ORDENABLES.SUCURSAL);

  const manejarCambioPagina = (nuevaPagina: number): void => {
    setPaginaActual(nuevaPagina);
  };

  const manejarCambioFilasPorPagina = (evento: React.ChangeEvent<HTMLInputElement>): void => {
    setFilasPorPagina(+evento.target.value);
    setPaginaActual(0);
  };


  const compararDescendente = (a: SucursalData, b: SucursalData, campoOrdenamiento: CampoOrdenable): number => {
    const valorA = a[campoOrdenamiento];
    const valorB = b[campoOrdenamiento];

    if (valorB < valorA) return -1;
    if (valorB > valorA) return 1;
    return 0;
  };

  const obtenerComparador = (orden: TipoOrdenamiento, campoOrdenamiento: CampoOrdenable) => {
    return orden === TIPO_ORDENAMIENTO.DESCENDENTE
      ? (a: SucursalData, b: SucursalData) => compararDescendente(a, b, campoOrdenamiento)
      : (a: SucursalData, b: SucursalData) => -compararDescendente(a, b, campoOrdenamiento);
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

  const dataOrdenada = React.useMemo(
    () =>
      [...data].sort(obtenerComparador(tipoOrdenamiento, campoOrdenadoPor)),
    [data, tipoOrdenamiento, campoOrdenadoPor]
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
      sx={{
        color: "white",
        fontWeight: "semi-bold",
        backgroundColor: "#1975d1",
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
    <div className="flex justify-center w-full bg-gray-50">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.SUCURSAL, "Sucursal")}
                  </TableCell>

                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.TOTAL_TICKET, "Tickets")}
                  </TableCell>

                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.VENTA_TOTAL, "Ventas")}
                  </TableCell>

                  <TableCell className="text-wrap uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(
                      CAMPOS_ORDENABLES.TOTAL_IMPORTE,
                      "Importe"
                    )}
                  </TableCell>
                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.TRAFICO_CLIENTE, "Tráfico")}
                  </TableCell>
                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.CANTIDAD, "Cantidad")}
                  </TableCell>
                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.TASA_CONVERSION, "Tasa de Conversión")}
                  </TableCell>
                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.TICKET_PROMEDIO, "Ticket Promedio")}
                  </TableCell>
                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.UNIDAD_POR_TICKET, "Unid/Ticket")}
                  </TableCell>
                  <TableCell className="text-center uppercase bg-[#1975d1]">
                    {crearEtiquetaOrdenamiento(CAMPOS_ORDENABLES.PRECIO_PROMEDIO, "Precio Promedio")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataOrdenada
                  .slice(
                    paginaActual * filasPorPagina,
                    paginaActual * filasPorPagina + filasPorPagina
                  )
                  .map((fila) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={fila.id}>
                          <TableCell align="left" sx={{ color: "#002447", fontWeight: "semi-bold" }}>{fila.sucursal}</TableCell>
                          <TableCell align="right">{fila.totalTicket}</TableCell>
                          <TableCell align="right">
                            {abreviarMoneda(fila.sucursal)}{" "}
                            {fila.ventaTotal.toLocaleString("en-US")}
                          </TableCell>
                          <TableCell align="right">
                            {abreviarMoneda(fila.sucursal)}{" "}
                            {fila.totalImporte.toLocaleString("en-US")}
                          </TableCell>
                          <TableCell align="right">0</TableCell>
                          <TableCell align="right">{fila.cantidad}</TableCell>
                          <TableCell align="right">{fila.tasaConversion}%</TableCell>
                          <TableCell align="right">
                            {abreviarMoneda(fila.sucursal)}{" "}
                            {fila.ticketPromedio.toLocaleString("en-US")}
                          </TableCell>
                          <TableCell align="right">{fila.unidadPorTicket}</TableCell>
                          <TableCell align="right">
                            {abreviarMoneda(fila.sucursal)}{" "}
                            {fila.precioPromedio.toLocaleString("en-US")}
                          </TableCell>
                        </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter >
                    <TableRow sx={{ backgroundColor: "#1975d1" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "white", fontSize: "16px" }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>
                        {data.reduce(
                          (acc, item) => acc + item.totalTicket,
                          0
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>
                        {data
                          .reduce((acc, item) => acc + item.ventaTotal, 0)
                          .toLocaleString("en-US")}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>
                        {data
                          .reduce((acc, item) => acc + item.totalImporte, 0)
                          .toLocaleString("en-US")}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>0</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>
                        {data.reduce(
                          (acc, item) => acc + item.cantidad,
                          0
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>0%</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>
                        {data.length
                          ? (
                            data.reduce(
                              (acc, item) => acc + item.ventaTotal,
                              0
                            ) /
                            data.reduce(
                              (acc, item) => acc + item.totalTicket,
                              0
                            )
                          ).toLocaleString("en-US")
                          : "0"}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>
                        {data.length
                          ? (
                            data.reduce(
                              (acc, item) => acc + item.cantidad,
                              0
                            ) /
                            data.reduce(
                              (acc, item) => acc + item.totalTicket,
                              0
                            )
                          ).toLocaleString("en-US")
                          : "0.00"}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "semi-bold", color: "white", fontSize: "16px" }}>
                        {data.length
                          ? (
                            data.reduce(
                              (acc, item) => acc + item.ventaTotal,
                              0
                            ) /
                            data.reduce(
                              (acc, item) => acc + item.cantidad,
                              0
                            )
                          ).toLocaleString("en-US")
                          : "0.00"}
                      </TableCell>
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
  );
};