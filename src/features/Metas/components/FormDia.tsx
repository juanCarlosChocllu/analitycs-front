import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler} from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { getEmpresas, getSucursalesPorEmpresa } from '../../app/service/appService';
import { v4 as uuid } from 'uuid';
import { Box, Button, Chip, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Aperture, BadgeCheck, Building2, CalendarDays, CheckCircleIcon, SaveIcon, Store, VenetianMask } from 'lucide-react';
import { crearDias } from '../services/metasServices';
import type { Data, DiaData } from '../interfaces/DiaData.interface';
import { useNavigate } from 'react-router';


const TIPO = ['DOMINGO', 'FERIADO'];
const ESTADO = ['HABIL', 'INHABIL'];



interface Empresa {
  _id: string;
  nombre: string;
}

interface Sucursal {
  _id: string;
  nombre: string;
}

interface DiaEntry {
  uuid: string;
  nombre: string;
  empresa: string;
  sucursal: string;
  tipo: string;
  estado: string;
  dia: string;
  nombreEmpresa: string;
  nombreSucursal: string;
}

// Tipos de entrada del formulario
interface FormInputs {
  nombre: string;
  tipo: string;
  estado: string;
  empresa: string;
  sucursal: string;
  dia: string;
}

const diasFormatDate = (dateString: string) => {
  return dayjs(dateString).format('DD/MM/YYYY');
};

