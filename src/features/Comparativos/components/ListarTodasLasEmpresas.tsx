import {
  Box,
  Card,
  CardContent,
  Chip,
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
    : (((totalCantidadActual - totalCantidadAnterior) / totalCantidadAnterior) * 100).toFixed(2);

const totalVariacionImporte =
  totalImporteAnterior === 0
    ? 0
    : (((totalImporteActual - totalImporteAnterior) / totalImporteAnterior) * 100).toFixed(2);

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
                    backgroundColor: "#008080",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Producto
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Venta Actual
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Variaciones
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Venta Anterior
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Cantidad
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Venta Actual
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Variación unidades (%)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Variación total (%)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Cantidad
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#008080", color: "white" }}
                >
                  Venta Anterior
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosCombinados.map((row) => (
                <TableRow key={row.producto}>
                  <TableCell>{row.producto}</TableCell>
                  <TableCell align="right">{row.cantidadActual}</TableCell>
                  <TableCell align="right">{row.importeActual.toLocaleString("en-US")}</TableCell>
                  <TableCell align="right">{row.variacionCantidad}%</TableCell>
                  <TableCell align="right">{row.variacionImporte.toLocaleString("en-US")}%</TableCell>
                  <TableCell align="right">{row.cantidadAnterior}</TableCell>
                  <TableCell align="right">{row.importeAnterior}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
  <TableCell align="right">{totalCantidadActual}</TableCell>
  <TableCell align="right">{totalImporteActual.toLocaleString("en-US")}</TableCell>
  <TableCell align="right">{totalVariacionCantidad}%</TableCell>
  <TableCell align="right">{totalVariacionImporte}%</TableCell>
  <TableCell align="right">{totalCantidadAnterior}</TableCell>
  <TableCell align="right">{totalImporteAnterior.toLocaleString("en-US")}</TableCell>
</TableRow>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
