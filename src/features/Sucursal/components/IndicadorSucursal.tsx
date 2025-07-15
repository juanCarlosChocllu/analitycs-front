import { useEffect, useState } from "react";
import { Buscador } from "../../app/components/Buscador/Buscador";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { getIndicadoresPorSucursal } from "../service/sucursalService";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import type {
  GraficoIndicadorSucursalI,
  IndicadoresSucursalI,
} from "../interface/IndicadorSucursal";
import { Box, TableFooter } from "@mui/material";
import { IndicadoresCuadro } from "./IndicadoresCuadro";
import { Grafico } from "./Grafico";
import dayjs from "dayjs";
import { abreviarMoneda } from "../../app/util/abreviarMonenda";
import { Loader } from "../../app/components/loader/Loader";
import { Download } from "lucide-react";
import { exportarExcelPorSucursal } from "../utils/exportarExcel/exportarIndicadoreSucursal";

export const IndicadorSucursal = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [loader, setLoader] = useState<boolean>(false);

  const [data, setData] = useState<IndicadoresSucursalI>();

  useEffect(() => {
    listarIndicadoresSucursal();
  }, [filtro]);

  const listarIndicadoresSucursal = async () => {
    try {
      setLoader(true);
      const response = await getIndicadoresPorSucursal(filtro);
      setData(response);
      setLoader(false);
    } catch (error) {
      console.error("Error al obtener indicadores:", error);
    } finally {
      setLoader(false);
    }
  };

  const dataset: GraficoIndicadorSucursalI[] =
    data && data?.dataDiaria.length > 0
      ? data.dataDiaria.map((item) => {
          const resultado: GraficoIndicadorSucursalI = {
            fecha: item.fecha,
            fechaFormateada: dayjs(item.fecha).format("DD MMMM"),
            precioPromedio: item.precioPromedio,
            ticketPromedio: item.ticketPromedio,
            cantidad: item.cantidad,
            ventaDiaria: item.ventaTotal,
            tickets: item.tickets,
          };
          return resultado;
        })
      : [];

  return (
    <Box sx={{ p: 3 }}>
      <Buscador filtro={filtro} setFiltro={setFiltro} />

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        📊 Indicadores por Sucursal
      </Typography>
      {data && (
        <IndicadoresCuadro
          sucursal={data?.sucursales}
          tcPromedio={data?.tcPromedio}
          ticketPromedio={data?.ticketPromedio}
          totalVentas={data?.totalVentas}
          unidadPorTicket={data?.unidadPorTickect}
          ventaPorDia={data?.ventaDiariaPorLocal}
        />
      )}
      {data && (
        <button
          onClick={() => exportarExcelPorSucursal(data.dataSucursal)}
          className="mt-4 bg-gradient-to-r from-green-400 to-green-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto flex items-center gap-2"
        >
          <Download />
          Exportar
        </button>
      )}
      {data && <Grafico data={dataset} />}
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {[
                "Sucursal",
                "Tickets",
                "Ventas",
                "Importe",
                "Tráfico",
                "Cantidad",
                "Tasa Conv.",
                "Ticket Prom.",
                "Unid/Ticket",
                "Precio Prom.",
              ].map((col) => (
                <TableCell
                  key={col}
                  align="right"
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    "&:first-of-type": { textAlign: "left" },
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.dataSucursal.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <TableCell>{row.sucursal}</TableCell>
                <TableCell align="right">{row.totalTicket}</TableCell>
                <TableCell align="right">
                  {abreviarMoneda(row.sucursal)}{" "}
                  {row.ventaTotal.toLocaleString("en-US")}
                </TableCell>
                <TableCell align="right">
                  {abreviarMoneda(row.sucursal)}{" "}
                  {row.totalImporte.toLocaleString("en-US")}
                </TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.tasaConversion}%</TableCell>
                <TableCell align="right">
                  {abreviarMoneda(row.sucursal)}{" "}
                  {row.ticketPromedio.toLocaleString("en-US")}
                </TableCell>
                <TableCell align="right">{row.unidadPorTicket}</TableCell>
                <TableCell align="right">
                  {abreviarMoneda(row.sucursal)}{" "}
                  {row.precioPromedio.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell align="right">
                {data?.dataSucursal.reduce(
                  (acc, item) => acc + item.totalTicket,
                  0
                )}
              </TableCell>
              <TableCell align="right">
                {data?.dataSucursal
                  .reduce((acc, item) => acc + item.ventaTotal, 0)
                  .toLocaleString("en-US")}
              </TableCell>
              <TableCell align="right">
                {data?.dataSucursal
                  .reduce((acc, item) => acc + item.totalImporte, 0)
                  .toLocaleString("en-US")}
              </TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">
                {data?.dataSucursal.reduce(
                  (acc, item) => acc + item.cantidad,
                  0
                )}
              </TableCell>
              <TableCell align="right">0%</TableCell>
              <TableCell align="right">
                {data?.dataSucursal.length
                  ? (
                      data.dataSucursal.reduce(
                        (acc, item) => acc + item.ventaTotal,
                        0
                      ) /
                      data.dataSucursal.reduce(
                        (acc, item) => acc + item.totalTicket,
                        0
                      )
                    ).toLocaleString("en-US")
                  : "0"}
              </TableCell>
              <TableCell align="right">
                {data?.dataSucursal.length
                  ? (
                      data.dataSucursal.reduce(
                        (acc, item) => acc + item.cantidad,
                        0
                      ) /
                      data.dataSucursal.reduce(
                        (acc, item) => acc + item.totalTicket,
                        0
                      )
                    ).toLocaleString("en-US")
                  : "0.00"}
              </TableCell>
              <TableCell align="right">
                {data?.dataSucursal.length
                  ? (
                      data.dataSucursal.reduce(
                        (acc, item) => acc + item.ventaTotal,
                        0
                      ) /
                      data.dataSucursal.reduce(
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
      {loader && <Loader />}
    </Box>
  );
};
