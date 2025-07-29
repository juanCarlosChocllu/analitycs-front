import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import type { dataComparativo, dataI, ventaSucursalI } from '../interface/compartivo';
import { variacion } from '../utils/calcularVaricacion';


export const LocalesComparables = ({dataActual,dataAnterior}:dataI) => {
    const ventaActual = dataActual.ventaSucursal.ventaSucursal
    const ventaAnterior = dataAnterior.ventaSucursal.ventaSucursal
    const cantidadSucursalesAnterior = cantidadSucursal(ventaAnterior)
    const data:dataComparativo[]=[]
    for (const  item of ventaAnterior) {
        if(item.data.length > 0 ){
           for (const venta of ventaActual) {

          
                if(item.sucursal === venta.sucursal){
                    const dataSucursal :dataComparativo = {
                       cantidadAnterior: item.data.reduce((acc, item) => acc + item.cantidad,0),
                        ventaAnterior : item.data.reduce((acc,item)=>acc + item.montoTotal ,0),
                        cantidadActual: venta.data.reduce((acc, item) => acc + item.cantidad,0),
                        ventaActual:venta.data.reduce((acc, item) => acc + item.montoTotal,0)
                    }
                    data.push(dataSucursal)
                  
                }
            }
        }
    }
    
  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom className='text-center'>
          Locales comparables
        </Typography>

        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    bgcolor: '#059669',
                    color: 'white',
                    border: '1px solid #134e4a',
                    py: 0.5,
                    px: 1,
                  }}
                >
                  Sucursales
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    bgcolor: '#059669',
                    color: 'white',
                    border: '1px solid #134e4a',
                    py: 0.5,
                    px: 1,
                  }}
                >
                  {cantidadSucursalesAnterior}
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{
                    bgcolor: '#059669',
                    color: 'white',
                    border: '1px solid #134e4a',
                    py: 0.5,
                    px: 1,
                  }}
                >
                  Venta Actual
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{
                    bgcolor: '#0f766e',
                    color: 'white',
                    border: '1px solid #134e4a',
                    py: 0.5,
                    px: 1,
                  }}
                >
                  Variaciones
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    bgcolor: '#0369a1',
                    color: 'white',
                    border: '1px solid #134e4a',
                    py: 0.5,
                    px: 1,
                  }}
                >
                  Sucursales
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    bgcolor: '#0369a1',
                    color: 'white',
                    border: '1px solid #134e4a',
                    py: 0.5,
                    px: 1,
                  }}
                >
                  {cantidadSucursalesAnterior}
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{
                    bgcolor: '#0369a1',
                    color: 'white',
                    border: '1px solid #134e4a',
                    py: 0.5,
                    px: 1,
                  }}
                >
                  Venta Anterior
                </TableCell>
              </TableRow>

              <TableRow>
                {[
                  'Cantidad',
                  'Participacion en Cantidad (%)',
                  'Venta Actual',
                  'Participacion en Venta (%)',
                  'Variación unidades (%)',
                  'Variación total (%)',
                  'Cantidad',
                  'Participacion en Cantidad (%)',
                  'Venta Anterior',
                  'Participacion en Venta (%)',
                ].map((label, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      bgcolor:
                        index < 4
                          ? '#059669'
                          : index < 6
                          ? '#0f766e'
                          : '#0369a1',
                      color: 'white',
                      border: '1px solid #134e4a',
                      py: 0.5,
                      px: 1,
                      fontSize: '0.75rem',
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
         
                  <TableCell
               
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                     
                    }}
                  >
                    {data.reduce((acc,item)=> acc + item.cantidadActual,0)}
                  </TableCell>
                  <TableCell
               
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                     
                    }}
                  >
                    100 %
                  </TableCell>
                  <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                    
                    }}
                  >
                     {data.reduce((acc,item)=> acc + item.ventaActual,0).toLocaleString("en-US")}
                  </TableCell>
                     <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                     
                    }}
                  >
                    100 %
                  </TableCell>
                     <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                     
                    }}
                  >
                    {variacion(data.reduce((acc, item)=> acc + item.cantidadActual,0), data.reduce((acc, item)=> acc + item.cantidadAnterior,0)).toFixed(2)}%
                  </TableCell>
                     <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                  
                    }}
                  >
                      {variacion(data.reduce((acc, item)=> acc + item.ventaActual,0), data.reduce((acc, item)=> acc + item.ventaAnterior,0)).toFixed(2)}%
                  </TableCell>
                     <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                    
                    }}
                  >
                          {data.reduce((acc,item)=> acc + item.cantidadAnterior,0)}
                  </TableCell>
                     <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                 
                    }}
                  >
                    100 %
                  </TableCell>
                     <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                    
                    }}
                  >
                    {data.reduce((acc,item)=> acc + item.ventaAnterior,0).toLocaleString("en-US")}
                  </TableCell>
                     <TableCell
                    
                    align="center"
                    sx={{
                      border: '1px solid #d1d5db',
                   
                    }}
                  >
                    100 %
                  </TableCell>
                    
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

function cantidadSucursal (ventaSucursal:ventaSucursalI[]):number {
    let cantidad:number = 0

      for (const venta of ventaSucursal) {
        if(venta.data.length > 0) 
            cantidad +=1
    }
   
    
    return cantidad
}