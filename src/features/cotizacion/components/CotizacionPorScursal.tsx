import type { CotizacionI } from "../interface/Cotizacion";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export const CotizacionPorScursal = ({
  cotizacion,
}: {
  cotizacion: CotizacionI[];
}) => {
  const resultado = agruparCotizacionPorScursal(cotizacion);

  return (
    <Box sx={{ padding: 3, backgroundColor: "grey.100", borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Cotizaciones por Sucursal
      </Typography>

      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={resultado}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sucursal" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cotizaciones" fill="#1976d2" barSize={40}>
           
              <LabelList dataKey="cotizaciones" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

function agruparCotizacionPorScursal(cotizacion: CotizacionI[]) {
    const agrupacion:Record<string,{cantidad:number}>  = {}
   for (const item of cotizacion) {

    if(!agrupacion[item.sucursal]){
        agrupacion[item.sucursal] = {cantidad:0}
    }
    agrupacion[item.sucursal].cantidad +=1
   }

   const resultado =  Object.entries(agrupacion).map(([sucursal,item ])=> ({sucursal:sucursal,cotizaciones:item.cantidad }))
  return resultado
   
    
}