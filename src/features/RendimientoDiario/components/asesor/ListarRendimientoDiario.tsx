import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Box,
} from "@mui/material";

import { RegistrarRendimientoDiarioModal } from "../../modal/RegistrarRendimientoDiarioModal";
import { listarRendimientoDiarioAsesor } from "../../service/RendimientoDiarioService";
import type { RendimientoDiarioI } from "../../interface/RendimientoDiario";
import { mostrarEnDia } from "../../utils/mostrarDia";
import { EditarRendimientoDiarioModal } from "../../modal/EditarRendimientoDiarioModal";

export const ListarRendimientoDiario = () => {
  const date = new Date();
  const anio = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  const diaRegistro = `${anio}-${mes}-${dia}`;


  const [data, setData] = useState<RendimientoDiarioI[]>([]);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    listar(paginaActual);
  }, [paginaActual, reload]);

  const listar = async (pagina: number) => {
    try {
      const response = await listarRendimientoDiarioAsesor(pagina);

      setData(response.data);
      setTotalPaginas(response.paginas);
      setPaginaActual(response.paginaActual);
    } catch (error) { }
  };

  const handleCambioPagina = (_: React.ChangeEvent<unknown>, value: number) => {
    setPaginaActual(value);
  };

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#001638",
        }}
      >
        Rendimiento Diario
      </Typography>

      <RegistrarRendimientoDiarioModal reload={reload} setReload={setReload} />

      <Table sx={{ minWidth: 650 }} aria-label="tabla rendimiento diario">
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Asesor
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Sucursal
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Atenciones
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Segundo Par
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Presupuesto
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Día
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Fecha de Creación
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Accion
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.asesor}</TableCell>
              <TableCell>{row.sucursal}</TableCell>
              <TableCell>{row.atenciones}</TableCell>
              <TableCell>{row.segundoPar}</TableCell>
              <TableCell>{row.presupuesto}</TableCell>
              <TableCell>{mostrarEnDia(row.fechaDia)}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>
                {" "}
                {row.fechaDia == diaRegistro && (
                  <EditarRendimientoDiarioModal
                    reload={reload}
                    setReload={setReload}
                    antenciones={row.atenciones}
                    segundoPar={row.segundoPar}
                    presupuesto={row.presupuesto}
                    id={row._id}
                  />
                )}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handleCambioPagina}
          color="primary"
        />
      </Box>
    </TableContainer>
  );
};
