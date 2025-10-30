import React, { memo } from 'react';
import { Box, Typography, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import type { PerformanceData } from '../interface/RendimientoDiario';


const parsePercentage = (percentageString: string): number => {
  return parseFloat(percentageString.replace('%', ''));
};



export const ResumenSeguimiento: React.FC<{ data: PerformanceData }> = ({ data }) => {
  const avanceVentasValue = parsePercentage(data.avanceVentas);
  const avanceEntregasValue = parsePercentage(data.avanceEntregas);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ width: '100%', maxWidth: 800, overflow: 'hidden', boxShadow: 3, borderRadius: 2 }}>
        <TableContainer>
          <Table aria-label="performance dashboard table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#001638', color: 'common.white', fontWeight: 'bold' }} colSpan={3}>Meta: <Box component="span" sx={{ color: '#ed6c02' }}>{data.meta}</Box></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ bgcolor: '#001638', color: 'common.white', fontWeight: 'bold' }}>
                  Métrica
                </TableCell>
                <TableCell sx={{ bgcolor: '#001638', color: 'common.white', fontWeight: 'bold' }}>
                  Valor
                </TableCell>
                <TableCell sx={{ bgcolor: '#001638', color: 'common.white', fontWeight: 'bold' }}>
                  Avance de Meta
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Ventas Row */}
              <TableRow>
                <TableCell sx={{ bgcolor: 'performance.sales' }}>
                  Ventas
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    Total Vendido: <Typography component="span">{data.totalVendidos}</Typography>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Falta para la Meta: <Typography component="span">{data.faltaVentas}</Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <Typography component="span">{data.avanceVentas}</Typography>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={avanceVentasValue}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'warning.main',
                      },
                    }}
                  />
                </TableCell>
              </TableRow>

              {/* Entregas Row */}
              <TableRow>
                <TableCell sx={{ bgcolor: 'performance.deliveries' }}>
                  Entregas
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    Total Entregado: <Typography component="span">{data.totalEntregados}</Typography>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Falta para la Meta: <Typography component="span">{data.faltaEntregas}</Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <Typography component="span">{data.avanceEntregas}</Typography>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={avanceEntregasValue}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'warning.main',
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default memo(ResumenSeguimiento);
