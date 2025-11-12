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
  TextField,
  TablePagination,
} from "@mui/material";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { AsignarSucursalModal } from "../../Asesor/modal/AsignarSucursalModal";
import { eliminarUsuarios, listarAsesores } from "../services/serviceUsuario";
import { useNavigate } from "react-router";
import { CargarAsesorModal } from "../modal/CargaAsesorModal";

export const ListarAsesorPage = () => {
  const [reload, setReload] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<UsuarioAsesor[]>([]);
  const [filters, setFilters] = useState({
    nombre: "",
    apellidos: "",
    username: "",
    rol: "",
    sucursal: "",
  });

  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const navigate = useNavigate();

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


  const usuariosFiltrados = usuarios.filter((usuario) => {
    return (
      usuario.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      usuario.apellidos.toLowerCase().includes(filters.apellidos.toLowerCase()) &&
      usuario.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      usuario.rol.toLowerCase().includes(filters.rol.toLowerCase()) &&
      (usuario.sucursales?.some((s) =>
        s.sucursal.toLowerCase().includes(filters.sucursal.toLowerCase())
      ) ||
        filters.sucursal === "")
    );
  });

  // Paginación
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const usuariosPaginados = usuariosFiltrados.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleFilterChange = (campo: string, valor: string) => {
    setFilters({ ...filters, [campo]: valor });
    setPage(0);
  };

  return (
    <Container maxWidth={false}>
      <Toaster position="top-center" reverseOrder={false} />

      <Box mb={2}>
        <Button
          variant="contained"
          color="warning"
          startIcon={<PlusCircle size={20} />}
          href="/asesor/registrar"
        >
          Registrar
        </Button>
        <CargarAsesorModal />
      </Box>

      <TableContainer>
        <Table size="small"> 
          <TableHead>
            {/* Fila de títulos */}
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Nombres</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Apellidos</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Usuario</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Rol</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Sucursal</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="bold">Acciones</Typography>
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar nombre"
                  value={filters.nombre}
                  onChange={(e) => handleFilterChange("nombre", e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar apellido"
                  value={filters.apellidos}
                  onChange={(e) => handleFilterChange("apellidos", e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar usuario"
                  value={filters.username}
                  onChange={(e) => handleFilterChange("username", e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar rol"
                  value={filters.rol}
                  onChange={(e) => handleFilterChange("rol", e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar sucursal"
                  value={filters.sucursal}
                  onChange={(e) => handleFilterChange("sucursal", e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {usuariosPaginados.map((usuario) => (
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
                    {usuario.sucursales?.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0, px: 1 }}>
                        {item.sucursal}
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
                    <AsignarSucursalModal
                      asesorId={usuario.asesor}
                      usuario={usuario._id}
                      reload={reload}
                      setReload={setReload}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/editarAsesor/${usuario._id}`)}
                    >
                      <Pencil size={18} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(usuario._id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}

            {usuariosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary">No se encontraron resultados</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[20, 60,100]}
          component="div"
          count={usuariosFiltrados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>
    </Container>
  );
};
