import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import dayjs from "dayjs";
import "dayjs/locale/es";
import type { RecetaMedico } from "../interfaces/RecetaMedico";
dayjs.locale("es");

interface DetalleRecetaProps {
    recetasMedico: RecetaMedico[];
}

export const DetalleReceta = ({ recetasMedico }: DetalleRecetaProps) => {
    const [paginaActual, establecerPaginaActual] = React.useState(0);
    const [filasPorPagina, establecerFilasPorPagina] = React.useState(5);
    
    const manejarCambioDePagina = (nuevaPagina: number) => {
        establecerPaginaActual(nuevaPagina);
    };
    
    const manejarCambioDeFilasPorPagina = (evento: React.ChangeEvent<HTMLInputElement>) => {
        establecerFilasPorPagina(+evento.target.value);
        establecerPaginaActual(0);
    };

    return (
        <div className="w-[95%] m-auto p-4 my-4 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold text-[#374152] mb-4 text-center">
                Detalle de Receta
            </h1>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer component={Paper} className="mt-4">
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="uppercase">Codigo Receta</TableCell>
                                <TableCell align="center" className="uppercase">Id Venta</TableCell>
                                <TableCell align="center" className="uppercase">Fecha de Receta</TableCell>
                                <TableCell align="center" className="uppercase">Fecha de Venta</TableCell>
                                <TableCell align="right" className="uppercase">Cantidad</TableCell>
                                <TableCell align="right" className="uppercase">Estado de venta</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recetasMedico
                                .slice(paginaActual * filasPorPagina, paginaActual * filasPorPagina + filasPorPagina)
                                .map((receta, indice) => (
                                    <TableRow key={indice}>
                                        <TableCell component="th" scope="row">
                                            {receta.codigoReceta}
                                        </TableCell>
                                        <TableCell>{receta.idVenta}</TableCell>
                                        <TableCell>{receta.fechaReceta?dayjs(receta.fechaReceta).format("DD/MM/YYYY HH:mm:ss"):""}</TableCell>
                                        <TableCell>{receta.fechaVenta?dayjs(receta.fechaVenta).format("DD/MM/YYYY HH:mm:ss"):""}</TableCell>
                                        <TableCell align="right">{receta.cantidad}</TableCell>
                                        <TableCell align="right">{receta.flagVenta}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5,10,25,50,100]}
                    component="div"
                    count={recetasMedico.length}
                    rowsPerPage={filasPorPagina}
                    page={paginaActual}
                    onPageChange={(_, nuevaPagina) => manejarCambioDePagina(nuevaPagina)}
                    onRowsPerPageChange={manejarCambioDeFilasPorPagina}
                    labelRowsPerPage="Filas por página:"
                />
            </Paper>
        </div>
    );
};