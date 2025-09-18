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
import { porcentaje } from "../../app/util/porcentaje";
import { variacion } from "../../Comparativos/utils/calcularVaricacion";

export const TotalVentaProducto = ({
  ventaTotalStock,
}: {
  ventaTotalStock: VentaStockI[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" sx={{ my: 2 }}>
        Total Venta por Producto
      </Typography>

      {ventaTotalStock.map((rubroItem) => {
        const totalActual = rubroItem.categorias.reduce(
          (acc, cat) => acc + cat.ventaActual,
          0
        );
        const totalAnterior = rubroItem.categorias.reduce(
          (acc, cat) => acc + cat.ventasAnterior,
          0
        );
        const totalPresupuesto = rubroItem.categorias.reduce(
          (acc, cat) => acc + cat.presupuesto,
          0
        );

        return (
          <div key={rubroItem.rubro}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              <strong>{rubroItem.rubro}</strong>
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
                    <strong>Share</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Presupuesto</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Share</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Var</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Año Anterior</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Share</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Var</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rubroItem.categorias.map((item) => (
                  <TableRow key={item.categoria}>
                    <TableCell>{item.categoria || "Sin categoría"}</TableCell>
                    <TableCell align="right">{item.ventaActual}</TableCell>
                    <TableCell align="right">
                      {porcentaje(item.ventaActual, totalActual).toLocaleString()} %
                    </TableCell>
                    <TableCell align="right">{item.presupuesto}</TableCell>
                    <TableCell align="right">{porcentaje(item.presupuesto,totalPresupuesto)} %</TableCell>
                    <TableCell align="right">{item.presupuesto > 0 ? variacion(item.ventaActual, item.presupuesto).toFixed(2):0}  %</TableCell>
                    <TableCell align="right">{item.ventasAnterior}</TableCell>
                    <TableCell align="right">
                      {porcentaje(item.ventasAnterior, totalAnterior)} %
                    </TableCell>
                    <TableCell align="right">
                      {item.ventasAnterior > 0
                        ? variacion(
                            item.ventaActual,
                            item.ventasAnterior
                          ).toFixed(2)
                        : 0}{" "}
                      %
                    </TableCell>
                  </TableRow>
                ))}

                {/* Totales por rubro */}
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{totalActual}</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>100%</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{totalPresupuesto}</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>100 %</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{totalPresupuesto > 0 ? variacion(totalActual, totalPresupuesto).toFixed(2):0} %</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{totalAnterior}</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>100%</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      {variacion(totalActual, totalAnterior).toFixed(2)} %
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
      })}
    </TableContainer>
  );
};
