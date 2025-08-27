import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const TablaMetaHeader = ({ diasComerciales,metaTicket }: { metaTicket: number, diasComerciales:number }) => {  
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Meta</TableCell>
            <TableCell>Días comerciales</TableCell>
            <TableCell>Ventas promedio requerido por dias</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            <TableRow hover>
              <TableCell>
                {metaTicket }
              </TableCell>
              <TableCell>
                {diasComerciales }
              </TableCell>
              <TableCell>
                {
                   metaTicket && diasComerciales ?  (metaTicket / diasComerciales).toFixed(2):0
                  }
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
      
    </TableContainer>
  );
};
