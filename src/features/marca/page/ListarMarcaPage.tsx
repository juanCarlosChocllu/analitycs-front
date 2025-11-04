import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { MarcaI } from "../interface/marcaInterface";
import { asignarCategoria, listarMarca } from "../service/marcarService";
import { generarExcelMarca } from "../utils/marcaUtil";
import { CargarMasivaExcelModal } from "../modal/CargarMasivaExcelModal";

export const ListarMarcaPage = () => {
  const [marcas, setMarcas] = useState<MarcaI[]>([]);
  const [filtroNombre, setFiltroNombre] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [reload, setreload] = useState<boolean>(false);
  useEffect(() => {
    listar();
  }, [reload]);

  const listar = async () => {
    try {
      const response = await listarMarca();
      setMarcas(response);
    } catch (error) {
      console.log(error);
    }
  };

  const marcasFiltradas = useMemo(() => {
    return marcas.filter((marca) =>
      (marca.nombre || "").toLowerCase().includes(filtroNombre.toLowerCase())
    );
  }, [marcas, filtroNombre]);

  const marcasPaginadas = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return marcasFiltradas.slice(start, end);
  }, [marcasFiltradas, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Marcas
      </Typography>
     <Button onClick={()=> generarExcelMarca(marcas)}>Descargar excel</Button> 
     <CargarMasivaExcelModal/>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filtroNombre}
        onChange={(e) => {
          setFiltroNombre(e.target.value);
          setPage(0); // Reiniciar a la primera página al buscar
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Categoría</strong>
              </TableCell>
              <TableCell>
                <strong>Acccion</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marcasPaginadas.map((marca) => (
              <TableRow key={marca._id}>
                <TableCell>{marca._id}</TableCell>
                <TableCell>{marca.nombre}</TableCell>
                <TableCell>{marca.categoria}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      categoria
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      onChange={async (event) => {
                        try {
                          const response = await asignarCategoria(
                            event.target.value as string,
                            marca._id
                          );
                          if (response) {
                            setreload(!reload);
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      <MenuItem value="VIP">VIP</MenuItem>
                      <MenuItem value="INTERMEDIA">INTERMEDIA</MenuItem>
                      <MenuItem value="ECONOMICA">ECONOMICA</MenuItem>
                      <MenuItem value="REPLICA">REPLICA</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
            {marcasPaginadas.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Paginador */}
        <TablePagination
          component="div"
          count={marcasFiltradas.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>
    </div>
  );
};
