import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import type { VentaStockI } from "../interface/productos";
import { cantidadDiasRangoFecha } from "../../app/util/fechasUtils";

export const TotalVentaStock = ({
  ventaTotalStock,
  fechaInicio,
  fechaFin,
}: {
  ventaTotalStock: VentaStockI[];
  fechaInicio: string;
  fechaFin: string;
}) => {
  const dias = cantidadDiasRangoFecha(fechaInicio, fechaFin);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" sx={{ my: 2 }}>
        Stock venta unidades
      </Typography>

      {ventaTotalStock.map((rubroData) => (
        <div key={rubroData.rubro}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            <strong>{rubroData.rubro}</strong>
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Categoría</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Año Actual</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Ventas diaria</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Stock locales</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Stock depo</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Stock Total</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>DOS locales</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>DOS TOTALES</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rubroData.categorias.map((cat) => (
                <TableRow key={cat.categoria}>
                  <TableCell>{cat.categoria}</TableCell>
                  <TableCell align="right">{cat.ventaActual}</TableCell>
                  <TableCell align="right">
                    {(cat.ventaActual / dias).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">{cat.stockSucursal}</TableCell>
                  <TableCell align="right">{cat.stockDeposito}</TableCell>
                  <TableCell align="right">
                    {cat.stockSucursal + cat.stockDeposito}
                  </TableCell>
                  <TableCell align="right">
                    {(cat.stockSucursal / dias).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {(cat.stockDeposito / dias).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}

              {/* Fila de totales por rubro */}
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {rubroData.categorias.reduce(
                      (acc, cat) => acc + cat.ventaActual,
                      0
                    )}
                  </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {(
                      rubroData.categorias.reduce(
                        (acc, cat) => acc + cat.ventaActual,
                        0
                      ) / dias
                    ).toFixed(2)}
                  </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {rubroData.categorias.reduce(
                      (acc, cat) => acc + cat.stockSucursal,
                      0
                    )}
                  </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {rubroData.categorias.reduce(
                      (acc, cat) => acc + cat.stockDeposito,
                      0
                    )}
                  </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {rubroData.categorias.reduce(
                      (acc, cat) => acc + cat.stockSucursal + cat.stockDeposito,
                      0
                    )}
                  </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {(
                      rubroData.categorias.reduce(
                        (acc, cat) => acc + cat.stockSucursal,
                        0
                      ) / dias
                    ).toFixed(2)}
                  </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {(
                      rubroData.categorias.reduce(
                        (acc, cat) => acc + cat.stockDeposito,
                        0
                      ) / dias
                    ).toFixed(2)}
                  </strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </TableContainer>
  );
};
