import { Box, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CotizacionI } from "../interface/Cotizacion";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#a28be4",
  "#00C49F",
  "#FFBB28",
];

export const GraficoCotizacion = ({
  cotizacion,
}: {
  cotizacion: CotizacionI[];
}) => {
  const dataSetNoCompra = agruparMotivo(cotizacion);
  const dataSetVendidas = agruparConvertidasAventa(cotizacion);
  const dataset = dataSetNoCompra.concat(dataSetVendidas);

  return (
    <Box  sx={{ width: "90%", height: 200, mb: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Motivo de no compra
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataset}>
          <XAxis dataKey="noCompra" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad">
            {dataset.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
             <LabelList dataKey="cantidad" position="top" /> 
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

function agruparMotivo(cotizacion: CotizacionI[]) {
  let agrupacion: Record<string, { cantidad: number }> = {};
  for (const item of cotizacion) {
    if (!agrupacion[item.noCompra]) {
      agrupacion[item.noCompra] = { cantidad: 0 };
    }
    agrupacion[item.noCompra].cantidad += 1;
  }

  const resultado = Object.entries(agrupacion).map(([noCompra, value]) => ({
    noCompra,
    cantidad: value.cantidad,
  }));
  return resultado;
}

function agruparConvertidasAventa(cotizacion: CotizacionI[]) {
  let agrupacion: Record<string, { cantidad: number }> = {};

  for (const item of cotizacion) {
    if (item.id_venta !== undefined) {
      if (!agrupacion["VENDIDAS"]) {
        agrupacion["VENDIDAS"] = { cantidad: 0 };
      }
      agrupacion["VENDIDAS"].cantidad += 1;
    }
  }

  const resultado = Object.entries(agrupacion).map(([vendidas, value]) => ({
    noCompra: vendidas,
    cantidad: value.cantidad,
  }));

  return resultado;
}
