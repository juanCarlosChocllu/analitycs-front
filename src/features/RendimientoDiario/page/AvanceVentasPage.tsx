import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState, useRef, useCallback } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { listarAvanceVentas } from "../service/RendimientoDiarioService";
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";
import dayjs from "dayjs";
import type { SucursalTransformada } from "../interface/avanceVentas";
import ResumenSeguimineto from "../components/resumen/ResumenSeguimiento";
import { resumenTotales} from "../utils/rendimientoUtil";



export const AvanceVentasPage = () => {
  // Eliminado estado de hover para evitar re-render por movimiento del mouse
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [allData, setAllData] = useState<SucursalTransformada[]>([]);
  const [tableData, setTableData] = useState<SucursalTransformada[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const workerRef = useRef<Worker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const CHUNK_SIZE = 50;

  const getChunkedData = useCallback((sourceData: SucursalTransformada[], pageNum: number) => {
    let hasMoreData = false;
    const newChunk = sourceData.map(suc => {
      const endIndex = pageNum * CHUNK_SIZE;
      if (suc.data.length > endIndex) {
        hasMoreData = true;
      }
      return {
        ...suc,
        data: suc.data.slice(0, endIndex)
      };
    });
    return { chunk: newChunk, hasMore: hasMoreData };
  }, [CHUNK_SIZE]);

  useEffect(() => {
    // Initialize the worker
    workerRef.current = new Worker(new URL('../utils/avanceVentas.worker.ts', import.meta.url), { type: 'module' });

    workerRef.current.onmessage = (e: MessageEvent<SucursalTransformada[]>) => {
      const fullData = e.data;
      setAllData(fullData);
      
      const initialData = getChunkedData(fullData, 1);
      setTableData(initialData.chunk);
      setHasMore(initialData.hasMore);
      setPage(1);

      setLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [getChunkedData]);

  useEffect(() => {
    obtenerAvanceVentas();
  }, [filtro]);

  const loadMoreData = useCallback(() => {
    if (!hasMore || loading || loadingMore) return;
  
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextData = getChunkedData(allData, nextPage);
      setTableData(nextData.chunk);
      setHasMore(nextData.hasMore);
      setPage(nextPage);
      setLoadingMore(false);
    }, 500);
  }, [allData, getChunkedData, hasMore, loading, loadingMore, page]);

  const obtenerAvanceVentas = async () => {
    try {
      setLoading(true);
      setTableData([]);
      setAllData([]);
      setPage(1);
      setHasMore(true);
      const response = await listarAvanceVentas(filtro);
      workerRef.current?.postMessage(response);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log("tableData - AvanceVentasPage: ",tableData)

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 200) {
        loadMoreData();
      }
    }
  }, [loadMoreData]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);



  // ---------- Transform API -> Local structure (robust date parsing) ----------
  
  return (
    <Box ref={containerRef} sx={{ width: "95%", borderRadius: "5px", m: "0 auto", p: "10px", height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : tableData && tableData.length > 0 ? (
          <>
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
              <ResumenSeguimineto data={resumenTotales(suc.data)} />
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
                    const isEven = rowIndex % 2 === 0;

                    return (
                      <TableRow
                        key={`${suc.sucursal}-${row.fecha}-${rowIndex}`}
                        sx={{
                          backgroundColor: isEven ? "#fafafa" : "transparent",
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
          {loadingMore && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          </>
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 4 }}>
            No hay datos para mostrar
          </Typography>
        )}
      </Box>
  
    </Box>
  );
};
