import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { crearUsuarios } from "../services/serviceUsuario";

interface Props {
  onClose: () => void;
  setIsRegister: (value: boolean) => void;
}

export const ModalUsuario: React.FC<Props> = ({ onClose, setIsRegister }) => {
  const [nombre, setNombre] = useState<string>('');
  const [apellidos, setApellidos] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rol, setRol] = useState<string>('');

  const handleRegister = async () => {
    try {
      const response = await crearUsuarios({
        nombre,
        apellidos,
        username,
        password,
        rol
      });
      console.log('response', response);
      if (response.status === 201) {
        setIsRegister(true);
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog
    open
    onClose={onClose}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#2196F3'}}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
        Registrar Usuario
      </Typography>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#fff',
          backgroundColor: '#2196F3',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: '#1976D2',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Nombre"
            placeholder="Ingrese el nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Apellidos"
            placeholder="Ingrese los apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Username"
            placeholder="Ingrese el username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            placeholder="Ingrese el password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="rol-select-label">Rol</InputLabel>
            <Select
              labelId="rol-select-label"
              value={rol}
              label="Rol"
              onChange={(e) => setRol(e.target.value)}
            >
              <MenuItem value="">
                <em>Seleccione el rol</em>
              </MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="user">Usuario</MenuItem>
            </Select>
          </FormControl>
        </Grid>       
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cerrar
        </Button>
        <Button onClick={handleRegister} variant="contained" color="primary">
          Registrar
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
  )
}
