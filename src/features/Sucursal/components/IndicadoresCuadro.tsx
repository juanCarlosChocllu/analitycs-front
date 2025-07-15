
import { Grid, Paper, Typography, Box } from "@mui/material";

interface Props {
  sucursal: number;
  totalVentas: number;
  tcPromedio: number;
  ventaPorDia: number;
  unidadPorTicket: number;
  ticketPromedio: number;
}

export const IndicadoresCuadro = ({
  sucursal,
  totalVentas,
  tcPromedio,
  ventaPorDia,
  unidadPorTicket,
  ticketPromedio,
}: Props) => {
  const indicadores = [
    { title: "CANT. SUCURSALES", value: sucursal },
    { title: "TOTAL VENTAS (Bs)", value: totalVentas },
    { title: "TC PROMEDIO", value: tcPromedio },
    { title: "VENTA X DÍA", value: ventaPorDia },
    { title: "UNIDAD POR TICKET", value: unidadPorTicket },
    { title: "TICKET PROMEDIO", value: ticketPromedio },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {indicadores.map(({ title, value }) => (
          <Grid key={title}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {typeof value === "number"
                  ? value.toLocaleString(undefined, { minimumFractionDigits: 2 })
                  : value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

