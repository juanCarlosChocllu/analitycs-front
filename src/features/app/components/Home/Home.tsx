import React, { useContext, useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { perfil } from '../../../Usuario/services/serviceUsuario';
import type { Usuario } from '../../../Usuario/interfaces/usuario.interface';
import { ModalHome } from './ModalHome';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { AutenticacionContext } from '../../context/AuntenticacionProvider';

export const Home: React.FC = () => {
  const {rol}=useContext(AutenticacionContext)
  const [profile, setProfile] = useState<Usuario>({
    _id: '',
    nombre: '',
    apellidos: '',
    username: '',
    rol: '',
    flag: '',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  

  useEffect(() => {
    obtenerPerfil();
  }, []);

  const obtenerPerfil = async () => {
    try {
      const response = await perfil();
      setProfile(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isRegister) {
      toast.success('Contraseña cambiada correctamente');
      setIsRegister(false);
    }
  }, [isRegister]);

  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 4 } }}>
      <Toaster position="top-center" reverseOrder={false} />

      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: 3,
            p: { xs: 3, md: 5 },
            mb: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  background: 'linear-gradient(to bottom right, #52A3FF, #4E38F5)',
                  borderRadius: '50%',
                  p: 2,
                }}
              >
                <User color="white" size={32} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  Perfil de Usuario
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestiona tu información personal
                </Typography>
              </Box>
            </Box>

            {
              rol =='ADMINISTRADOR'&& <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src="logoAnaytics.svg" alt="Logo" style={{ width: 60, height: 60 }} />
              <Typography variant="h6" fontWeight={600}>
                Analitycs
              </Typography>
            </Box>
            }
          </Box>
        </Box>

        {/* Información */}
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: 3,
            p: { xs: 4, md: 6 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 6,
          }}
        >
          {/* Información Personal */}
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Información Personal
            </Typography>

            <TextField
              label="Nombre"
              value={profile.nombre}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Apellidos"
              value={profile.apellidos}
              fullWidth
              margin="normal"
              disabled
            />
          </Box>

          {/* Información de Cuenta */}
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Información de Cuenta
            </Typography>

            <TextField
              label="Username"
              value={profile.username}
              fullWidth
              margin="normal"
              disabled
            />

            <TextField
              label="Rol"
              select
              value={profile.rol}
              fullWidth
              margin="normal"
              disabled
            >
              <MenuItem value={profile.rol}>{profile.rol}</MenuItem>
            </TextField>

            <TextField
              label="Estado"
              select
              value={profile.flag}
              fullWidth
              margin="normal"
              disabled
            >
              <MenuItem value={profile.flag}>{profile.flag}</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* Footer / Acción */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' },
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowPasswordModal(true)}
          >
            Cambiar Contraseña
          </Button>
        </Box>

        {showPasswordModal && (
          <ModalHome
            onClose={() => setShowPasswordModal(false)}
            setIsRegister={setIsRegister}
            id={profile._id}
          />
        )}
      </Box>
    </Box>
  );
};
