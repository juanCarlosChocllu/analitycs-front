import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { 
    ComposedChart, 
    Line, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
  } from 'recharts';
import type { GraficoIndicadorSucursalI } from '../interface/IndicadorSucursal';

export  function Grafico({data}:{data:GraficoIndicadorSucursalI[]}) {
   

  
  const [reverseX, setReverseX] = React.useState(false);
  const [reverseLeft, setReverseLeft] = React.useState(false);
  const [reverseRight, setReverseRight] = React.useState(false);
  const [sortedData, setSortedData] = React.useState([...data].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()));
  
  useEffect(() => {
    if(reverseX){
      setSortedData([...data].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()));
    }else{
      setSortedData([...data].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()));
    }
  }, [reverseX, data]);

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack direction="row">
        <FormControlLabel
          checked={reverseX}
          control={
            <Checkbox onChange={(event) => setReverseX(event.target.checked)} />
          }
          label="eje x inverso"
          labelPlacement="end"
        />
        <FormControlLabel
          checked={reverseLeft}
          control={
            <Checkbox onChange={(event) => setReverseLeft(event.target.checked)} />
          }
          label="eje izquierdo inverso"
          labelPlacement="end"
        />
        <FormControlLabel
          checked={reverseRight}
          control={
            <Checkbox onChange={(event) => setReverseRight(event.target.checked)} />
          }
          label="eje derecho inverso"
          labelPlacement="end"
        />
      </Stack>
      <Box sx={{ width: '100%', height: '400px', marginTop: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={sortedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" />
            <XAxis 
              dataKey="fechaFormateada" 
              tick={{ fontSize: 12 }}
              label={{ value: 'Fecha', position: 'insideBottom', offset: -5, style: { fontSize: 14, fontWeight: 600 } }}
            />
            <YAxis 
              yAxisId="left"
              reversed={reverseLeft}
              tick={{ fontSize: 12 }}
              label={{ value: 'Precio - Ticket (Bs.)', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 600 } }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              reversed={reverseRight}
              tick={{ fontSize: 12 }}
              label={{ value: 'Ventas (Bs.)', angle: 90, position: 'insideRight', style: { fontSize: 14, fontWeight: 600 } }}
            />
            <Tooltip 
              formatter={(value, name) => {
             
                
                if (name === 'Venta Diaria') {
                  return [`${value}`, name];
                }
                return [`${value}`, name];
              }}
              labelFormatter={(label) => `Fecha: ${label}`}
              cursor={{ fill: '#f5f5f5', opacity: 0.7 }}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconSize={20}
              iconType="circle"
            />
            <Bar 
              yAxisId="right" 
              dataKey="ventaDiaria" 
              fill="#bfdbf7" 
              name="Venta Diaria"
              opacity={0.7}
              barSize={70}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="precioPromedio" 
              stroke="#577399" 
              strokeWidth={2}
              name="Precio Promedio"
              dot={{ fill: '#577399', stroke: '#577399', strokeWidth: 2 }}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="ticketPromedio" 
              stroke="#fe5f55" 
              strokeWidth={2}
              name="Ticket Promedio"
              dot={{ fill: '#fe5f55', stroke: '#fe5f55', strokeWidth: 2 }}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="tickets" 
              stroke="#69E39C" 
              strokeWidth={2}
              name="Tickets"
              dot={{ fill: '#69E39C', stroke: '#69E39C', strokeWidth: 2 }}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="cantidad" 
              stroke="#C30A5D" 
              strokeWidth={2}
              name="Unidades"
              dot={{ fill: '#C30A5D', stroke: '#C30A5D', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
}
