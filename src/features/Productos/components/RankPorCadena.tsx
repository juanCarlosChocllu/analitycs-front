import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import type {
  DataEmpresaI,
  ProductoEmpresaI,
  ProductosStockI,
} from "../interface/productos";
import { porcentaje2 } from "../../app/util/porcentaje";
import { cantidadDiasRangoFecha } from "../../app/util/fechasUtils";
import { useEffect, useState } from "react";
import { useEstadoReload } from "../../app/zustand/estadosZustand";

export const RankPorCadena = ({
  datatActual,
  fechaFin,
  fechaInicio,
}: {
  datatActual: ProductosStockI[];

  fechaInicio: string;
  fechaFin: string;
}) => {
  const [data, setdata] = useState<DataEmpresaI[]>([]);
  const dias = cantidadDiasRangoFecha(fechaInicio, fechaFin);
  const { isReloading } = useEstadoReload();
  useEffect(() => {
    console.log("cargado rank producto", isReloading);
    setdata(agruparPorEmpresa(datatActual));
  }, [isReloading]);
  return (
    <Box>
      {data.map((sucursalData, index) => {
        const totalVenta = sucursalData.productos.reduce(
          (acc, item) => item.cantidadVentas + acc,
          0
        );
        const totalStockSucursal = sucursalData.productos.reduce(
          (acc, item) => item.cantidaStockSucursal + acc,
          0
        );
        const nuevaData = sucursalData.productos.sort(
          (a, b) => b.cantidadVentas - a.cantidadVentas
        );

        function shareAcumulado(i: number) {
          let shareunitario = porcentaje2(
            nuevaData[i]?.cantidadVentas,
            totalVenta
          );
          if (i === 0) {
            return shareunitario;
          }
          let share = 0;
          for (let j = 0; j <= i; j++) {
            const cantidad = nuevaData[j]?.cantidadVentas ?? 0;
            share += porcentaje2(cantidad, totalVenta);
          }

          return share;
        }

        return (
          <Box key={index} mb={4}>
            <Typography variant="h6" gutterBottom>
              empresa: {sucursalData.empresa}
            </Typography>
            <TableContainer component={Paper}>
              <Table
                size="small"
                aria-label={`Tabla de ${sucursalData.empresa}`}
              >
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
                          {producto.cantidadVentas}
                        </TableCell>
                        <TableCell align="right">
                          {producto.cantidaStockSucursal}
                        </TableCell>
                        <TableCell align="right">
                          {porcentaje2(
                            producto.cantidadVentas,
                            totalVenta
                          ).toFixed(2)}{" "}
                          %
                        </TableCell>
                        <TableCell align="right">{share.toFixed(2)}%</TableCell>
                        <TableCell align="right">
                          {(producto.cantidadVentas / dias).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {(
                            producto.cantidaStockSucursal /
                            (producto.cantidadVentas / dias)
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {producto.cantidaStockSucursal > 0
                            ? (
                                (producto.cantidadVentas /
                                  producto.cantidaStockSucursal) *
                                100
                              ).toFixed(2)
                            : 0}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

function agruparPorEmpresa(dataActual: ProductosStockI[]): DataEmpresaI[] {
  const agrupado: Record<string, Record<string, ProductoEmpresaI>> = {};

  for (const item of dataActual) {
    const empresa = item.empresa;

    if (!agrupado[empresa]) {
      agrupado[empresa] = {};
    }

    for (const producto of item.productos) {
      const marca = producto.marca;

      if (!agrupado[empresa][marca]) {
        agrupado[empresa][marca] = {
          cantidadVentas: 0,
          categoria: producto.categoria,
          marca: producto.marca,
          rubro: producto.rubro,
          cantidadCotizaciones: 0,
          cantidadStockDeposito: 0,
          cantidaStockSucursal: 0,
        };
      }
      agrupado[empresa][marca].cantidadVentas += producto.cantidadVentas;
      for (const stock of producto.stock) {
        if (stock.tipo === "ALMACEN") {
          agrupado[empresa][marca].cantidadStockDeposito += stock.cantidad;
        } else if (stock.tipo === "SUCURSAL") {
          agrupado[empresa][marca].cantidaStockSucursal += stock.cantidad;
        }
      }
    }
  }

  const resultado = Object.entries(agrupado).map(([empresa, marcasObj]) => ({
    empresa,
    productos: Object.values(marcasObj),
  }));

  return resultado;
}
