import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { useEffect, useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import toast from "react-hot-toast";
import { detalleProductoKpi } from "../service/productoService";
import type { detalleProductoKpiI } from "../interface/productos";
import { porcentaje } from "../../app/util/porcentaje";


export const DetallleProductoKpiModal = ({
  rubro,
  sucursal,
  open,
  setOpen,
  sucursalNombre,
  filtros
}: {
  rubro: string;
  sucursal: string;
  open: boolean;
  sucursalNombre: string;
  setOpen: (v: boolean) => void;
  filtros:filtroBuscadorI
}) => {
  const handleClose = () => setOpen(false);
  const [productoDetalle, setProductoDetalle]= useState<detalleProductoKpiI[]>([])
  useEffect(()=>{
    detalle()
  },[open])

  const detalle = async()=>{
    try {
      const response = await detalleProductoKpi(filtros,sucursal,rubro)
      setProductoDetalle(response)
      
    } catch (error) {
      toast.error(error as string)
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="titulo-modal"
      aria-describedby="descripcion-modal"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxHeight: "80vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <Typography id="titulo-modal" variant="h6" component="h2" gutterBottom>
          Detalle por Marca - {rubro} ({sucursalNombre})
        </Typography>

        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                 <TableCell><strong>Producto</strong></TableCell>
                <TableCell><strong>Marca</strong></TableCell>
                <TableCell align="right"><strong>Cantidad</strong></TableCell>
                <TableCell align="right"><strong>Participacion</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productoDetalle.map((row, index) => (
                <TableRow key={index}>
                   <TableCell>{row.rubro}</TableCell>
                  <TableCell>{row.marca}</TableCell>
                  <TableCell align="right">{row.cantidad}</TableCell>
                  <TableCell align="right">{porcentaje(row.cantidad, productoDetalle.reduce((a,i)=>a + i.cantidad ,0))}%</TableCell>
                </TableRow>
              ))}

                   <TableCell colSpan={2}>Total</TableCell>
                
                  <TableCell align="right">{productoDetalle.reduce((acc ,item)=>  acc + item.cantidad, 0)}</TableCell>
                  <TableCell align="right">100 %</TableCell>
          
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3} textAlign="right">
          <Button variant="outlined" onClick={handleClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
