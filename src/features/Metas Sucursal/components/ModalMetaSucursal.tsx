import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { getEmpresas, getSucursalesPorEmpresa } from '../../app/service/appService';
import type { EmpresasI, SucursalI } from '../../app/interfaces/BuscadorI';
import MultiSelectBuscador from '../../app/components/Buscador/SeleccionMultiple';
import type { DataMeta } from '../interfaces/metaSucursal.interfaces';
import dayjs from 'dayjs';
import { crearMetaSucursal } from '../services/metaSucursalService';

interface ModalMetaSucursalProps {
  onClose: () => void;
  setIsRegister: (value: boolean) => void;
}

export const ModalMetaSucursal = ({onClose, setIsRegister}: ModalMetaSucursalProps) => {
  const [monto, setMonto] = useState('');
  const [ticket, setTicket] = useState('');
  const [diasComerciales, setDiasComerciales] = useState('');
  const [empresas, setEmpresas] = useState<EmpresasI[]>();
  const [sucursales, setSucursales] = useState<SucursalI[]>();
  const [fechaInicio, setFechaInicio] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [sucursal, setSucursal] = useState<string[]>([]);
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    obtenerEmpresa();
  }, []);

  useEffect(() => {
    obtenerSucursal(empresa);
  }, [empresa]);

  const obtenerEmpresa = async () => {
    try {
      const response = await getEmpresas();
      setEmpresas(response);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerSucursal = async (idEmpresa: string) => {
    if(!idEmpresa) return;
    try {
      const response = await getSucursalesPorEmpresa(idEmpresa);
      setSucursales(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    if (monto === '' || ticket === '' || diasComerciales === '' || empresa === '' || sucursal.length === 0 || fechaInicio === '' || fechaFin === '') {
      setMensaje('Por favor, complete todos los campos');
      return;
    }
    const data:DataMeta = {
      monto: Number(monto),
      ticket: Number(ticket),
      sucursal,
      fechaInicio: dayjs(fechaInicio).format('YYYY-MM-DD'),
      fechaFin: dayjs(fechaFin).format('YYYY-MM-DD'),
      dias: Number(diasComerciales),
    };
    try {
      const response = await crearMetaSucursal(data);
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
    >
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#2196F3'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
          Registrar Meta Sucursal
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
              label="Monto"
              placeholder="Ingrese el monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Ticket"
              placeholder="Cantidad de Tickets"
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Días comerciales"
              placeholder="Ingrese los días comerciales"
              value={diasComerciales}
              onChange={(e) => setDiasComerciales(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="empresa-select-label">Empresa</InputLabel>
              <Select
                labelId="empresa-select-label"
                value={empresa}
                label="Empresa"
                onChange={(e) => setEmpresa(e.target.value)}
              >
                <MenuItem value="">
                  <em>Seleccione la empresa</em>
                </MenuItem>
                {empresas?.map((empresa) => (
                  <MenuItem key={empresa._id} value={empresa._id}>
                    {empresa.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <MultiSelectBuscador
                label=""
                value={sucursal}
                onChange={(value: string[]) => setSucursal(value)}
                setValue={(value: string[]) => setSucursal(value)}
                placeholder="Seleccione una sucursal"
                options={sucursales || []}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Inicio"
              variant="outlined"
              placeholder="dd/mm/aaaa"
              value={fechaInicio}
              slotProps={{
                inputLabel: {
                  shrink: true,
                  required: true,
                },
              }}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Fin"
              value={fechaFin}
              slotProps={{
                htmlInput: {
                  min: fechaInicio,
                },
                inputLabel: {
                  shrink: true,
                  required: true,
                },
              }}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <p className='text-red-500 text-sm'>{mensaje}</p>
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
  );
};
