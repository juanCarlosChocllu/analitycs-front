import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type {
  ComparativoData,
  ventaSucursalI,
} from "../interface/compartivo";

export const TablaVentaSucursal = ({
  data,
  dataAnterior,
}: {
  data: ComparativoData;
  dataAnterior: ComparativoData;
}) => {
  const [sucursales, setSucursales] = useState<ventaSucursalI[]>([]);
  const [sucursalesAnterior, setSucursalesAnterior] = useState<
    ventaSucursalI[]
  >([]);

  useEffect(() => {
    if (data) {
      setSucursales(data.ventaSucursal.ventaSucursal);
    }
    if (dataAnterior) {
      setSucursalesAnterior(dataAnterior.ventaSucursal.ventaSucursal);
    }
  }, [data, dataAnterior]);

  const getAllProducts = (currentData: any[], previousData: any[]) => {
    const allProductsSet = new Set([
      ...currentData.map((item) => item.producto),
      ...previousData.map((item) => item.producto),
    ]);
    return Array.from(allProductsSet).sort();
  };

  const getVariationText = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? "0%" : "100%";
    return (((current - previous) / previous) * 100).toFixed(2) + "%";
  };

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Ventas por sucursal
        </Typography>

        {sucursales.length === 0 ? (
          <Typography>No hay datos disponibles.</Typography>
        ) : (
          sucursales.map((sucursal, index) => {
            const sucursalAnterior = sucursalesAnterior.find(
              (s) => s.sucursal === sucursal.sucursal
            ) || { data: [] };
            const allProducts = getAllProducts(
              sucursal.data,
              sucursalAnterior.data
            );
            const esParaguay = sucursal.sucursal === "OPTICENTRO PARAGUAY";
            const moneda = esParaguay ? "Gs" : "Bs";

            const totalActualCantidad = sucursal.data.reduce(
              (sum, p) => sum + p.cantidad,
              0
            );
            const totalActualMonto = sucursal.data.reduce(
              (sum, p) => sum + p.montoTotal,
              0
            );
            const totalAnteriorCantidad = sucursalAnterior.data.reduce(
              (sum, p) => sum + p.cantidad,
              0
            );
            const totalAnteriorMonto = sucursalAnterior.data.reduce(
              (sum, p) => sum + p.montoTotal,
              0
            );

            return (
              <Accordion key={index} sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold">{sucursal.sucursal}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            colSpan={3}
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
                            colSpan={3}
                            sx={{ backgroundColor: "#008080", color: "white" }}
                          >
                            Venta Anterior
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ backgroundColor: "#008080", color: "white" }}
                          >
                            Producto
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
                            Monto
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ backgroundColor: "#008080", color: "white" }}
                          >
                            Var. Cantidad
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ backgroundColor: "#008080", color: "white" }}
                          >
                            Var. Monto
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#008080", color: "white" }}
                          >
                            Producto
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
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allProducts.map((nombre, i) => {
                          const actual = sucursal.data.find(
                            (p) => p.producto === nombre
                          ) || {
                            producto: nombre,
                            cantidad: 0,
                            montoTotal: 0,
                          };
                          const anterior = sucursalAnterior.data.find(
                            (p) => p.producto === nombre
                          ) || {
                            producto: nombre,
                            cantidad: 0,
                            montoTotal: 0,
                          };

                          return (
                            <TableRow key={i}>
                              <TableCell>{nombre}</TableCell>
                              <TableCell align="right">
                                {actual.cantidad}
                              </TableCell>
                              <TableCell align="right">
                                {actual.montoTotal.toLocaleString("en-US")}{" "}
                                {moneda}
                              </TableCell>
                              <TableCell align="right">
                                {getVariationText(
                                  actual.cantidad,
                                  anterior.cantidad
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {getVariationText(
                                  actual.montoTotal,
                                  anterior.montoTotal
                                )}
                              </TableCell>
                              <TableCell>{nombre}</TableCell>
                              <TableCell align="right">
                                {anterior.cantidad}
                              </TableCell>
                              <TableCell align="right">
                                {anterior.montoTotal.toLocaleString("en-US")}{" "}
                                {moneda}
                              </TableCell>
                            </TableRow>
                          );
                        })}

                        {/* Totales */}
                        <TableRow
                          sx={{
                            backgroundColor: "#f0f0f0",
                            fontWeight: "bold",
                          }}
                        >
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Total
                          </TableCell>
                          <TableCell align="right">
                            {totalActualCantidad}
                          </TableCell>
                          <TableCell align="right">
                            {totalActualMonto.toLocaleString("en-US")} {moneda}
                          </TableCell>
                          <TableCell align="right">
                            {getVariationText(
                              totalActualCantidad,
                              totalAnteriorCantidad
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {getVariationText(
                              totalActualMonto,
                              totalAnteriorMonto
                            )}
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Total
                          </TableCell>
                          <TableCell align="right">
                            {totalAnteriorCantidad}
                          </TableCell>
                          <TableCell align="right">
                            {totalAnteriorMonto.toLocaleString("en-US")}{" "}
                            {moneda}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
