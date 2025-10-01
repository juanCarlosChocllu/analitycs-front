import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import type { CotizacionI } from "../interface/Cotizacion";
import { GraficoCotizacion } from "./GraficoCotizacion";

export const ListarCotizacion = ({
  cotizacion,
}: {
  cotizacion: CotizacionI[];
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCotizaciones = cotizacion.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
   
    <Box sx={{ padding: 2 }}>
         <GraficoCotizacion cotizacion={cotizacion}/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sucursal</TableCell>
              <TableCell>Asesor</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>No compra</TableCell>

              <TableCell>Total</TableCell>
              <TableCell>ID venta</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCotizaciones.map((cot) => (
              <TableRow key={cot._id}>
                <TableCell>{cot.sucursal}</TableCell>
                <TableCell>{cot.asesor}</TableCell>
                <TableCell>{cot.codigo}</TableCell>
                <TableCell>{cot.noCompra}</TableCell>

                <TableCell>{cot.total1 + cot.total2}</TableCell>
                <TableCell>{cot.id_venta}</TableCell>
                <TableCell>
                  {new Date(cot.fechaCotizacion).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
   
        <TablePagination
          component="div"
          count={cotizacion.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>
    </Box>
 
  );
};
