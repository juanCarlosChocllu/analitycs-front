import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { PropsVentaI } from "../interface/compartivo";

export const ListarTodasLasEmpresas = ({
  ventaActual,
  ventaAnterior,
}: PropsVentaI) => {
  const productosUnicos = Array.from(
    new Set([
      ...ventaActual.map((item) => item.producto),
      ...ventaAnterior.map((item) => item.producto),
    ])
  );

  // 2. Armar lista combinada por producto
  const datosCombinados = productosUnicos.map((producto) => {
    const actual = ventaActual.find((v) => v.producto === producto);
    const anterior = ventaAnterior.find((v) => v.producto === producto);

    const cantidadActual = actual?.cantidad ?? 0;
    const importeActual = actual?.importe ?? 0;
    const cantidadAnterior = anterior?.cantidad ?? 0;
    const importeAnterior = anterior?.importe ?? 0;

    const variacionCantidad =
      cantidadAnterior === 0
        ? 0
        : (
            ((cantidadActual - cantidadAnterior) / cantidadAnterior) *
            100
          ).toFixed(2);
    const variacionImporte =
      importeAnterior === 0
        ? 0
        : (((importeActual - importeAnterior) / importeAnterior) * 100).toFixed(
            2
          );

    return {
      producto,
      cantidadActual,
      importeActual,
      cantidadAnterior,
      importeAnterior,
      variacionCantidad,
      variacionImporte,
    };
  });

  const totalCantidadActual = datosCombinados.reduce(
    (acc, item) => acc + item.cantidadActual,
    0
  );
  const totalImporteActual = datosCombinados.reduce(
    (acc, item) => acc + item.importeActual,
    0
  );
  const totalCantidadAnterior = datosCombinados.reduce(
    (acc, item) => acc + item.cantidadAnterior,
    0
  );
  const totalImporteAnterior = datosCombinados.reduce(
    (acc, item) => acc + item.importeAnterior,
    0
  );
  const totalVariacionCantidad =
    totalCantidadAnterior === 0
      ? 0
      : (
          ((totalCantidadActual - totalCantidadAnterior) /
            totalCantidadAnterior) *
          100
        ).toFixed(2);

  const totalVariacionImporte =
    totalImporteAnterior === 0
      ? 0
      : (
          ((totalImporteActual - totalImporteAnterior) / totalImporteAnterior) *
          100
        ).toFixed(2);

  const particpacionEnCantidad = (cantidad: number, total: number) => {
    return (cantidad / total) * 100;
  };

  const particpacionEnVenta = (importe: number, total: number) => {
    return (importe / total) * 100;
  };

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ventas
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                  className="bg-teal-700 text-white p-3 border border-teal-800"
                  align="left"
                >
                  Producto
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={4}
                  sx={{ color: "white" }}
                  className="bg-emerald-600 text-white p-3 border border-teal-800 text-center"
                >
                  Venta Actual
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{ color: "white" }}
                  className="bg-teal-700 text-white p-3 border border-teal-800 text-center"
                >
                  Variaciones
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={4}
                  sx={{ color: "white" }}
                  className="bg-sky-700 text-white p-3 border border-teal-800 text-center"
                >
                  Venta Anterior
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-emerald-600 text-white p-2 border border-teal-800 text-center"
                >
                  Cantidad
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-emerald-600 text-white p-2 border border-teal-800 text-center"
                >
                  Participacion en Cantidad (%)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-emerald-600 text-white p-2 border border-teal-800 text-center"
                >
                  Venta Actual
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-emerald-600 text-white p-2 border border-teal-800 text-center"
                >
                  Participacion en Venta (%)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-teal-700 text-white p-2 border border-teal-800 text-center"
                >
                  Variación unidades (%)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-teal-700 text-white p-2 border border-teal-800 text-center"
                >
                  Variación total (%)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-sky-700 text-white p-2 border border-teal-800 text-center"
                >
                  Cantidad
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-sky-700 text-white p-2 border border-teal-800 text-center"
                >
                  Participacion en Cantidad (%)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-sky-700 text-white p-2 border border-teal-800 text-center"
                >
                  Venta Anterior
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white" }}
                  className="bg-sky-700 text-white p-2 border border-teal-800 text-center"
                >
                  Participacion en Venta (%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosCombinados.map((row) => (
                <TableRow key={row.producto} className="hover:bg-gray-100">
                  <TableCell className="border p-2 font-medium">
                    {row.producto}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-emerald-50"
                  >
                    {row.cantidadActual}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-emerald-50"
                  >
                    {particpacionEnCantidad(
                      row.cantidadActual,
                      totalCantidadActual
                    ).toFixed(3)}
                    %
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-emerald-50"
                  >
                    {row.importeActual.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-emerald-50"
                  >
                    {particpacionEnVenta(
                      row.importeActual,
                      totalImporteActual
                    ).toFixed(3)}
                    %
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center font-medium"
                    sx={{
                      color:
                        Number(row.variacionCantidad) < 0 ? "red" : "green",
                    }}
                  >
                    {row.variacionCantidad}%
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center font-medium"
                    sx={{
                      color: Number(row.variacionImporte) < 0 ? "red" : "green",
                    }}
                  >
                    {row.variacionImporte.toLocaleString("en-US")}%
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-sky-50"
                  >
                    {row.cantidadAnterior}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-sky-50"
                  >
                    {particpacionEnCantidad(
                      row.cantidadAnterior,
                      totalCantidadAnterior
                    ).toFixed(3)}
                    %
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-sky-50"
                  >
                    {row.importeAnterior}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="border p-2 text-center bg-sky-50"
                  >
                    {particpacionEnVenta(
                      row.importeAnterior,
                      totalImporteAnterior
                    ).toFixed(3)}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell align="right">{totalCantidadActual}</TableCell>
              <TableCell align="right">
                {particpacionEnCantidad(
                  totalCantidadActual,
                  totalCantidadActual
                ).toFixed(3)}
                %
              </TableCell>
              <TableCell align="right">
                {totalImporteActual.toLocaleString("en-US")}
              </TableCell>
              <TableCell align="right">
                {particpacionEnVenta(
                  totalImporteActual,
                  totalImporteActual
                ).toFixed(3)}
                %
              </TableCell>
              <TableCell align="right">{totalVariacionCantidad}%</TableCell>
              <TableCell align="right">{totalVariacionImporte}%</TableCell>
              <TableCell align="right">{totalCantidadAnterior}</TableCell>
              <TableCell align="right">
                {particpacionEnCantidad(
                  totalCantidadAnterior,
                  totalCantidadAnterior
                ).toFixed(3)}
                %
              </TableCell>
              <TableCell align="right">
                {totalImporteAnterior.toLocaleString("en-US")}
              </TableCell>
              <TableCell align="right">
                {particpacionEnVenta(
                  totalImporteAnterior,
                  totalImporteAnterior
                ).toFixed(3)}
                %
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
