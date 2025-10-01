import { Box } from '@mui/material';
import {
  ComposedChart,

  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { CotizacionI } from '../interface/Cotizacion';


const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a28be4", "#00C49F", "#FFBB28"];
export const GraficoCotizacionBarraVertical = ({
  cotizacion,
}: {
  cotizacion: CotizacionI[];
}) => {
    const dataSet =agruparPorAsesor(cotizacion).sort((a,b)=> b.cantidad -a.cantidad )

    const barHeight = 60; // Puedes ajustar este valor según el tamaño que quieras por asesor
const chartHeight = dataSet.length * barHeight;
    
  return (
  <Box sx={{ width: "90%", height: chartHeight, mb: 2 }}>
  <ResponsiveContainer width="100%" height="100%">
    <ComposedChart
      layout="vertical"
      data={dataSet}
      margin={{ top: 30, right: 20, bottom: 20, left: 100 }}

    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis type="number" />
      <YAxis
        dataKey="asesor"
        type="category"
        scale="band"
        width={300}
        
        tickMargin={20}
        
      />
      <Tooltip />
      <Bar
        dataKey="cantidad"
        barSize={20}
      
      >
        {dataSet.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Bar>
    </ComposedChart>
  </ResponsiveContainer>
</Box>


  )
}


function agruparPorAsesor(cotizacion: CotizacionI[]) {
  let agrupacion: Record<string, { cantidad: number }> = {};
  for (const item of cotizacion) {
    if (!agrupacion[item.asesor]) {
      agrupacion[item.asesor] = { cantidad: 0 };
    }
    agrupacion[item.asesor].cantidad += 1;
  }

  const resultado = Object.entries(agrupacion).map(([asesor, value]) => ({
    asesor,
    cantidad: value.cantidad,
  }));
  return resultado;
}
