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
import type {
  ProductosStockI,
  VentaStockSucursalI,
} from "../interface/productos";
import { variacion } from "../../Comparativos/utils/calcularVaricacion";
import { cantidadDiasRangoFecha } from "../../app/util/fechasUtils";
import { useEffect, useState } from "react";
import { useEstadoReload } from "../../app/zustand/estadosZustand";

export const SucursalesVenta = ({
  datatActual,
  datatAnterior,
  fechaFin,
  fechaInicio,
}: {
  datatActual: ProductosStockI[];
  datatAnterior: ProductosStockI[];
  fechaInicio: string;
  fechaFin: string;
}) => {
  const [data, setdata] = useState<VentaStockSucursalI[]>([]);
  const dias = cantidadDiasRangoFecha(fechaInicio, fechaFin);
    const { isReloading } = useEstadoReload();
  useEffect(()=>{ 
 
    
    setdata(agruparPorSucursal(datatActual, datatAnterior))
  },[isReloading])

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
                                {cat.ventasAnterior > 0
                                  ? variacion(
                                      cat.ventaActual,
                                      cat.ventasAnterior
                                    ).toFixed(2)
                                  : 0}
                                %
                              </TableCell>
                              <TableCell align="right">
                                {(cat.ventaActual / dias).toFixed(2)}
                              </TableCell>
                              <TableCell align="right">
                                {cat.stockSucursal}
                              </TableCell>
                              <TableCell align="right">0</TableCell>
                              <TableCell align="right">0</TableCell>
                              <TableCell align="right">0</TableCell>
                              <TableCell align="right">0</TableCell>
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
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Total
                          </TableCell>
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

function agruparPorSucursal(
  datatActual: ProductosStockI[],
  datatAnterior: ProductosStockI[]
): VentaStockSucursalI[] {
  const agrupado: Record<
    string,
    Record<
      string,
      Record<
        string,
        {
          ventaActual: number;
          ventasAnterior: number;
          presupuesto: number;
          stockSucursal: number;
          stockDeposito: number;
        }
      >
    >
  > = {};

  for (const item of datatActual) {
    const sucursal = item.sucursal;
    for (const producto of item.productos) {
      const rubro = producto.rubro;
      const categoria = producto.categoria;

      if (!agrupado[sucursal]) {
        agrupado[sucursal] = {};
      }
      if (!agrupado[sucursal][rubro]) {
        agrupado[sucursal][rubro] = {};
      }
      if (!agrupado[sucursal][rubro][categoria]) {
        agrupado[sucursal][rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockSucursal: 0,
          stockDeposito: 0,
        };
      }

      agrupado[sucursal][rubro][categoria].ventaActual +=
        producto.cantidadVentas;
      if (producto && producto.stock.length > 0) {
        for (const s of producto.stock) {
          if (s.tipo === "ALMACEN") {
            agrupado[sucursal][rubro][categoria].stockDeposito += s.cantidad;
          } else if (s.tipo === "SUCURSAL") {
            agrupado[sucursal][rubro][categoria].stockSucursal += s.cantidad;
          }
        }
      }
    }
  }

  for (const item of datatAnterior) {
    const sucursal = item.sucursal;

    for (const producto of item.productos) {
      const rubro = producto.rubro;
      const categoria = producto.categoria;

      if (!agrupado[sucursal]) {
        agrupado[sucursal] = {};
      }
      if (!agrupado[sucursal][rubro]) {
        agrupado[sucursal][rubro] = {};
      }
      if (!agrupado[sucursal][rubro][categoria]) {
        agrupado[sucursal][rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockSucursal: 0,
          stockDeposito: 0,
        };
      }

      agrupado[sucursal][rubro][categoria].ventasAnterior +=
        producto.cantidadVentas;
    }
  }
  const resultado = Object.entries(agrupado).map(([sucursal, rubros]) => ({
    sucursal,
    rubros: Object.entries(rubros).map(([rubro, categorias]) => ({
      rubro,
      categorias: Object.entries(categorias).map(([categoria, valores]) => ({
        categoria,
        ...valores,
      })),
    })),
  }));

  return resultado;
}
