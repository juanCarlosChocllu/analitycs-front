import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'


import type { ventaAsesor } from '../interface/RendimientoDiario'

export const TablaMetasInformacion = ({ diasComerciales, metaTicket, venta }: { metaTicket: number, diasComerciales: number, venta: ventaAsesor[] }) => {
  let totalTicket:number = 0
  let totalDias:number = 0
  let diasVendidos:string[] =[]
  for (const v of venta) {
    for (const a of v.ventas) {
      totalTicket += a.ticket
     
      diasVendidos.push(a.fecha)
    }
    totalDias += v.dias
  }
let diasUnicos = Array.from(new Set(diasVendidos));


  
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Ventas x día promedio requerido </TableCell>
            <TableCell>Ventas x día promedio logrado</TableCell>

            <TableCell>Avance de meta</TableCell>
            <TableCell>Ventas x día por asesor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            <TableRow hover>
              <TableCell>
                {
                  metaTicket && diasComerciales ? (metaTicket / diasComerciales).toFixed(2) : 0
                }
              </TableCell>
              <TableCell>
                {(totalTicket / diasUnicos.length).toFixed(2)}
              </TableCell>

              <TableCell>
                {totalTicket > 0 && metaTicket > 0 ? (totalTicket / metaTicket).toFixed(2) : 0}
              </TableCell>
              <TableCell>
                {totalDias > 0 && metaTicket > 0 ? (metaTicket / totalDias).toFixed(2) : 0}
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
