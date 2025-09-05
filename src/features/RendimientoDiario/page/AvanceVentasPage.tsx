import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { listarAvanceVentas } from "../service/RendimientoDiarioService";
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";
import dayjs from "dayjs";
import { ordenarPorFecha, transformarDatos } from "../utils/trans";
import type { AvanceVentas, SucursalTransformada } from "../interface/avanceVentas";



export const AvanceVentasPage = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [data, setData] = useState<AvanceVentas[]>([]);
  const [tableData, setTableData] = useState<SucursalTransformada[]>([]);

  useEffect(() => {
    obtenerAvanceVentas();
  }, [filtro]);

  const obtenerAvanceVentas = async () => {
    try {
      const response = await listarAvanceVentas(filtro);
      setData(ordenarPorFecha(response));
      setTableData(transformarDatos(data));

    } catch (error) {
      console.log(error);
    }
  };

  console.log("tableData - AvanceVentasPage: ",tableData)



  // ---------- Transform API -> Local structure (robust date parsing) ----------
  
  return (
    <Box sx={{ width: "95%", borderRadius: "5px", m: "0 auto", p: "10px" }}>
      <BuscadorBase filtro={filtro} setFiltro={setFiltro} />
 {/* Header */}
 <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#001638",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <BarChartIcon />
          Avance de Ventas
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", textTransform: "uppercase", color: "#001638" }}
        >
          Seguimiento diario de metas comerciales
        </Typography>
      </Box>

      {/* Tables by branch */}
      <Box>
        {tableData.map((suc, sucIndex) => (
          <Box key={suc.sucursal + sucIndex} sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#001638",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <BarChartIcon />
              {suc.sucursal}
            </Typography>

            <Box sx={{ overflowX: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ "& th": { backgroundColor: "#001638", color: "white" } }}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon />
                        Días Comerciales
                      </Box>
                    </TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Atendidos</TableCell>
                    <TableCell>Presupuestos</TableCell>
                    <TableCell>Vendidos</TableCell>
                    <TableCell>Entregados</TableCell>
                    <TableCell>Meta x Día Ventas</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AttachMoneyIcon />
                        Meta Actualizada Vendidos
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocalShippingIcon />
                        Meta x Día Entregas
                      </Box>
                    </TableCell>
                    <TableCell>Meta Actualizada Entregas</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {suc.data.map((row, rowIndex) => {
                    const isHovered = hoveredRow === rowIndex;
                    const isEven = rowIndex % 2 === 0;

                    return (
                      <TableRow
                        key={`${suc.sucursal}-${row.fecha}-${rowIndex}`}
                        onMouseEnter={() => setHoveredRow(rowIndex)}
                        onMouseLeave={() => setHoveredRow(null)}
                        sx={{
                          backgroundColor: isHovered ? "#f5f5f5" : isEven ? "#fafafa" : "transparent",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        <TableCell>{row.dias}</TableCell>
                        <TableCell>{dayjs(row.fecha).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{row.atenciones ?? "-"}</TableCell>
                        <TableCell>{row.presupuestos ?? "-"}</TableCell>
                        <TableCell>{row.vendidos ?? "-"}</TableCell>
                        <TableCell>{row.entregadas ?? "-"}</TableCell>

                        {/* Meta x Día Ventas */}
                        <TableCell>
                          <Chip label={row.metaxdiaVenta.toFixed(0)} sx={{ backgroundColor: "#001638", color: "white" }} />
                        </TableCell>

                        {/* Meta Actualizada Vendidos (restante esperado) */}
                        <TableCell>
                          <Chip
                            label={row.metaAcumuladaVendida}
                            sx={{ backgroundColor: "#001638", color: "white" }}
                          />
                        </TableCell>

                        {/* Meta x Día Entregas */}
                        <TableCell>
                          <Chip label={row.metaxdiaEntrega.toFixed(0)} sx={{ backgroundColor: "#001638", color: "white" }} />
                        </TableCell>

                        {/* Meta Actualizada Entregas (restante esperado) */}
                        <TableCell>
                          <Chip
                            label={row.metaAcumuladaEntregada}
                            sx={{ backgroundColor: "#001638", color: "white" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Box>
        ))}
      </Box>
  
    </Box>
  );
};
