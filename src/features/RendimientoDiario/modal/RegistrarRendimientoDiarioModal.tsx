import  { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { registrarRendimientoDiarioI } from '../interface/RendimientoDiario';
import { registrarRendimientoDiarioAsesor } from '../service/RendimientoDiarioService';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const styleButton = {
  textTransform: "none",
  fontWeight: 700,
  borderRadius: 3,
  px: 3,
  py: 1.5,
  bgcolor: "#1E88E5",       // Azul principal vibrante
  color: "#ffffff",         // Texto blanco para contraste
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    bgcolor: "#1565C0",     // Azul más oscuro para hover
    boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.25)",
  },
  "&:active": {
    transform: "scale(0.97)",
    bgcolor: "#0D47A1",     // Azul profundo al presionar
  },
  "&:focusVisible": {
    outline: "none",
    boxShadow: "0 0 0 3px #64B5F6", // Anillo azul claro para focus
  },
  "&.Mui-disabled": {
    bgcolor: "#90CAF9",     // Azul claro deshabilitado
    color: "#E3F2FD",       // Texto azul muy claro
  },
  } as const;



export const RegistrarRendimientoDiarioModal = ({reload,setReload}:{reload:boolean, setReload:(data:boolean) => void}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<registrarRendimientoDiarioI>({
    defaultValues: {
      atenciones: 0,
      segundoPar: 0,
      presupuesto: 0
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: registrarRendimientoDiarioI) => {

    try {
      data.atenciones = Number(data.atenciones)
      data.segundoPar = Number(data.segundoPar)
      data.presupuesto = Number(data.presupuesto)
      await registrarRendimientoDiarioAsesor(data)
      setReload(!reload)
      handleClose();
    } catch (error) {
      const e = error as AxiosError
      console.log(e.status);

      if (e.response?.status === 409) {
        const mensaje = (e.response.data as { message: string }).message;
        toast.error(mensaje)
      }
       if (e.response?.status === 400) {
        const mensaje = (e.response.data as { message: string }).message;
        toast.error(mensaje)
      }

    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />} sx={styleButton}>
        Registrar Rendimiento Diario
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-titulo"  >
        <Box sx={style}>
          <Typography id="modal-titulo" variant="h6" component="h2" mb={2} >
            Registrar Rendimiento Diario
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="atenciones"
              control={control}
              rules={{ required: 'Atenciones es requerido', min: { value: 0, message: 'Debe ser positivo' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Atenciones"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.atenciones}
                  helperText={errors.atenciones ? errors.atenciones.message : ''}
                />
              )}
            />

            <Controller
              name="segundoPar"
              control={control}
              rules={{ required: 'Segundo Par es requerido', min: { value: 0, message: 'Debe ser positivo' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Segundo Par"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.segundoPar}
                  helperText={errors.segundoPar ? errors.segundoPar.message : ''}
                />
              )}
            />
                        <Controller
              name="presupuesto"
              control={control}
              rules={{ required: 'Presupuesto es requerido', min: { value: 0, message: 'Debe ser positivo' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Presupuesto"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.presupuesto}
                  helperText={errors.presupuesto ? errors.presupuesto.message : ''}
                />
              )}
            />

            <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
