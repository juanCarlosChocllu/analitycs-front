import { useEffect, useState } from "react";
import type { UsuarioAsesor } from "../interfaces/usuario.interface";

import toast, { Toaster } from "react-hot-toast";

import {
  Button,

  Chip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
} from "@mui/material";

import {  Pencil, PlusCircle, Trash2 } from "lucide-react";
import { EditarUsuarioPage } from "./EditarUsuarioPage";
import { AsignarSucursalModal } from "../../Asesor/modal/AsignarSucursalModal";
import { eliminarUsuarios, listarAsesores } from "../services/serviceUsuario";

export const ListarAsesorPage = () => {
   const [reload, sertReload] = useState<boolean>(false);
  const [monstrarEdicion, setMostrarEdicion] = useState<boolean>(false);
  const [usuarioEditar, setUsuarioEditar] = useState<UsuarioAsesor>({
    _id: "",
    nombre: "",
    apellidos: "",
    username: "",
    password: "",
    rol: "usuario",
    asesor:"",
    flag: "activo",
    sucursales: [],
  });

  const [usuarios, setUsuarios] = useState<UsuarioAsesor[]>([]);

  const handleDelete = async (id: string) => {
    const response = await eliminarUsuarios(id);
    if (response?.status === 200) {
      toast.success("Usuario eliminado exitosamente");
      listar();
    } else {
      toast.error("Error al eliminar el usuario");
    }
  };

  useEffect(() => {
    listar();
  }, [reload]);

  const listar = async () => {
    try {
      const response = await listarAsesores();

      
      setUsuarios(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <Container  maxWidth={false}>
      <Toaster position="top-center" reverseOrder={false} />
     
       
          <Box >
            <Button
              variant="contained"
              color="warning"
              startIcon={<PlusCircle size={20} />}
              href="/asesor/registrar"
            >
              Registrate
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight="bold">Nombres</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Apellidos</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Usuario</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Rol</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Sucursal</Typography></TableCell>
                  
                  <TableCell align="center"><Typography fontWeight="bold">Acciones</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario._id} hover>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.apellidos}</TableCell>
                    <TableCell>{usuario.username}</TableCell>
                    <TableCell>
                      <Chip
                        label={usuario.rol}
                        color={usuario.rol === "ADMINISTRADOR" ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <List dense>
                        {usuario.sucursales && usuario.sucursales.map((item, index) => (
                          <ListItem key={index} sx={{ py: 0, px: 1 }}>
                            {item.sucursal}
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                    
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
                        <AsignarSucursalModal asesorId={usuario.asesor} usuario={usuario._id} reload={reload} setReload={sertReload}/>

                        <IconButton
                          color="primary"
                          onClick={() => {
                            setUsuarioEditar(usuario);
                            setMostrarEdicion(true);
                          }}
                        >
                          <Pencil size={18} />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleDelete(usuario._id)}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {monstrarEdicion && (
            <EditarUsuarioPage
              usuario={usuarioEditar}
              mostrarEdicion={monstrarEdicion}
              setMostrarEdicion={setMostrarEdicion}
            />
          )}
        
     
    </Container>
  );
};
