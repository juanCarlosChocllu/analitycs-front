import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { useEffect, useState } from "react";
import { kpiMaterial } from "../services/lenteServices";
import type { KpiMaterialI } from "../interface/material";
import { Loader } from "../../app/components/loader/Loader";

export const KpiMaterialPage = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [data, setData] = useState<KpiMaterialI[]>([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await kpiMaterial(filtro);
        setData(response);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error(error);
      }
    })();
  }, [filtro]);

  return (
    <Box p={2}>
      <BuscadorBase filtro={filtro} setFiltro={setFiltro} />

      {data.map(
        (sucursalData) =>
          sucursalData && (
            <Box key={sucursalData.sucursal} mt={4}>
              <Typography variant="h5" mb={1}>
                KPI Material - Sucursal: {sucursalData.sucursal}
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Total lentes: {sucursalData.lentes}
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Material</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Porcentaje (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sucursalData.materiales.map((mat) => (
                      <TableRow key={mat.nombre}>
                        <TableCell>{mat.nombre}</TableCell>
                        <TableCell align="right">{mat.cantidad}</TableCell>
                        <TableCell align="right">{mat.porcentaje} %</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )
      )}
      {loader && <Loader/>}
    </Box>
  );
};
