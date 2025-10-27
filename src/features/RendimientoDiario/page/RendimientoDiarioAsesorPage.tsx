import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { listarRendimientoPorAsesor } from "../service/RendimientoDiarioService";
import type { Venta } from "../interface/RendimientoDiario";
import { mostrarEnDia } from "../utils/mostrarDia";
import {
  tasaDeConversion,
  ticketPromedio,
} from "../../app/util/ticketPromedio";

export const RendimientoDiarioAsesorPage = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    listarRendiemiento();
  }, []);

  const listarRendiemiento = async () => {
    try {
      const response = await listarRendimientoPorAsesor();
      setVentas(response);
    } catch (error) {
      console.log(error);
    }
  };

  
  const agruparPorSemana = (ventas: Venta[]) => {
  const semanas: Record<string, Venta[]> = {};

  ventas.forEach((venta) => {
    const fecha = new Date(venta.fecha);
    const dia = fecha.getDay();

    // Ignorar domingos
    if (dia === 0) return;

    // Calcular el lunes de esa semana
    const fechaInicioSemana = new Date(fecha);
    fechaInicioSemana.setDate(fecha.getDate() - (dia - 1)); // lunes
    fechaInicioSemana.setHours(0, 0, 0, 0);
    const clave = fechaInicioSemana.toISOString().slice(0, 10);

    if (!semanas[clave]) {
      semanas[clave] = [];
    }
    semanas[clave].push(venta);
  });

  return Object.entries(semanas).sort(
    ([fechaA], [fechaB]) =>
      new Date(fechaA).getTime() - new Date(fechaB).getTime()
  );
};
  const ventasPorSemana = agruparPorSemana(ventas);
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Rendimiento Diario por Asesor
      </Typography>

      {ventasPorSemana.map(([semana, ventasSemana], index) => (
        <div key={index} style={{ marginBottom: 40 }}>
          <Typography variant="h6" gutterBottom>
            Semana iniciando: {semana}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cantidad Lentes</TableCell>
                  <TableCell>Antireflejos</TableCell>
                  <TableCell>Progresivos</TableCell>
                  <TableCell>Segundo Par</TableCell>
                  <TableCell>LC</TableCell>
                  <TableCell>Entregas</TableCell>
                  <TableCell>Ticket</TableCell>
                  <TableCell>Monto Total</TableCell>
                  <TableCell>Atenciones</TableCell>
                  <TableCell>Ticket promedio</TableCell>
                  <TableCell>Tasa de conversion</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ventasSemana.map((venta, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {mostrarEnDia(venta.fecha)} - {venta.fecha}
                    </TableCell>
                    <TableCell>{venta.cantidadLente}</TableCell>
                    <TableCell>{venta.antireflejos}</TableCell>
                    <TableCell>{venta.progresivos}</TableCell>
                    <TableCell>{venta.segundoPar}</TableCell>
                    <TableCell>{venta.lc}</TableCell>
                    <TableCell>{venta.entregas}</TableCell>
                    <TableCell>{venta.ticket}</TableCell>
                    <TableCell>
                      {venta.montoTotalVentas.toLocaleString()}
                    </TableCell>
                    <TableCell>{venta.atenciones}</TableCell>
                    <TableCell>
                      {ticketPromedio(venta.ticket, venta.montoTotalVentas)}
                    </TableCell>
                    <TableCell>
                      {tasaDeConversion(venta.ticket, venta.atenciones)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce(
                      (acc, item) => acc + item.cantidadLente,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce(
                      (acc, item) => acc + item.antireflejos,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce(
                      (acc, item) => acc + item.progresivos,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce(
                      (acc, item) => acc + item.segundoPar,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce((acc, item) => acc + item.lc, 0)}
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce((acc, item) => acc + item.entregas, 0)}
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce((acc, item) => acc + item.ticket, 0)}
                  </TableCell>
                  <TableCell>
                    {ventasSemana
                      .reduce((acc, item) => acc + item.montoTotalVentas, 0)
                      .toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {ventasSemana.reduce(
                      (acc, item) => acc + item.atenciones,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {ticketPromedio(
                      ventasSemana.reduce((acc, item) => acc + item.ticket, 0),
                      ventasSemana.reduce(
                        (acc, item) => acc + item.montoTotalVentas,
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {tasaDeConversion(
                      ventasSemana.reduce((acc, item) => acc + item.ticket, 0),
                      ventasSemana.reduce(
                        (acc, item) => acc + item.atenciones,
                        0
                      )
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};
