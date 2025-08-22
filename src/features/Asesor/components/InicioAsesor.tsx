import  { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import {
  asignarSucursal,
  listarAsesorSucursal,
} from "../service/asesorService";
import type { asesorSucursalI } from "../interface/asesorSucursal";

export const InicioAsesor = () => {
  const [sucursales, setSucursales] = useState<asesorSucursalI[]>([]);
  const [asesor, setAsesor] = useState<string>("");

  const handleSucursalChange = (event: any) => {
    const asesor = event.target.value;
    setAsesor(asesor);
  };

  const btnIngresar = async () => {
    try {
      const response = await asignarSucursal(asesor);
      if (response.status == 200) {
        window.location.href = "/rendimiento/diario";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await listarAsesorSucursal();
        setSucursales(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Divider sx={{ width: "100%", marginY: 2 }} />

          <>
            <FormControl fullWidth>
              <InputLabel id="sucursal-label">
                Selecciona una Sucursal
              </InputLabel>
              <Select
                labelId="sucursal-label"
                label="Selecciona una Sucursal"
                value={asesor}
                onChange={handleSucursalChange}
              >
                {sucursales.map((item) => (
                  <MenuItem key={item.asesor} value={item.asesor}>
                    {item.nombreSucursal}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={btnIngresar}
            >
              Ingresar
            </Button>
          </>
        </Box>
      </Paper>
    </Container>
  );
};
