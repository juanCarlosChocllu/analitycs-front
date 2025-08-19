import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Container,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import { listarAsesorSucursal } from '../service/asesorService';
import type { asesorSucursalI } from '../interface/asesorSucursal';



export const InicioAsesor = () => {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [sucursalActual, setSucursalActual] = useState('');
  const [conectado, setConectado] = useState(false);
  const [sucursales, setSucursales] = useState<asesorSucursalI[]>([]);
  // Datos del asesor (simulado)
  const asesor = {
    nombre: 'Juan Pérez',
    correo: 'juan.perez@empresa.com',
    foto: 'https://i.pravatar.cc/100?img=3',
  };

  const handleSucursalChange = (event: any) => {
    setSucursalSeleccionada(event.target.value);
  };

  const handleConectar = () => {
    if (sucursalSeleccionada) {
      setSucursalActual(sucursalSeleccionada);
      setConectado(true);
    } else {
      alert('Por favor selecciona una sucursal.');
    }
  };

  const handleCambiarSucursal = () => {
    setConectado(false);
    setSucursalSeleccionada('');
  };

  useEffect(
    () => {
    
    (async()=>{
        try {
            const response = await listarAsesorSucursal()
            console.log(response);
            
            setSucursales(response)
            
        } catch (error) {
            console.log(error);
            
        }
    })()
    
  }, [])
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          {/* Info del asesor */}
          <Avatar
            src={asesor.foto}
            alt={asesor.nombre}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {asesor.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {asesor.correo}
          </Typography>
          <Divider sx={{ width: '100%', marginY: 2 }} />

          {!conectado ? (
            <>
              <FormControl fullWidth>
                <InputLabel id="sucursal-label">Selecciona una Sucursal</InputLabel>
                <Select
                  labelId="sucursal-label"
                  value={sucursalSeleccionada}
                  label="Selecciona una Sucursal"
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
                onClick={handleConectar}
              >
                Conectarse
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" color="primary">
                Conectado a: {sucursalActual}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCambiarSucursal}
              >
                Cambiar Sucursal
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
