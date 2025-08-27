import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import type { VentasDetallaeMetas } from "../../interface/RendimientoDiario";
import { mostrarEnDia } from "../../utils/mostrarDia";

// Obtener el lunes de la semana
const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Obtener el sábado
const getSaturday = (monday: Date): Date => {
  const saturday = new Date(monday);
  saturday.setDate(saturday.getDate() + 5);
  saturday.setHours(23, 59, 59, 999);
  return saturday;
};

export const DetalleAvanceMetaAsesor = ({
  detalle,
}: {
  detalle: VentasDetallaeMetas[];
}) => {
  if (!detalle.length) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          No hay detalles de ventas para este asesor.
        </Typography>
      </Box>
    );
  }

  // Agrupar por semana
  const ventasAgrupadasPorSemana: Record<
    string,
    { rango: string; ventas: VentasDetallaeMetas[] }
  > = {};

  detalle.forEach((venta) => {
    const fechaDate = new Date(venta.fecha);
    const monday = getMonday(fechaDate);
    const saturday = getSaturday(monday);

    const mondayStr = monday.toISOString().slice(0, 10);
    const saturdayStr = saturday.toISOString().slice(0, 10);
    const rangoSemana = `${mondayStr} a ${saturdayStr}`;

    if (!ventasAgrupadasPorSemana[rangoSemana]) {
      ventasAgrupadasPorSemana[rangoSemana] = {
        rango: rangoSemana,
        ventas: [],
      };
    }
    ventasAgrupadasPorSemana[rangoSemana].ventas.push(venta);
  });

  const semanasOrdenadas = Object.values(ventasAgrupadasPorSemana).sort(
    (a, b) =>
      new Date(a.rango.split(" a ")[0]).getTime() -
      new Date(b.rango.split(" a ")[0]).getTime()
  );

  // Inicializar totales por día (Lunes a Sábado)
  const totalesPorDia = Array(6).fill(0);
  let totalGeneral = 0;

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Avance Semanal por Día (Lunes a Sábado)
      </Typography>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          boxShadow: "0 4px 10px rgb(25 118 210 / 0.1)",
          borderRadius: 2,
          overflow: "auto",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#0d47a1" }}>
                Semana
              </TableCell>
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(
                (dia) => (
                  <TableCell
                    key={dia}
                    align="center"
                    sx={{ fontWeight: "bold", color: "#0d47a1" }}
                  >
                    {dia}
                  </TableCell>
                )
              )}
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
                Total Semana
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semanasOrdenadas.map(({ rango, ventas }, index) => {
              const diasSemana = Array(6).fill(null); 

              ventas.forEach((venta) => {
                const fecha = new Date(venta.fecha);
                const dia = fecha.getDay();
                const indice = dia === 0 ? -1 : dia - 1;

                if (indice >= 0 && indice <= 5) {
                  diasSemana[indice] = (diasSemana[indice] ?? 0) + venta.ticket;
                }
              });

              const totalSemana = diasSemana.reduce((acc, val, idx) => {
                if (val != null) {
                  totalesPorDia[idx] += val;
                  totalGeneral += val;
                }
                return acc + (val ?? 0);
              }, 0);

              return (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: "bold" }}>{rango}</TableCell>
                  {diasSemana.map((ticket, i) => (
                    <TableCell key={i} align="center">
                      {ticket != null ? ticket : 0}
                    </TableCell>
                  ))}
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalSemana}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Fila de totales por día */}
            <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#006064" }}>Total</TableCell>
              {totalesPorDia.map((total, i) => (
                <TableCell key={i} align="center" sx={{ fontWeight: "bold", color: "#006064" }}>
                  {total}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#004d40" }}>
                {totalGeneral}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
