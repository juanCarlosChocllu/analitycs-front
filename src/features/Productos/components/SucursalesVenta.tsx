import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { VentaStockSucursalI } from "../interface/productos";
import { variacion } from "../../Comparativos/utils/calcularVaricacion";
import { cantidadDiasRangoFecha } from "../../app/util/fechasUtils";

export const SucursalesVenta = ({ data ,fechaFin,fechaInicio}: { data: VentaStockSucursalI[] , fechaInicio:string, fechaFin:string}) => {
const dias = cantidadDiasRangoFecha(fechaInicio, fechaFin)
  return (
    <Box>
      {data.map((sucursalData) => (
        <Accordion key={sucursalData.sucursal} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{sucursalData.sucursal}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {sucursalData.rubros.map((rubroData) => {
              const totalVentaActual = rubroData.categorias.reduce(
                (acc, item) => acc + item.ventaActual,
                0
              );
              const totalVentaAnterior = rubroData.categorias.reduce(
                (acc, item) => acc + item.ventasAnterior,
                0
              );
              
              const totalStockSucursal = rubroData.categorias.reduce(
                (acc, item) => acc + item.stockSucursal,
                0
              );
             

              return (
                <Box key={rubroData.rubro} mb={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Rubro: {rubroData.rubro}
                  </Typography>

                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Categoría
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Venta Actual
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Share
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Venta Anterior
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Share
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Var %
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Ventas Diarias Año
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Stock Locales
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Rotación Stock
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Facing
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Rotación Facing
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Stock Seg
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rubroData.categorias.map((cat, index) => {
                          const shareActual = totalVentaActual
                            ? cat.ventaActual / totalVentaActual
                            : 0;
                          const shareAnterior = totalVentaAnterior
                            ? cat.ventasAnterior / totalVentaAnterior
                            : 0;

                          return (
                            <TableRow
                              key={cat.categoria}
                              sx={{
                                backgroundColor:
                                  index % 2 === 0 ? "#fafafa" : "white",
                              }}
                            >
                              <TableCell>{cat.categoria}</TableCell>
                              <TableCell align="right">
                                {cat.ventaActual}
                              </TableCell>
                              <TableCell align="right">
                                {(shareActual * 100).toFixed(1)}%
                              </TableCell>
                              <TableCell align="right">
                                {cat.ventasAnterior.toLocaleString()}
                              </TableCell>
                              <TableCell align="right">
                                {(shareAnterior * 100).toFixed(1)}%
                              </TableCell>
                              <TableCell align="right">
                                { cat.ventasAnterior >0 ? variacion(
                                  cat.ventaActual,
                                  cat.ventasAnterior
                                ).toFixed(2):0}
                                %
                              </TableCell>
                              <TableCell align="right">{(cat.ventaActual / dias).toFixed(2)}</TableCell>
                              <TableCell align="right">
                                {cat.stockSucursal}
                              </TableCell>
                              <TableCell align="right">0</TableCell>
                              <TableCell align="right">0</TableCell>
                              <TableCell align="right">0</TableCell>
                              <TableCell align="right">
                               0
                              </TableCell>
                            </TableRow>
                          );
                        })}

                        {/* Totales */}
                        <TableRow
                          sx={{
                            backgroundColor: "#e0e0e0",
                            fontWeight: "bold",
                          }}
                        >
                          <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {totalVentaActual.toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            100%
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {totalVentaAnterior.toLocaleString()}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            100%
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {variacion(
                              totalVentaActual,
                              totalVentaAnterior
                            ).toFixed(1)}
                            %
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            0
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {totalStockSucursal}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            0
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            0
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            0
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                           0
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
