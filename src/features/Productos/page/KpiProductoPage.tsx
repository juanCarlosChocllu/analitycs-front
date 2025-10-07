import { useEffect, useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { BuscadorProductos } from "../components/BuscadorProducto";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TableSortLabel,
} from "@mui/material";
import type { kpiProductosI } from "../interface/productos";
import { kpiProductos } from "../service/productoService";
import { porcentaje } from "../../app/util/porcentaje";
import { DetallleProductoKpiModal } from "../modal/DetallleProductoKpiModal";
import { Loader } from "../../app/components/loader/Loader";

export const KpiProductoPage = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [kpiData, setKpiData] = useState<kpiProductosI[]>([]);
  const [rubro, setRubro] = useState<string>();
  const [idSucursal, setIdSucursal] = useState<string>();
  const [sucursalNombre, setSucursalNombre] = useState<string>();
  const [open, setOpen] = useState(false);
  const [loader, setLoader]= useState(false)
  const [orderBy, setOrderBy] = useState<keyof kpiProductosI>("sucursal");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    kpi();
  }, [filtro]);

  const kpi = async () => {
    try {
      setLoader(true)
      const response = await kpiProductos(filtro);
      setKpiData(response);
        setLoader(false)
    } catch (error) {
        setLoader(false)

    }
  };

  const handleSort = (property: keyof kpiProductosI) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderBy(property);
    setOrderDirection(isAsc ? "desc" : "asc");
  };

  const sortedData = [...kpiData].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ padding: 2 }}>
      <BuscadorProductos filtro={filtro} setFiltro={setFiltro} />

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        KPI por Rubro y Sucursal
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="tabla de KPI">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "sucursal"}
                  direction={orderBy === "sucursal" ? orderDirection : "asc"}
                  onClick={() => handleSort("sucursal")}
                >
                  <strong>Sucursal</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "rubro"}
                  direction={orderBy === "rubro" ? orderDirection : "asc"}
                  onClick={() => handleSort("rubro")}
                >
                  <strong>Rubro</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "cantidad"}
                  direction={orderBy === "cantidad" ? orderDirection : "asc"}
                  onClick={() => handleSort("cantidad")}
                >
                  <strong>Cantidad</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <strong>Participación</strong>
              </TableCell>
              <TableCell>
                <strong>Detalle</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sucursal}</TableCell>
                <TableCell>{row.rubro}</TableCell>
                <TableCell>{row.cantidad}</TableCell>
                
                <TableCell>
                
                  {porcentaje(
                    row.cantidad,
                    kpiData.reduce((a, i) => a + i.cantidad, 0)
                  )}{" "}
                  %
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIdSucursal(row.idSucursal);
                      setRubro(row.rubro);
                      setOpen(true);
                      setSucursalNombre(row.sucursal);
                    }}
                  >
                    Detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                <strong>{kpiData.reduce((a, i) => a + i.cantidad, 0)}</strong>
              </TableCell>
              <TableCell>
                <strong>100 %</strong>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {open && rubro && sucursalNombre && idSucursal && (
        <DetallleProductoKpiModal
          open={open}
          setOpen={setOpen}
          rubro={rubro}
          sucursal={idSucursal}
          sucursalNombre={sucursalNombre}
          filtros={filtro}
        />
      )}
      {loader && <Loader/>}
    </Box>
  );
};
