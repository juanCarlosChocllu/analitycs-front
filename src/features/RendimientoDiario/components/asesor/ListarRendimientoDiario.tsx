import React, { useEffect, useState } from 'react';
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
  Box
} from '@mui/material';

import { RegistrarRendimientoDiarioModal } from '../../modal/RegistrarRendimientoDiarioModal';
import { listarRendimientoDiarioAsesor } from '../../service/RendimientoDiarioService';
import type { RendimientoDiarioI } from '../../interface/RendimientoDiario';
import { mostrarEnDia } from '../../utils/mostrarDia';

export const ListarRendimientoDiario = () => {
  const [data, setData] = useState<RendimientoDiarioI[]>([]);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
   const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    listar(paginaActual);
  }, [paginaActual,reload]);

  const listar = async (pagina: number) => {
    try {
      const response = await listarRendimientoDiarioAsesor(pagina); 
      
  
      setData(response.data);
      setTotalPaginas(response.paginas);
      setPaginaActual(response.paginaActual);
    } catch (error) {
      console.error('Error al listar rendimiento diario', error);
    }
  };

  const handleCambioPagina = (_: React.ChangeEvent<unknown>, value: number) => {
    setPaginaActual(value);
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', color: '#001638' }}>
        Rendimiento Diario
      </Typography>

      <Box display="flex" justifyContent="flex-end" m={2}>
        <RegistrarRendimientoDiarioModal reload={reload}  setReload={setReload}/>
      </Box>
      
      <Table sx={{ minWidth: 650 }} aria-label="tabla rendimiento diario">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Asesor</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sucursal</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Atenciones</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Segundo Par</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Día</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha de Creación</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.asesor}</TableCell>
              <TableCell>{row.sucursal}</TableCell>
              <TableCell>{row.atenciones}</TableCell>
              <TableCell>{row.segundoPar}</TableCell>
              <TableCell>{mostrarEnDia(row.fechaDia)}</TableCell>
              <TableCell>{row.fecha}</TableCell>
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
