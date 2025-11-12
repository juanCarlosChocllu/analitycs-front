import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Checkbox,
  Radio,
  Pagination,
  Stack,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import type {
  AsesorSeleccionadoI,
  AsesorSinUsuario,
} from "../interfaces/usuario.interface";
import {
  extraerApellido,
  extraerNombre,
  generarExcelUsuario,
  generarUsuaurio,
} from "../utils/usuarioUtil";
import { listarAsesorVentas } from "../services/serviceUsuario";

export const ListarAsesor = ({
  setAsesoresSeleccionados,
  setAsesorData,
  setDetalleAsesorSeleccionado,
}: {
  setAsesoresSeleccionados: (asesor: string) => void;
  setDetalleAsesorSeleccionado: (asesor: string) => void;
  setAsesorData?: (data: AsesorSeleccionadoI) => void;
}) => {
  const [asesores, setAsesores] = useState<AsesorSinUsuario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);


  const [detalleAsesor, setDetalleAsesor] = useState<{ [idAsesor: string]: string }>({});


  const [asesorActivo, setAsesorActivo] = useState<string | null>(null);

  const asesoresPorPagina = 10;

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const response = await listarAsesorVentas();
      setAsesores(response);
    } catch (error) {
      console.error(error);
    }
  };

  const asesoresFiltrados = asesores.filter((asesor) =>
    asesor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(asesoresFiltrados.length / asesoresPorPagina);
  const indiceInicial = (paginaActual - 1) * asesoresPorPagina;
  const asesoresPaginados = asesoresFiltrados.slice(
    indiceInicial,
    indiceInicial + asesoresPorPagina
  );

  const cambiarPagina = (_: unknown, nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };


  const toggleSeleccion = (id: string, nombre: string) => {

    const nuevoSeleccionado = asesorActivo === id ? null : id;
    setAsesorActivo(nuevoSeleccionado);

    if (nuevoSeleccionado) {
      const nombreAsesor = extraerNombre(nombre.trim());
      const apellidos = extraerApellido(nombre.trim());
      const usuario = generarUsuaurio(nombreAsesor, apellidos);

      if (setAsesorData) {
        setAsesorData({
          nombres: nombreAsesor,
          apellidos: apellidos,
          usuario: usuario,
        });
      }


      setAsesoresSeleccionados(id);

 
      if (detalleAsesor[id]) {
        setDetalleAsesorSeleccionado(detalleAsesor[id]);
      }
    } else {
   
      setAsesoresSeleccionados("");
      setDetalleAsesorSeleccionado("");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Listado de Asesores
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => generarExcelUsuario(asesores)}
        >
          Descargar Asesores
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
        variant="outlined"
        size="small"
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.light" }}>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Seleccionar
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Sucursal
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {asesoresPaginados.length > 0 ? (
              asesoresPaginados.map((asesor) => {
                const activo = asesorActivo === asesor._id;

                return (
                  <TableRow
                    key={asesor._id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell align="center">
                      <Checkbox
                        checked={activo}
                        onChange={() => toggleSeleccion(asesor._id, asesor.nombre)}
                        color="primary"
                      />
                    </TableCell>

                    <TableCell>{asesor.nombre}</TableCell>

                    <TableCell>
                      <RadioGroup
                        value={detalleAsesor[asesor._id] || ""}
                        onChange={(e) => {
                          const sucursalSeleccionada = e.target.value;
                          setDetalleAsesor((prev) => ({
                            ...prev,
                            [asesor._id]: sucursalSeleccionada,
                          }));
                          setDetalleAsesorSeleccionado(sucursalSeleccionada);
                        }}
                      >
                        {asesor.sucursal.map((suc) => (
                          <Stack
                            key={suc.idDetalle}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <FormControlLabel
                              value={suc.idDetalle}
                              control={
                                <Radio
                                  color="secondary"
                                  disabled={!activo} // 🔹 Solo se activan si el asesor está seleccionado
                                />
                              }
                              label={suc.nombre}
                            />
                          </Stack>
                        ))}
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ color: "text.secondary" }}
                >
                  No se encontraron asesores.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" mt={3}>
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={cambiarPagina}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
};
