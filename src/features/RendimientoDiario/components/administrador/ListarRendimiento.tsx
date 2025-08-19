import { useEffect, useState } from "react";
import { BuscadorBase } from "../../../app/components/Buscador/BuscadorBase";
import type { filtroBuscadorI } from "../../../app/interfaces/BuscadorI";
import { listarRendimientoAsesor } from "../../service/RendimientoDiarioService";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Divider,
} from "@mui/material";
import type { DatosAsesor } from "../../interface/RendimientoDiario";
import { formatFecha } from "../../../app/util/formatFecha";
import { mostrarEnDia } from "../../utils/mostrarDia";
import { tasaDeConversion, ticketPromedio } from "../../../app/util/ticketPromedio";

export const ListarRendimiento = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [datos, setDatos] = useState<DatosAsesor[]>([]);

  useEffect(() => {
    listarRendimiento();
  }, [filtro]);

  const listarRendimiento = async () => {
    try {
      const response = await listarRendimientoAsesor(filtro);
      setDatos(response);
      console.log("re", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BuscadorBase setFiltro={setFiltro} filtro={filtro} />
      <Box sx={{ mt: 4, px: 2 }}>
        <Grid container spacing={3}>
          {datos.map((asesorData, idx) => (
            <Grid  key={idx}>
              <Card
                sx={{
                  backgroundColor: "#f5f7fa",
                  boxShadow: 3,
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {asesorData.asesor}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1.5 }} color="text.secondary">
                    Sucursal: {asesorData.sucursal}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#e3e9f0" }}>
                        <TableCell><strong>Fecha</strong></TableCell>
                        <TableCell><strong>Lentes</strong></TableCell>
                        <TableCell><strong>Entregas</strong></TableCell>
                        <TableCell><strong>Progresivos</strong></TableCell>
                        <TableCell><strong>Antireflejos</strong></TableCell>
                        <TableCell><strong>Monto</strong></TableCell>
                        <TableCell><strong>Tickets</strong></TableCell>
                         <TableCell><strong>Atenciones</strong></TableCell>
                         <TableCell><strong>Ticket Promedio</strong></TableCell>
                         <TableCell><strong>Tasa de coneversion</strong></TableCell>
                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {asesorData.ventas.map((venta, i) => (
                        <TableRow key={i} hover>
                          <TableCell>{venta.fecha}</TableCell>
                          <TableCell>{venta.cantidadLente}</TableCell>
                          <TableCell>{venta.entregas}</TableCell>
                          <TableCell>{venta.progresivos}</TableCell>
                          <TableCell>{venta.antireflejos}</TableCell>
                          <TableCell>Bs {venta.montoTotalVentas}</TableCell>
                          <TableCell>{venta.ticket}</TableCell>
                          <TableCell>{venta.atenciones}</TableCell>
                          <TableCell>Bs { ticketPromedio(venta.ticket, venta.montoTotalVentas)}</TableCell>
                           <TableCell> { tasaDeConversion(venta.ticket,4)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
