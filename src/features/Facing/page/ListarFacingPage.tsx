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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarFacing } from "../service/facingService";
import type { buscadorFacingI, listarFacingI } from "../interface/facing";
import { BuscadorFacing } from "../components/BuscadorFacing";

export const ListarFacingPage = () => {
  const [data, setData] = useState<listarFacingI[]>([]);
  const [filtro, setFiltro] = useState<buscadorFacingI>();
  const navigate = useNavigate();

  useEffect(() => {
    listar();
  }, [filtro]);

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

  return (
    <Box sx={{ p: 3 }}>
      <BuscadorFacing setBuscadorFacing={setFiltro} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Listado de Facing</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/registrar/facing")}
        >
          Registrar
        </Button>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
