import dayjs from "dayjs";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, BarChart } from "recharts";
import type { DataDiaria } from "../interface/compartivo";
import { Box, Stack, Typography } from "@mui/material";
import { procesarDatos } from "../utils/procesarDatos";
import { useState } from "react";
import { abreviarMonedaRegion } from "../../app/util/abreviarMonenda";
import { combinarDatos, combinarDatosPorFecha } from "../utils/combinacionDatos";
dayjs.locale("es");

const colores = {
  actual: '#94D603',
  anterior: '#0277A6',
}

interface Props {
  dataActual: DataDiaria[];
  dataAnterior: DataDiaria[];
  region: string;
}

export const GraficoComparativoAnual = ({ dataActual, dataAnterior, region }: Props) => {
  const [mostrarActual, setMostrarActual] = useState(true);
  const [mostrarAnterior, setMostrarAnterior] = useState(true);
  const [vistaActiva, setVistaActiva] = useState<'comparacion' | 'producto'>('comparacion');

  const datosGraficaActual = procesarDatos(dataActual).map(dia => ({
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

  const datosGraficaAnterior = procesarDatos(dataAnterior).map(dia => ({
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

  const datosComparacion = combinarDatosPorFecha(datosGraficaActual, datosGraficaAnterior);
  const datosPorProducto = combinarDatos(datosGraficaActual, datosGraficaAnterior);
  const nomeda = abreviarMonedaRegion(region);

  return (
    <Stack sx={{ width: '95%', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', margin: '0 auto' }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
        Comparación - Período Actual vs Anterior
      </Typography>
      <Box sx={{ width: '100%', height: '600px', backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2, display: 'flex', flexDirection: 'row' }}>
          <button
            onClick={() => setVistaActiva('comparacion')}
            className={`px-4 py-2 rounded-md transition-colors uppercase ${vistaActiva === 'comparacion'
              ? 'bg-[#02A1E0] text-white border-[#003c6d] border-2'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Importe
          </button>
          <button
            onClick={() => setVistaActiva('producto')}
            className={`px-4 py-2 rounded-md transition-colors uppercase ${vistaActiva === 'producto'
              ? 'bg-[#02A1E0] text-white border-[#003c6d] border-2'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Detallado
          </button>
        </Stack>
        <ResponsiveContainer width="100%" height={500}>
          {vistaActiva === 'comparacion' ? (

            <BarChart
              width={500}
              height={400}
              data={datosComparacion}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" angle={-45} textAnchor="end" fontSize={12} height={80} />
              <YAxis fontSize={12}/>
              <Tooltip
                formatter={(value, name) => {
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }}
                cursor={{ fill: '#f5f5f5', opacity: 0.7 }}
              />
              <Legend
                iconSize={20}
                iconType="circle"
                wrapperStyle={{ paddingLeft: 20 }}
                fontSize={12}
                onClick={
                  (e) => {
                    if (e.dataKey === "actualImporte") {
                      setMostrarActual((prev) => !prev);
                    }
                    if (e.dataKey === "anteriorImporte") {
                      setMostrarAnterior((prev) => !prev);
                    }
                  }
                }
              />
              <Bar type="monotone" dataKey="anteriorImporte" name="Anterior" stroke={colores.anterior} fill={colores.anterior} hide={!mostrarAnterior} />
              <Bar type="monotone" dataKey="actualImporte" name="Actual" stroke={colores.actual} fill={colores.actual} hide={!mostrarActual} />
            </BarChart>
          ) : (

            <BarChart data={datosPorProducto} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="producto"
                angle={-45}
                fontSize={12}
                textAnchor="end"
                height={80}
                tickFormatter={(value) => value.toUpperCase()}
              />
              <YAxis fontSize={12} />
              <Tooltip
                formatter={(value, name) => {
                  return [`${value.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${nomeda}`, name];
                }}

                cursor={{ fill: '#f5f5f5', opacity: 0.7 }}
              />
              <Legend
                iconSize={20}
                iconType="circle"
                wrapperStyle={{ paddingLeft: 20 }}
                fontSize={12}
                onClick={
                  (e) => {
                    if (e.dataKey === "actual") {
                      setMostrarActual((prev) => !prev);
                    }
                    if (e.dataKey === "anterior") {
                      setMostrarAnterior((prev) => !prev);
                    }
                  }
                }
              />
              <Bar dataKey="anterior" fill={colores.anterior} name="Período Anterior" hide={!mostrarAnterior} />
              <Bar dataKey="actual" fill={colores.actual} name="Período Actual" hide={!mostrarActual} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
};