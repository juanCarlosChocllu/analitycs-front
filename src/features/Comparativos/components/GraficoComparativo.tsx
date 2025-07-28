import dayjs from "dayjs";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ComposedChart, Line } from "recharts";
import type { DataDiaria } from "../interface/compartivo";
import { Box, Stack } from "@mui/material";
import { procesarDatos } from "../utils/procesarDatos";
import { useState } from "react";
import { abreviarMonedaRegion } from "../../app/util/abreviarMonenda";
dayjs.locale("es");
const productoColor = {
  'GAFA': '#3b82f6',
  'LENTE': '#f97316',
  'LENTE DE CONTACTO': '#6b7280',
  'MONTURA': '#eab308',
  'SERVICIO': '#a4de6c',
  'IMPORTE': '#0DD98E'
}
interface Props {
  data: DataDiaria[];
  region: string;
}

export const GraficoComparativo = ({ data, region }: Props) => {
  const [mostrarGafa, setMostrarGafa] = useState(true);
  const [mostrarLente, setMostrarLente] = useState(true);
  const [mostrarLenteContacto, setMostrarLenteContacto] = useState(true);
  const [mostrarMontura, setMostrarMontura] = useState(true);
  const [mostrarServicio, setMostrarServicio] = useState(true);
  const [mostrarTicketPromedio, setMostrarTicketPromedio] = useState(true);
  const [mostrarPrecioPromedio, setMostrarPrecioPromedio] = useState(true);
  const [mostrarCantidad, setMostrarCantidad] = useState(true);
  const [mostrarTickets, setMostrarTickets] = useState(true);
  const [mostrarImporte, setMostrarImporte] = useState(true);


  const datosGrafica = procesarDatos(data).map(dia => ({
    fecha: dia.fecha,
    LENTE: dia.LENTE.importe,
    MONTURA: dia.MONTURA.importe,
    GAFA: dia.GAFA.importe,
    'LENTE DE CONTACTO': dia['LENTE DE CONTACTO'].importe,
    SERVICIO: dia.SERVICIO.importe,
    ticketPromedio: dia.totalTicketsPromedio,
    precioPromedio: dia.totalPrecioPromedio,
    cantidad: dia.totalCantidad,
    tickets: dia.totalTickets,
    IMPORTE: dia.totalImporte
  }));
  console.log("datosGrafica",datosGrafica)
const nomeda = abreviarMonedaRegion(region)

  return (
    <Stack sx={{ with: '95%' }}>
      <Box sx={{ with: '100%', height: '600px', backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={datosGrafica} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="fecha"
              tickFormatter={(value) => dayjs(value).format('DD/MM/YY')}
              tick={{ fontSize: 12 }}
              label={{ value: 'Fecha', position: 'insideBottom', offset: -1, style: { fontSize: 14, fontWeight: 600 } }}
            />
            <YAxis
              domain={[0, 'dataMax']}
              tickCount={7}
              fontSize={12}
              label={{ value: `Importe (${nomeda})`, angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 600 } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              label={{
                value: "Tickets",
                angle: 90,
                position: "insideRight",
                style: { fontSize: 14, fontWeight: 600 },
              }}
            />
            <Legend
              iconSize={20}
              iconType="circle"
              wrapperStyle={{ paddingLeft: 20 }}
              fontSize={12}
              onClick={(e) => {
                if (e.dataKey) {
                  if (e.dataKey === "GAFA") {
                    setMostrarGafa((prev) => !prev);
                  }
                  if (e.dataKey === "LENTE") {
                    setMostrarLente((prev) => !prev);
                  }
                  if (e.dataKey === "LENTE DE CONTACTO") {
                    setMostrarLenteContacto((prev) => !prev);
                  }
                  if (e.dataKey === "MONTURA") {
                    setMostrarMontura((prev) => !prev);
                  }
                  if (e.dataKey === "SERVICIO") {
                    setMostrarServicio((prev) => !prev);
                  }
                  if (e.dataKey === "ticketPromedio") {
                    setMostrarTicketPromedio((prev) => !prev);
                  }
                  if (e.dataKey === "precioPromedio") {
                    setMostrarPrecioPromedio((prev) => !prev);
                  }
                  if (e.dataKey === "cantidad") {
                    setMostrarCantidad((prev) => !prev);
                  }
                  if (e.dataKey === "tickets") {
                    setMostrarTickets((prev) => !prev);
                  }
                  if (e.dataKey === "IMPORTE") {
                    setMostrarImporte((prev) => !prev);
                  }
                }
              }}
            />
            <Tooltip
            
              formatter={(value, name) => {
                if (name === 'GAFA') {
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }
                if (name === 'LENTE') {
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }
                if (name === 'LENTE DE CONTACTO') {
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }
                if (name === 'MONTURA') {
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }
                if (name === 'SERVICIO') {
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }
                if(name == 'PRECIO PROMEDIO'){
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }
                if(name == 'TICKETS PROMEDIO'){
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, name];
                }
                if(name == 'IMPORTE'){
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }
                return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, name];
              }}
              labelFormatter={(label) => `Fecha: ${dayjs(label).format('DD/MM/YY')}`}
              cursor={{ fill: '#f5f5f5', opacity: 0.7 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="ticketPromedio"
              stroke="#05c7f2"
              strokeWidth={2}
              name="TICKETS PROMEDIO"
              dot={{ fill: "#05c7f2", stroke: "#05c7f2", strokeWidth: 2 }}
              hide={!mostrarTicketPromedio}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="precioPromedio"
              stroke="#577399"
              strokeWidth={2}
              name="PRECIO PROMEDIO"
              dot={{ fill: "#577399", stroke: "#577399", strokeWidth: 2 }}
              hide={!mostrarPrecioPromedio}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cantidad"
              stroke="#C30A5D"
              strokeWidth={2}
              name="UNIDADES"
              dot={{ fill: "#C30A5D", stroke: "#C30A5D", strokeWidth: 2 }}
              hide={!mostrarCantidad}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="tickets"
              stroke="#69E39C"
              strokeWidth={2}
              name="TICKETS"
              dot={{ fill: "#69E39C", stroke: "#69E39C", strokeWidth: 2 }}
              hide={!mostrarTickets}
            />
            <Bar dataKey="IMPORTE" fill={productoColor.IMPORTE} hide={!mostrarImporte}/>
            <Bar dataKey="LENTE" fill={productoColor.LENTE} hide={!mostrarLente}/>
            <Bar dataKey="MONTURA" fill={productoColor.MONTURA} hide={!mostrarMontura}/>
            <Bar dataKey="GAFA" fill={productoColor.GAFA} hide={!mostrarGafa}/>
            <Bar dataKey="LENTE DE CONTACTO" fill={productoColor['LENTE DE CONTACTO']} hide={!mostrarLenteContacto}/>
            <Bar dataKey="SERVICIO" fill={productoColor.SERVICIO} hide={!mostrarServicio}/>

           </ComposedChart>
        </ResponsiveContainer>

      </Box>

    </Stack>
  )
}

