import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eliminarFacing, listarFacing } from "../service/facingService";
import type { buscadorFacingI, listarFacingI } from "../interface/facing";
import { BuscadorFacing } from "../components/BuscadorFacing";
import { CookingPot } from "lucide-react";
import { useEstadoReload } from "../../app/zustand/estadosZustand";
import toast, { Toaster } from "react-hot-toast";
import { CargarMasivaFacing } from "../modal/CargaMasivaFacing";

export const ListarFacingPage = () => {
  const { isReloading, triggerReload } = useEstadoReload();
  const [data, setData] = useState<listarFacingI[]>([]);
  const [filtro, setFiltro] = useState<buscadorFacingI>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    listar();
  }, [filtro, isReloading]);

  const listar = async () => {
    try {
      if (filtro) {
        const response = await listarFacing(filtro);
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id: string) => {
    try {
      const response = await eliminarFacing(id);
      if (response.status === 200) {
        toast.success("Registro eliminado");
        triggerReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <Box sx={{ p: 3 }}>
      <Toaster />

      <BuscadorFacing setBuscadorFacing={setFiltro} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Listado de Facing</Typography>
        <Box>
          <a href="/plantilla_facing.xlsx" target="_blank" rel="noopener noreferrer">
  <Button>Plantilla</Button>
</a>
          <CargarMasivaFacing />
          <Button
            variant="contained"
            onClick={() => navigate("/registrar/facing")}
            sx={{ ml: 2 }}
          >
            Registrar
          </Button>
        </Box>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sucursal</TableCell>
              <TableCell>Exhibición</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.sucursal}</TableCell>
                  <TableCell>{item.exhibicion}</TableCell>
                  <TableCell>{item.marca}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>
                    {new Date(item.fechaCreacion).toLocaleString("es-BO", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => eliminar(item._id)}>
                      <CookingPot className="text-red-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Paginador */}
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </Box>
  );
};
