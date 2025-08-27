import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'


import type { ventaAsesor } from '../interface/RendimientoDiario'

export const TablaMetasInformacion = ({diasComerciales,metaTicket,venta}:{metaTicket:number ,diasComerciales:number,venta:ventaAsesor[] }) => {
   let totalTicket = 0
   let totalDias = 0
   for (const v of venta) {
        for (const a of v.ventas) {
            totalTicket += a.ticket
        }
        totalDias += v.dias
   }
    console.log(totalDias/metaTicket);
    
  return (
<TableContainer>
    <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Ventas x día promedio requerido </TableCell>
            <TableCell>Ventas x día promedio logrado</TableCell>
            <TableCell>Ventas promedio requerido por dias</TableCell>
                     <TableCell>Avance de meta</TableCell>
                      <TableCell>Ventas x día por asesor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            <TableRow hover>
              <TableCell>
             {
                   metaTicket && diasComerciales ?  (metaTicket / diasComerciales).toFixed(2):0
                  }
              </TableCell>
              <TableCell>
            0
              </TableCell>
              <TableCell>
               0
              </TableCell>
               <TableCell>
                    {totalTicket > 0 && metaTicket >0 ? (totalTicket / metaTicket ).toFixed(2):0}
              </TableCell>
               <TableCell>
               {totalDias > 0 && metaTicket > 0 ? ( totalDias /metaTicket  ).toFixed(2):0}
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
</TableContainer>
  )
}
