import { Box, Typography, InputLabel, Button } from "@mui/material";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  getEmpresas,
  getSucursalesPorEmpresa,
  listarTodasLasScursales,
} from "../../app/service/appService";
import type { buscadorFacingI, buscadorFacingProps } from "../interface/facing";

interface Option {
  value: string;
  label: string;
}

export const BuscadorFacing = ({setBuscadorFacing}:buscadorFacingProps) => {
  const hoy = new Date();
  const formatoFecha = hoy.toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(formatoFecha);
  const [fechaFin, setFechaFin] = useState(formatoFecha);
  const [empresas, setEmpresas] = useState<Option[]>([]);
  const [empresa, setEmpresa] = useState<Option>();
  const [sucursales, setSucursales] = useState<Option[]>([]);

  const [sucursalesSeleccionados, setSucursalesSeleccionados] = useState<
    Option[]
  >([]);
  useEffect(() => {
    listarEmpresa();
  }, []);
  const listarEmpresa = async () => {
    try {
      const response = await getEmpresas();
      setEmpresas([
        { label: "TODAS", value: "TODAS" },
        ...response.map((item) => ({ value: item._id, label: item.nombre })),
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerSucursales();
    setSucursalesSeleccionados([]);
  }, [empresa]);

  const obtenerSucursales = async () => {
    try {
      if (empresa && empresa.value != "TODAS") {
        const response = await getSucursalesPorEmpresa(empresa.value);
        setSucursales(
          response.map((item) => ({ value: item._id, label: item.nombre }))
        );
      } else {
        const response = await listarTodasLasScursales();
        setSucursales(
          response.map((item) => ({ value: item._id, label: item.nombre }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuscar = () => {
    const sucursalSelect: string[] = [];
    if (
      empresa &&
      empresa.value != "TODAS" &&
      sucursalesSeleccionados.length > 0
    ) {
      sucursalSelect.push(...sucursalesSeleccionados.map((item) => item.value));
    }
    if (
      empresa &&
      empresa.value != "TODAS" &&
      sucursalesSeleccionados.length <= 0
    ) {
      sucursalSelect.push(...sucursales.map((item) => item.value));
    }
    if (
      empresa &&
      empresa.value == "TODAS" &&
      sucursalesSeleccionados.length <= 0
    ) {
      sucursalSelect.push(...sucursales.map((item) => item.value));
    }
    const data:buscadorFacingI = {
      sucursal: sucursalSelect,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    };
    setBuscadorFacing(data)
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "flex-end",
        mb: 3,
      }}
    >
      {/* Empresa (select simple) */}
      <Box sx={{ minWidth: 200 }}>
        <InputLabel sx={{ fontSize: 12, mb: 0.5 }}>Empresa</InputLabel>
        <Select
          options={empresas}
          value={empresa}
          onChange={(value) => setEmpresa(value as Option)}
          placeholder="Seleccione empresa"
        />
      </Box>

      {/* Sucursal (multi-select) */}
      <Box sx={{ minWidth: 250 }}>
        <InputLabel sx={{ fontSize: 12, mb: 0.5 }}>Sucursal</InputLabel>
        <Select
          isMulti
          options={sucursales}
          value={sucursalesSeleccionados}
          onChange={(value) => setSucursalesSeleccionados(value as Option[])}
          placeholder="Seleccione sucursales"
        />
      </Box>

      {/* Fecha Inicio */}
      <Box>
        <Typography variant="subtitle2">Fecha Inicio</Typography>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          style={{ height: 32, padding: "4px 8px" }}
        />
      </Box>

      {/* Fecha Fin */}
      <Box>
        <Typography variant="subtitle2">Fecha Fin</Typography>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          style={{ height: 32, padding: "4px 8px" }}
        />
      </Box>

      {/* Botón Buscar */}
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuscar}
          sx={{ height: 40 }}
        >
          Buscar
        </Button>
      </Box>
    </Box>
  );
};
