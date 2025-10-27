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
import type { ProductosStockI, VentaStockI } from "../interface/productos";
import { porcentaje } from "../../app/util/porcentaje";
import { useEffect, useState } from "react";
import { agruparVentaProductosPorRubroYCategoria } from "../utils/productosAgrupacion";
import { useEstadoReload } from "../../app/zustand/estadosZustand";

export const RotacionInventario = ({ dataActual, dataAnterior }: { dataActual: ProductosStockI[], dataAnterior: ProductosStockI[] } 
  
 ) => {
  const { isReloading } = useEstadoReload();
  const [ventaTotalStock, setventaTotalStock] = useState< VentaStockI[]>([])
    useEffect(() => { 

      
      setventaTotalStock(agruparVentaProductosPorRubroYCategoria(dataActual, dataAnterior))
    }, [isReloading])
  
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" sx={{ my: 2 }}>
        Rotación Inventario
      </Typography>

      {ventaTotalStock.map((rubroItem) => {
        const totalVentas = rubroItem.categorias.reduce(
          (acc, cat) => acc + cat.ventaActual,
          0
        );
        const totalStockSucursal = rubroItem.categorias.reduce(
          (acc, cat) => acc + cat.stockSucursal,
          0
        );
        const totalStockDeposito = rubroItem.categorias.reduce(
          (acc, cat) => acc + cat.stockDeposito,
          0
        );
        const totalStockTotal = totalStockSucursal + totalStockDeposito;

        return (
          <div key={rubroItem.rubro}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              <strong>{rubroItem.rubro}</strong>
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Categoría</strong></TableCell>
                  <TableCell align="right"><strong>Año Actual</strong></TableCell>
                  <TableCell align="right"><strong>Share</strong></TableCell>
                  <TableCell align="right"><strong>Facing</strong></TableCell>
                  <TableCell align="right"><strong>Share Facing</strong></TableCell>
                  <TableCell align="right"><strong>Rotación Facing</strong></TableCell>
                  <TableCell align="right"><strong>Rotación Stock Total</strong></TableCell>
                  <TableCell align="right"><strong>Rotación Stock Locales</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rubroItem.categorias.map((item) => {
                  const stockTotal = item.stockSucursal + item.stockDeposito;

                  return (
                    <TableRow key={item.categoria}>
                      <TableCell>{item.categoria || "Sin categoría"}</TableCell>
                      <TableCell align="right">{item.ventaActual}</TableCell>
                      <TableCell align="right">
                        {porcentaje(item.ventaActual, totalVentas)} %
                      </TableCell>

                      {/* Placeholder: Facing */}
                      <TableCell align="right">0</TableCell>
                      <TableCell align="right">0</TableCell>
                      <TableCell align="right">0</TableCell>

                      {/* Rotación total */}
                      <TableCell align="right">
                        {stockTotal > 0
                          ? (item.ventaActual / stockTotal).toFixed(2)
                          : "0"}
                      </TableCell>

                      {/* Rotación stock locales */}
                      <TableCell align="right">
                        {item.stockSucursal > 0
                          ? (item.ventaActual / item.stockSucursal).toFixed(2)
                          : "0"}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {/* Totales por rubro */}
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><strong>Total</strong></TableCell>
                  <TableCell align="right"><strong>{totalVentas}</strong></TableCell>
                  <TableCell align="right"><strong>100%</strong></TableCell>
                  <TableCell align="right"><strong>0</strong></TableCell>
                  <TableCell align="right"><strong>0</strong></TableCell>
                  <TableCell align="right"><strong>0</strong></TableCell>
                  <TableCell align="right">
                    <strong>
                      {totalStockTotal > 0
                        ? (totalVentas / totalStockTotal).toFixed(2)
                        : "0"}
                    </strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      {totalStockSucursal > 0
                        ? (totalVentas / totalStockSucursal).toFixed(2)
                        : "0"}
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
