import { useEffect, useState } from "react";
import type {
  agrupadoPorRubroI,
  ProductosStockI,
} from "../interface/productos";

import { porcentaje2 } from "../../app/util/porcentaje";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cantidadDiasRangoFecha } from "../../app/util/fechasUtils";
import { useEstadoReload } from "../../app/zustand/estadosZustand";
import { agruparPorRubro } from "../utils/productosAgrupacion";

export const RankPorRubroVIP = ({
  dataActual,
  fechaFin,
  fechaInicio,
}: {
  dataActual: ProductosStockI[];
  fechaInicio: string;
  fechaFin: string;
}) => {
  const { isReloading } = useEstadoReload();
  const dias = cantidadDiasRangoFecha(fechaInicio, fechaFin);
  const [data, setdata] = useState<agrupadoPorRubroI[]>([]);
  useEffect(() => {
    

    setdata(agruparPorRubro(dataActual));
  }, [isReloading]);
  return (
    <Box>
      {data.map((rubro, index) => {
        const nuevaData = rubro.producto
          .filter((i) => i.categoria == "VIP")
          .sort((a, b) => b.totalVentas - a.totalVentas);

        const totalVenta = nuevaData.reduce(
          (acc, item) => item.totalVentas + acc,
          0
        );
        const totalStockSucursal = nuevaData.reduce(
          (acc, item) => item.stockSucursal + acc,
          0
        );
        function shareAcumulado(i: number) {
          let shareunitario = porcentaje2(
            nuevaData[i]?.totalVentas,
            totalVenta
          );
          if (i === 0) {
            return shareunitario;
          }
          let share = 0;
          for (let j = 0; j <= i; j++) {
            const cantidad = nuevaData[j]?.totalVentas ?? 0;
            share += porcentaje2(cantidad, totalVenta);
          }

          return share;
        }

        return (
          <Box key={index}>
            <Typography variant="h6" gutterBottom>
              Rubro: {rubro.rubro}
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small" aria-label={`Tabla de ${rubro.rubro}`}>
                <TableHead>
                  <TableRow>
                    <TableCell>Marca</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell align="right">Total Venta</TableCell>
                    <TableCell align="right">Stock Sucursal</TableCell>
                    <TableCell align="right">Share Uni</TableCell>
                    <TableCell align="right">Share Acu</TableCell>
                    <TableCell align="right">Venta Diaria Prom</TableCell>
                    <TableCell align="right">DOS</TableCell>
                    <TableCell align="right">Rotación por 100</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nuevaData.map((producto, idx) => {
                    const share = shareAcumulado(idx);
                    return (
                      <TableRow key={idx}>
                        <TableCell>{producto.marca}</TableCell>
                        <TableCell>{producto.categoria}</TableCell>
                        <TableCell align="right">
                          {producto.totalVentas}
                        </TableCell>
                        <TableCell align="right">
                          {producto.stockSucursal}
                        </TableCell>
                        <TableCell align="right">
                          {porcentaje2(
                            producto.totalVentas,
                            totalVenta
                          ).toFixed(2)}{" "}
                          %
                        </TableCell>
                        <TableCell align="right">{share.toFixed(2)}%</TableCell>
                        <TableCell align="right">
                          {(producto.totalVentas / dias).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {(
                            producto.stockSucursal /
                            (producto.totalVentas / dias)
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {producto.stockSucursal > 0
                            ? (
                                (producto.totalVentas /
                                  producto.stockSucursal) *
                                100
                              ).toFixed(2)
                            : 0}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {/* Fila de totales */}
                  <TableRow
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  >
                    <TableCell colSpan={2}>Totales</TableCell>
                    <TableCell align="right">{totalVenta}</TableCell>
                    <TableCell align="right">{totalStockSucursal}</TableCell>
                    <TableCell align="right">
               
                      {porcentaje2(totalVenta, totalVenta).toFixed(2)} %
                    </TableCell>
                    <TableCell align="right">100.00%</TableCell>
                    <TableCell align="right">
                      {(totalVenta / dias).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                   
                      {(totalStockSucursal / (totalVenta / dias)).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {((totalVenta / totalStockSucursal) * 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Box>
  );
};
