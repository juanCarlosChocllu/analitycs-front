import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography
} from "@mui/material";
import { Trash2, AlertCircle } from "lucide-react";
import { eliminarUsuarios, listarUsuarios } from "../services/serviceUsuario";
import type { Usuario } from "../interfaces/usuario.interface";



// Constantes

type DireccionOrden = 'asc' | 'desc';
type CampoOrdenable = 'nombre' | 'apellidos' | 'username' | 'rol';

interface TablaUsuarioProps {
  isRefresh: boolean;
}

export const TablaUsuario: React.FC<TablaUsuarioProps> = ({ isRefresh }) => {
  const [usuarios, cambiarUsuarios] = useState<Usuario[]>([]);
  const [cargando, cambiarEstadoCarga] = useState(false);
  const [error, cambiarError] = useState<string | null>(null);
  const [usuarioEliminando, cambiarUsuarioEliminando] = useState<string | null>(null);
  
  const [campoOrden, cambiarCampoOrden] = useState<CampoOrdenable>('nombre');
  const [direccionOrden, cambiarDireccionOrden] = useState<DireccionOrden>('asc');

  const cargarUsuarios = useCallback(async () => {
    cambiarEstadoCarga(true);
    cambiarError(null);
    
    try {
      const respuesta = await listarUsuarios();
      
      if (respuesta && Array.isArray(respuesta)) {
        cambiarUsuarios(respuesta);
      } else {
        throw new Error('Formato de respuesta inválido');
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      cambiarError('Error al cargar los usuarios');
      cambiarUsuarios([]);
    } finally {
      cambiarEstadoCarga(false);
    }
  }, []);

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios, isRefresh]);
  const eliminarUsuario = useCallback(async (idUsuario: string) => {
    if (!idUsuario || usuarioEliminando) return;

    cambiarUsuarioEliminando(idUsuario);
    
    try {
      const respuesta = await eliminarUsuarios(idUsuario);
      
      if (respuesta?.status === 200) {
        cambiarUsuarios(usuariosAnteriores => 
          usuariosAnteriores.filter(usuario => usuario._id !== idUsuario)
        );
      } else {
        throw new Error('Error al eliminar usuario');
      }
    } catch (err) {

      cambiarError('Error al eliminar el usuario');
    } finally {
      cambiarUsuarioEliminando(null);
    }
  }, [usuarioEliminando]);

  // Manejar ordenamiento
  const manejarOrdenamiento = useCallback((campo: CampoOrdenable) => {
    const esCampoActual = campoOrden === campo;
    const nuevaDireccion: DireccionOrden = esCampoActual && direccionOrden === 'asc' ? 'desc' : 'asc';
    
    cambiarCampoOrden(campo);
    cambiarDireccionOrden(nuevaDireccion);
  }, [campoOrden, direccionOrden]);

  // Obtener todos los usuarios ordenados (sin paginación)
  const usuariosFinales = useMemo(() => {
    return [...usuarios].sort((a, b) => {
      const valorA = a[campoOrden]?.toLowerCase() || '';
      const valorB = b[campoOrden]?.toLowerCase() || '';
      
      if (direccionOrden === 'asc') {
        return valorA.localeCompare(valorB);
      } else {
        return valorB.localeCompare(valorA);
      }
    });
  }, [usuarios, campoOrden, direccionOrden]);

  // Crear encabezado ordenable
  const crearEncabezadoOrdenable = (campo: CampoOrdenable, etiqueta: string) => (
    <TableSortLabel
      active={campoOrden === campo}
      direction={campoOrden === campo ? direccionOrden : 'asc'}
      onClick={() => manejarOrdenamiento(campo)}
    >
      {etiqueta}
      {campoOrden === campo && (
        <Box component="span" sx={{ 
          position: 'absolute',
          clip: 'rect(0 0 0 0)',
          width: 1,
          height: 1,
          overflow: 'hidden'
        }}>
          {direccionOrden === 'desc' ? 'ordenado descendente' : 'ordenado ascendente'}
        </Box>
      )}
    </TableSortLabel>
  );

  // Componente de carga
  const ComponenteCarga = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <CircularProgress size={40} />
      <Typography variant="h6" sx={{ ml: 2 }}>
        Cargando usuarios...
      </Typography>
    </Box>
  );

  // Componente de error
  const ComponenteError = () => (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <AlertCircle size={48} color="#f44336" />
      <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
        {error}
      </Alert>
      <Button variant="contained" onClick={cargarUsuarios}>
        Reintentar
      </Button>
    </Box>
  );

  // Renderizado principal
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%', 
      bgcolor: 'grey.50',
      minHeight: '100vh',
      p: { xs: 2, sm: 4, lg: 6 }
    }}>
      <Box sx={{ width: '90%', maxWidth: '1200px' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          sx={{ 
            mb: 4, 
            color: '#374152', 
            fontWeight: 600,
            textTransform: 'uppercase'
          }}
        >
          Gestión de Usuarios
        </Typography>

        {error && <ComponenteError />}
        
        {cargando && <ComponenteCarga />}
        
        {!cargando && !error && (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'start' }}>
                      {crearEncabezadoOrdenable('nombre', 'Nombre')}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'start' }}>
                      {crearEncabezadoOrdenable('apellidos', 'Apellidos')}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'start' }}>
                      {crearEncabezadoOrdenable('username', 'Usuario')}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'start' }}>
                      {crearEncabezadoOrdenable('rol', 'Rol')}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'start' }}>
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {usuariosFinales.map((usuario) => {
                    const estaEliminando = usuarioEliminando === usuario._id;
                    
                    return (
                      <TableRow key={usuario._id} hover>
                        <TableCell >{usuario.nombre}</TableCell>
                        <TableCell>{usuario.apellidos}</TableCell>
                        <TableCell>{usuario.username}</TableCell>
                        <TableCell>{usuario.rol}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Trash2 size={16} />}
                            onClick={() => eliminarUsuario(usuario._id)}
                            disabled={estaEliminando}
                            sx={{ textTransform: 'none' }}
                          >
                            {estaEliminando ? 'Eliminando...' : 'Eliminar'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </Box>
  );
};