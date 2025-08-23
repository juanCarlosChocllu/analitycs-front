import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
    Close as CloseIcon,
    Visibility,
    VisibilityOff
  } from '@mui/icons-material';
import { cambiarPassword } from "../../../Usuario/services/serviceUsuario";

interface Props {
    onClose: () => void;
    setIsRegister: (value: boolean) => void;
    id: string;
}

export const ModalHome: React.FC<Props> = ({ onClose, setIsRegister, id }) => {

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [mensaje, setMensaje] = useState<string>('');


    const handlePasswordChange = async () => {
        if (passwords.new !== passwords.confirm) {
            setMensaje('Las contraseñas nuevas no coinciden');
            return;
        }
        if (!passwords.new.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)) {
            setMensaje('La contraseña debe tener al menos 8 caracteres y máximo 20, y al menos una mayúscula, una minúscula, un número y un carácter especial');
            return;
        }
        const password = passwords.new;
        try {
            const response = await cambiarPassword(password, id);
            console.log('Contraseña cambiada');
            if(response.status === 200){
                setIsRegister(true);
                onClose();
                setPasswords({ current: '', new: '', confirm: '' });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
  return (
    <Dialog
    open
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    slotProps={{
      paper: {
        sx: {
          borderRadius: 2,
          p: 1,
        },
      },
    }}
  >
    <DialogTitle sx={{ m: 0, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          Cambiar Contraseña
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>

    <DialogContent dividers>
      <Box sx={{ p: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>        
        <TextField
          fullWidth
          label="Nueva Contraseña"
          type={showPasswords.new ? 'text' : 'password'}
          value={passwords.new}
          onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
          placeholder="Ingresa tu nueva contraseña"
          slotProps={{
            inputLabel: { shrink: true },      
            htmlInput: { autoComplete: "new-password" }, 
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                    }
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderWidth: 2,
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Confirmar Contraseña"
          type={showPasswords.confirm ? 'text' : 'password'}
          value={passwords.confirm}
          onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
          placeholder="Confirma tu nueva contraseña"
          slotProps={{
            inputLabel: { shrink: true },      // reemplaza InputLabelProps
            htmlInput: { autoComplete: "new-password" }, // nativo
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                    }
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderWidth: 2,
              },
            },
          }}
        />
      </Box>
      <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
        {mensaje}
      </Typography>
    </DialogContent>

    <DialogActions sx={{ px: 3, py: 2 }}>
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1.5,
          fontWeight: 500,
          textTransform: 'none',
          fontSize: '1rem',
        }}
      >
        Cancelar
      </Button>
      <Button
        onClick={handlePasswordChange}
        variant="contained"
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1.5,
          fontWeight: 500,
          textTransform: 'none',
          fontSize: '1rem',
          background: 'linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #303F9F 90%)',
          },
        }}
      >
        Cambiar
      </Button>
    </DialogActions>
  </Dialog>
  )
}
