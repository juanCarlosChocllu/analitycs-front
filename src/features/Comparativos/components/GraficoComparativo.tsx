import dayjs from "dayjs";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ComposedChart } from "recharts";
import type { DataDiaria } from "../interface/compartivo";
import { Box, Stack} from "@mui/material";
dayjs.locale("es");
const productoColor = {
  'GAFA': '#3b82f6',
  'LENTE': '#f97316',
  'LENTE DE CONTACTO': '#6b7280',
  'MONTURA': '#eab308'
}

const procesarData = (data: DataDiaria[]) => {

  const agruparPorFecha = data.reduce((acc, item) => {
    if (!acc[item.fecha]) {
      acc[item.fecha] = [];
    }
    acc[item.fecha].push(item);
    return acc;
  }, {} as Record<string, DataDiaria[]>);

  const chartData = Object.entries(agruparPorFecha).map(([fecha, items]) => {
    const dayData = { fecha };
    const agruparPorProducto = items.reduce((acc, item) => {
      if (!acc[item.producto]) {
        acc[item.producto] = 0;
      }
      acc[item.producto] += item.importe;
      return acc;
    }, {} as Record<string, number>);
    const agruparPorUnidades = items.reduce((acc, item) => {
      if (!acc[`${item.producto}Cant`]) {
        acc[`${item.producto}Cant`] = 0;
      }
      acc[`${item.producto}Cant`] += item.cantidad;
      return acc;
    }, {} as Record<string, number>);

    Object.assign(dayData, agruparPorProducto, agruparPorUnidades);

    return dayData;
  });


  return chartData;
}


export const GraficoComparativo = ({ data }: { data: DataDiaria[] }) => {
  const chartData = procesarData(data);
  console.log("chartData", chartData);
  return (
    <Stack sx={{ with: '95%' }}>
      <Box sx={{ with: '100%', height: '600px', backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis
              dataKey="fecha"
              tickFormatter={(value) => dayjs(value).format('DD/MM/YY')}
              tick={{ fontSize: 12 }}
              label={{ value: 'Fecha', position: 'insideBottom', offset: -1, style: { fontSize: 14, fontWeight: 600} }}
            />
            <YAxis
              domain={[0, 'dataMax']}
              tickCount={7}
              fontSize={12}
              label={{ value: 'Importe (Bs.)', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 600 } }}
            />
            <Legend
              iconSize={20}
              iconType="circle"
              wrapperStyle={{ paddingLeft: 20}}
              fontSize={12}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'GAFA') {
                  return [`${value} Bs.`, name];
                }
                if (name === 'LENTE') {
                  return [`${value} Bs.`, name];
                }
                if (name === 'LENTE DE CONTACTO') {
                  return [`${value} Bs.`, name];
                }
                if (name === 'MONTURA') {
                  return [`${value} Bs.`, name];
                }
                return [`${value}`, name];
              }}
              labelFormatter={(label) => `Fecha: ${dayjs(label).format('DD/MM/YY')}`}
              cursor={{ fill: '#f5f5f5', opacity: 0.7 }}
            />
            <Bar dataKey="GAFA" name="GAFA" stackId="a" fill={productoColor.GAFA} animationEasing="ease-in-out" animationBegin={100} animationDuration={100} />
            <Bar dataKey="LENTE" name="LENTE" stackId="b" fill={productoColor.LENTE} animationEasing="ease-in-out" animationBegin={200} animationDuration={100} />
            <Bar dataKey="LENTE DE CONTACTO" name="LENTE DE CONTACTO" stackId="c" fill={productoColor['LENTE DE CONTACTO']} animationEasing="ease-in-out" animationBegin={300} animationDuration={100} />
            <Bar dataKey="MONTURA" name="MONTURA" stackId="d" fill={productoColor.MONTURA} animationEasing="ease-in-out" animationBegin={400} animationDuration={100} />
          </ComposedChart>
        </ResponsiveContainer>

      </Box>

    </Stack>
  )
}

