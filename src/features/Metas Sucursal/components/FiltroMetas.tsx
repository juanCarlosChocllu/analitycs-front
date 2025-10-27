import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
  useTheme,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { FiltroFecha } from './FiltroFecha';
import type { EmpresasI, SucursalI } from '../../app/interfaces/BuscadorI';
import { getEmpresas, getSucursalesPorEmpresa } from '../../app/service/appService';
import type { DatosFormulario } from '../interfaces/filtroDetalle';


interface FiltroMetasProps {
  setFiltro: React.Dispatch<React.SetStateAction<DatosFormulario>>;
}

interface EstadoFormulario {
  empresa: string;
  sucursal: string;
  usarFiltroFechaCreacion: boolean;
  fechaInicio: Date;
  fechaFin: Date;
  usarFiltroFechaMetas: boolean;
  fechaMetaInicio: Date;
  fechaMetaFin: Date;
}

export default function FiltroMetas({ setFiltro }: FiltroMetasProps) {
  const tema = useTheme();
  const [empresas, setEmpresas] = useState<EmpresasI[]>();
  const [sucursales, setSucursales] = useState<SucursalI[]>();
  const [datosFormulario, setDatosFormulario] = useState<EstadoFormulario>({
    empresa: '',
    sucursal: '',
    usarFiltroFechaCreacion: false,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    usarFiltroFechaMetas: false,
    fechaMetaInicio: new Date(),
    fechaMetaFin: new Date(),
  });

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  useEffect(() => {
    if (datosFormulario.empresa) {
      obtenerSucursales();
    } else {
      setSucursales([]);
    }
  }, [datosFormulario.empresa]);


  const obtenerEmpresas = async () => {
    try {
      const response = await getEmpresas();
      setEmpresas(response);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerSucursales = async () => {
    try {
      const response = await getSucursalesPorEmpresa(datosFormulario.empresa);
      setSucursales(response);
    } catch (error) {
      console.error(error);
    }
  };

  const manejarCambio = (campo: string, valor: string | boolean) => {
    setDatosFormulario(prev => {
      const isDateField =
        campo === 'fechaInicio' ||
        campo === 'fechaFin' ||
        campo === 'fechaMetaInicio' ||
        campo === 'fechaMetaFin';

      let finalValue: any = valor;
      if (isDateField && typeof valor === 'string' && valor) {
        const [year, month, day] = valor.split('-').map(num => parseInt(num, 10));
        finalValue = new Date(Date.UTC(year, month - 1, day));
      }

      const newFormulario = {
        ...prev,
        [campo]: finalValue,
      };

      if (campo === 'empresa') {
        newFormulario.sucursal = '';
      }

      return newFormulario;
    });
  };

  const buscar = () => {
    const filtro: DatosFormulario = {
      empresa: datosFormulario.empresa,
      sucursal: datosFormulario.sucursal,
      fechaInicio: datosFormulario.usarFiltroFechaCreacion
        ? formatDateForInput(datosFormulario.fechaInicio)
        : '',
      fechaFin: datosFormulario.usarFiltroFechaCreacion
        ? formatDateForInput(datosFormulario.fechaFin)
        : '',
      fechaMetaInicio: datosFormulario.usarFiltroFechaMetas
        ? formatDateForInput(datosFormulario.fechaMetaInicio)
        : '',
      fechaMetaFin: datosFormulario.usarFiltroFechaMetas
        ? formatDateForInput(datosFormulario.fechaMetaFin)
        : '',
    };

    setFiltro(filtro);
  };

  const formatDateForInput = (date: Date | string): string => {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return '';
  };

  return (
    <Box sx={{ maxWidth: '85%', margin: '0 auto', px: 2, py: 4 }}>
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon />
              <Typography variant="h4">
                Buscar Información
              </Typography>
            </Box>
          }
          sx={{ pb: 0 }}
        />

        <CardContent sx={{ pt: 3, '& > *:not(:last-child)': { mb: 3 } }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon sx={{ height: 16, width: 16, color: tema.palette.primary.main }} />
                  Empresa
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    value={datosFormulario.empresa}
                    onChange={(e) => manejarCambio('empresa', e.target.value as string)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Selecciona una empresa</MenuItem>
                    {empresas?.map((empresa) => (
                      <MenuItem key={empresa._id} value={empresa._id}>
                        {empresa.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ height: 16, width: 16, color: tema.palette.primary.main }} />
                  Sucursal
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    value={datosFormulario.sucursal}
                    onChange={(e) => manejarCambio('sucursal', e.target.value as string)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Selecciona una sucursal</MenuItem>
                    {sucursales?.map((sucursal) => (
                      <MenuItem key={sucursal._id} value={sucursal._id}>
                        {sucursal.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <Stack spacing={1}>
                <FiltroFecha
                  etiqueta="Filtrar por Fecha de Creación"
                  activo={datosFormulario.usarFiltroFechaCreacion || false}
                  fechaInicio={formatDateForInput(datosFormulario.fechaInicio)}
                  fechaFin={formatDateForInput(datosFormulario.fechaFin)}
                  onToggle={() => manejarCambio('usarFiltroFechaCreacion', !datosFormulario.usarFiltroFechaCreacion)}
                  onFechaInicioChange={(fecha) => manejarCambio('fechaInicio', fecha)}
                  onFechaFinChange={(fecha) => manejarCambio('fechaFin', fecha)}
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <Stack spacing={1}>
                <FiltroFecha
                  etiqueta="Filtrar por Fecha de Metas"
                  activo={datosFormulario.usarFiltroFechaMetas || false}
                  fechaInicio={formatDateForInput(datosFormulario.fechaMetaInicio)}
                  fechaFin={formatDateForInput(datosFormulario.fechaMetaFin)}
                  onToggle={() => manejarCambio('usarFiltroFechaMetas', !datosFormulario.usarFiltroFechaMetas)}
                  onFechaInicioChange={(fecha) => manejarCambio('fechaMetaInicio', fecha)}
                  onFechaFinChange={(fecha) => manejarCambio('fechaMetaFin', fecha)}
                />
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
            <Button
              onClick={buscar}
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 500,
              }}
            >
              Buscar Tareas
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
