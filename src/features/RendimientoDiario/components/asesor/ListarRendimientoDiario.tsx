import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

import { RegistrarRendimientoDiarioModal } from '../../modal/RegistrarRendimientoDiarioModal';
import { listarRendimientoDiarioAsesor } from '../../service/RendimientoDiarioService';
import type { RendimientoDiarioI } from '../../interface/RendimientoDiario';
import { mostrarEnDia } from '../../utils/mostrarDia';


export const ListarRendimientoDiario = () => {
    const [data, setdata] = useState<RendimientoDiarioI[]>([])
    useEffect(()=>{
    listar()
    },[])

    const listar =async()=>{
        try {
            const response = await listarRendimientoDiarioAsesor()
            setdata(response)
        } catch (error) {
            console.log('c',error);
            
        }
    }
  return (
    <TableContainer 
      component={Paper}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Rendimiento Diario
      </Typography>
      <RegistrarRendimientoDiarioModal/>
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
    </TableContainer>
  );
};