export default function FormDia() {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      nombre: '',
      tipo: '',
      estado: '',
      empresa: '',
      sucursal: '',
      dia: '',
    },
  });

  const [dias, setDias] = useState<DiaEntry[]>([]);
  const [disableNombre, setDisableNombre] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const tipoValue = watch('tipo');

  useEffect(() => {
    if (TIPO.includes(tipoValue)) {
      setDisableNombre(true);

    } else {
      setDisableNombre(false);

    }
  }, [tipoValue, setValue, watch]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const nombreEmpresa = obtenerNombreEmpresa(data.empresa);
    const nombreSucursal = obtenerNombreSucursal(data.sucursal);
    const newDia: DiaEntry = {
      uuid: uuid(),
      nombre: data.nombre,
      empresa: data.empresa,
      sucursal: data.sucursal,
      tipo: data.tipo,
      estado: data.estado,
      dia: data.dia,
      nombreEmpresa: nombreEmpresa || '',
      nombreSucursal: nombreSucursal || '',
    };
    setDias((prev) => [...prev, newDia]);
    setMensaje('Día registrado temporalmente. Haz clic en Guardar para confirmar.');
  };

  const guardar = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Verificar que dias tenga elementos antes de acceder al índice 0
    if (dias.length === 0) {
   
      return;
    }
    
    const formattedDias: DiaData[] = dias.map(({ sucursal, dia, estado }) => ({
      sucursal,
      dia: dayjs(dia).toDate(), 
      estado,
    }));
    
    const { nombre, tipo } = dias[0];
    const requestData: Data = {
      nombre,
      tipo,
      data: formattedDias, 
    };

    console.log("requestData: ",requestData);

    try {
      await crearDias(requestData); 
      setMensaje('Días guardados exitosamente!');
      setDisableNombre(false);
      reset();
      navigate('/dias/listar');
    } catch (error) {
      console.error('Error saving days:', error);
      setMensaje('Error al guardar los días'); 
    }
  };

  const obtenerEmpresas = async () => {
    try {
      const response = await getEmpresas();
      setEmpresas(response);
    } catch (error) {
      console.error('Error al obtener empresas:', error);
    }
  };

  const obtenerSucursales = async (empresa: string) => {
    try {
      const response = await getSucursalesPorEmpresa(empresa);
      setSucursales(response);
    } catch (error) {
      console.error('Error al obtener sucursales:', error);
    }
  };

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  useEffect(() => {
    obtenerSucursales(watch('empresa'));
  }, [watch('empresa')]);


  const obtenerNombreEmpresa =(empresa: string): string => {
    const nombreEmpresa = empresas.find((item) => item._id === empresa)?.nombre;
    return nombreEmpresa || '';
  };

  const obtenerNombreSucursal =(sucursal: string): string => {
    const nombreSucursal = sucursales.find((item) => item._id === sucursal)?.nombre;
    return nombreSucursal || '';
  };

  const handleRemove = (uuid: string) => {
    const updatedDias = dias.filter((item) => item.uuid !== uuid);
    setDias(updatedDias);
    if (updatedDias.length <= 0) {
      setDisableNombre(false);
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case 'habil': return '#10B981';
      case 'inhabil': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case 'feriado': return '🟠';
      case 'domingo': return '🔵';
      default: return '⚪';
    }
  };

  return (
    <div className=" bg-gray-50 md:p-6 ">
      <div className="max-w-7xl mx-auto">
        <Fade in={true} timeout={800}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                  <CalendarDays className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Registro de Día
                </h2>
                <p className="text-gray-500 mt-2">Complete los campos para registrar un nuevo día</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nombre */}
                <div className="group">
                  <label htmlFor="nombre" className="flex items-center text-gray-700 font-medium mb-2">
                    <VenetianMask className="mr-2 text-blue-500" fontSize="small" />
                    Nombre
                  </label>
                  <div className="relative">
                    <input
                      disabled={disableNombre}
                      {...register('nombre', {
                        required: 'El nombre es requerido',
                      })}
                      id="nombre"
                      type="text"
                      placeholder="Ingrese el nombre"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50 group-hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* Tipo */}
                <div className="group">
                  <label htmlFor="tipo" className="flex items-center text-gray-700 font-medium mb-2">
                    <Aperture className="mr-2 text-purple-500" fontSize="small" />
                    Tipo
                  </label>
                  <select
                    id="tipo"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-gray-50/50 group-hover:border-gray-300 cursor-pointer"
                    {...register('tipo', {
                      validate: (value) => {
                        if (!value) {
                          return 'Seleccione un tipo';
                        }
                        return true;
                      },
                    })}
                  >
                    <option value="" disabled>Seleccione el tipo</option>
                    {TIPO.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {getTipoIcon(tipo)} {tipo}
                      </option>
                    ))}
                  </select>
                  {errors.tipo && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.tipo.message}
                    </p>
                  )}
                </div>

                {/* Estado */}
                <div className="group">
                  <label htmlFor="estado" className="flex items-center text-gray-700 font-medium mb-2">
                    <BadgeCheck className="mr-2 text-green-500" fontSize="small" />
                    Estado
                  </label>
                  <select
                    id="estado"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50/50 group-hover:border-gray-300 cursor-pointer"
                    {...register('estado', {
                      validate: (value) => {
                        if (!value) {
                          return 'Seleccione un estado';
                        }
                        return true;
                      },
                    })}
                  >
                    <option value="" disabled>Seleccione el estado</option>
                    {ESTADO.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                  {errors.estado && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.estado.message}
                    </p>
                  )}
                </div>

                {/* Empresa */}
                <div className="group">
                  <label htmlFor="empresa" className="flex items-center text-gray-700 font-medium mb-2">
                    <Building2 className="mr-2 text-indigo-500" fontSize="small" />
                    Empresa
                  </label>
                  <select
                    id="empresa"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-gray-50/50 group-hover:border-gray-300 cursor-pointer"
                    {...register('empresa', {
                      validate: (value) => {
                        if (!value) {
                          return 'Seleccione una empresa';
                        }
                        return true;
                      },
                    })}
                  >
                    <option value="" disabled>Seleccione la empresa</option>
                    {empresas.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.empresa && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.empresa.message}
                    </p>
                  )}
                </div>

                {/* Sucursal */}
                <div className="group">
                  <label htmlFor="sucursal" className="flex items-center text-gray-700 font-medium mb-2">
                    <Store className="mr-2 text-orange-500" fontSize="small" />
                    Sucursal
                  </label>
                  <select
                    {...register('sucursal', {
                      validate: (value) => {
                        if (!value) {
                          return 'Seleccione una sucursal';
                        }
                        return true;
                      },
                    })}
                    id="sucursal"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 group-hover:border-gray-300 cursor-pointer"
                  >
                    <option value="" disabled>Seleccione la sucursal</option>
                    {sucursales.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.sucursal && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.sucursal.message}
                    </p>
                  )}
                </div>

                {/* Día */}
                <div className="group">
                  <label htmlFor="dia" className="flex items-center text-gray-700 font-medium mb-2">
                    <CalendarDays className="mr-2 text-teal-500" fontSize="small" />
                    Fecha
                  </label>
                  <input
                    {...register('dia', {
                      validate: (value) => {
                        if (!value) {
                          return 'Seleccione una fecha';
                        }
                        return true;
                      },
                    })}
                    id="dia"
                    type="date"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-gray-50/50 group-hover:border-gray-300 cursor-pointer"
                  />
                  {errors.dia && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.dia.message}
                    </p>
                  )}
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    <span className="flex items-center justify-center">
                      <SaveIcon className="mr-2" />
                      Registrar Día
                    </span>
                  </button>
                </div>
              </form>

              {mensaje && (
                <Fade in={Boolean(mensaje)} timeout={500} >
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-center text-green-700 font-medium flex items-center justify-center">
                      <CheckCircleIcon className="mr-2 text-green-600" />
                      {mensaje}
                    </p>
                  </div>
                </Fade>
              )}
            </div>

          {/* Tabla de días registrados - Columna más ancha */}
          {dias.length > 0 && (
              <div className="xl:col-span-3 h-full overflow-hidden">
                <Fade in={true} timeout={1000}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      background: '#fff',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Header fijo */}
                    <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <Typography 
                            variant="h6" 
                            component="h3" 
                            sx={{ 
                              fontWeight: 700,
                              background: 'linear-gradient(135deg, #1f2937 0%, #4f46e5 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              mb: 0.5
                            }}
                          >
                            Días Registrados
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {dias.length} registro{dias.length !== 1 ? 's' : ''} temporal{dias.length !== 1 ? 'es' : ''}
                          </Typography>
                        </div>
                        <Chip 
                          label={`${dias.length} items`} 
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: '#e5e7eb',
                            color: '#6b7280',
                            fontWeight: 600
                          }}
                        />
                      </div>
                    </Box>

                    {/* Tabla con scroll */}
                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                      <TableContainer sx={{ height: '100%', overflowY: 'auto' }}>
                        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="tabla de días">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700, color: '#374151', py: 2, bgcolor: '#f8fafc', fontSize: '0.875rem' }}>
                                Nombre
                              </TableCell>
                              <TableCell sx={{ fontWeight: 700, color: '#374151', py: 2, bgcolor: '#f8fafc', fontSize: '0.875rem' }}>
                                Empresa
                              </TableCell>
                              <TableCell sx={{ fontWeight: 700, color: '#374151', py: 2, bgcolor: '#f8fafc', fontSize: '0.875rem' }}>
                                Sucursal
                              </TableCell>
                              <TableCell sx={{ fontWeight: 700, color: '#374151', py: 2, bgcolor: '#f8fafc', fontSize: '0.875rem' }}>
                                Tipo
                              </TableCell>
                              <TableCell sx={{ fontWeight: 700, color: '#374151', py: 2, bgcolor: '#f8fafc', fontSize: '0.875rem' }}>
                                Estado
                              </TableCell>
                              <TableCell sx={{ fontWeight: 700, color: '#374151', py: 2, bgcolor: '#f8fafc', fontSize: '0.875rem' }}>
                                Fecha
                              </TableCell>
                              <TableCell align="center" sx={{ fontWeight: 700, color: '#374151', py: 2, bgcolor: '#f8fafc', fontSize: '0.875rem' }}>
                                Acción
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dias.map((item) => (
                              <TableRow 
                                key={item.uuid} 
                                sx={{ 
                                  '&:hover': { 
                                    bgcolor: '#f8fafc',
                                    transition: 'all 0.2s ease'
                                  },
                                  '&:nth-of-type(even)': {
                                    bgcolor: 'rgba(248, 250, 252, 0.3)'
                                  }
                                }}
                              >
                                <TableCell sx={{ py: 2, fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-2">
                                      <VenetianMask size={12} className="text-indigo-600" />
                                    </div>
                                    <span className="truncate max-w-[120px]">{item.nombre}</span>
                                  </div>
                                </TableCell>
                                <TableCell sx={{ py: 2, color: '#4b5563', fontSize: '0.875rem' }}>
                                  <span className="truncate max-w-[120px] block">{item.nombreEmpresa}</span>
                                </TableCell>
                                <TableCell sx={{ py: 2, color: '#4b5563', fontSize: '0.875rem' }}>
                                  <span className="truncate max-w-[120px] block">{item.nombreSucursal}</span>
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                  <Chip 
                                    label={`${getTipoIcon(item.tipo)} ${item.tipo}`}
                                    size="small"
                                    sx={{
                                      bgcolor: '#ede9fe',
                                      color: '#7c3aed',
                                      fontWeight: 600,
                                      fontSize: '0.75rem',
                                      height: '24px',
                                      '& .MuiChip-label': { px: 1.5 }
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                  <Chip 
                                    label={item.estado}
                                    size="small"
                                    sx={{
                                      bgcolor: `${getStatusColor(item.estado)}15`,
                                      color: getStatusColor(item.estado),
                                      fontWeight: 600,
                                      fontSize: '0.75rem',
                                      height: '24px',
                                      '& .MuiChip-label': { px: 1.5 }
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ py: 2, color: '#4b5563', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                  {diasFormatDate(item.dia)}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 2 }}>
                                  <Tooltip title="Eliminar registro" arrow>
                                    <IconButton
                                      onClick={() => handleRemove(item.uuid)}
                                      sx={{
                                        color: '#ef4444',
                                        bgcolor: '#fef2f2',
                                        width: '32px',
                                        height: '32px',
                                        '&:hover': {
                                          bgcolor: '#fee2e2',
                                          transform: 'scale(1.1)'
                                        },
                                        transition: 'all 0.2s ease'
                                      }}
                                      size="small"
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>

                    {/* Footer fijo con botón */}
                    <Box sx={{ p: 3, borderTop: '1px solid #f1f5f9', flexShrink: 0 }}>
                      <div className="flex justify-center">
                        <Button
                          onClick={guardar}
                          variant="contained"
                          sx={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            fontWeight: 600,
                            py: 1.5,
                            px: 3,
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                            fontSize: '0.875rem',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                              transform: 'translateY(-1px)'
                            },
                            transition: 'all 0.3s ease'
                          }}
                          startIcon={<SaveIcon fontSize="small" />}
                        >
                          Guardar Todos los Días
                        </Button>
                      </div>
                    </Box>
                  </Paper>
                </Fade>
              </div>
            )}
          </div>
        </Fade>
      </div>
    </div>
  );
 
}