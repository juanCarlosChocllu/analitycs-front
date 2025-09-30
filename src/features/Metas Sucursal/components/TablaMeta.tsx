import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import "dayjs/locale/es";

import type { DatosFormulario } from "../interfaces/filtroDetalle";
import type { MetasSucursales } from "../interfaces/metaSucursal.interfaces";
import { borrarMetas, listarMetasScursales } from "../services/metaSucursalService";

dayjs.locale("es");

// Constants
const ROWS_PER_PAGE_OPTIONS = [10, 20, 30, 50, 100] as const;
const INITIAL_ROWS_PER_PAGE = 20;

const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

const SORTABLE_FIELDS = {
  SUCURSAL: "sucursal",
  TICKET: "ticket", 
  MONTO: "monto",
  DIAS_COMERCIALES: "dias",
  FECHA_INICIO: "fechaInicio",
  FECHA_FIN: "fechaFin",
  FECHA_CREACION: "fecha",
} as const;

// Types
type SortOrder = typeof SORT_ORDER[keyof typeof SORT_ORDER];
type SortableField = typeof SORTABLE_FIELDS[keyof typeof SORTABLE_FIELDS];

interface TablaMetaProps {
  filtro: DatosFormulario;
  isRefresh: boolean;
}

export const TablaMeta: React.FC<TablaMetaProps> = ({ filtro, isRefresh }) => {
  // State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_ROWS_PER_PAGE);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.ASC);
  const [sortField, setSortField] = useState<SortableField>(SORTABLE_FIELDS.SUCURSAL);
  const [metas, setMetas] = useState<MetasSucursales[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Fetch metas data
  const fetchMetas = useCallback(async () => {
    try {
      setLoading(true);
      const response = await listarMetasScursales(filtro, rowsPerPage, currentPage);
      console.log(response);
      
      setMetas(response.data);
      setTotalPages(response.paginas);
    } catch (error) {
      console.error("Error fetching metas:", error);
    } finally {
      setLoading(false);
    }
  }, [filtro, rowsPerPage, currentPage]);

  // Effects
  useEffect(() => {
    fetchMetas();
  }, [fetchMetas, isRefresh]);

  // Event handlers
  const handlePageChange = (_: unknown, newPage: number): void => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleDeleteMeta = async (id: string) => {
    try {
      const response = await borrarMetas(id);
      if (response.status === 200) {
        await fetchMetas(); // Refetch data after successful deletion
      }
    } catch (error) {
      console.error("Error deleting meta:", error);
    }
  };

  // Sorting logic
  const compareDescending = (
    a: MetasSucursales, 
    b: MetasSucursales, 
    field: SortableField
  ): number => {
    const valueA = a[field as keyof MetasSucursales];
    const valueB = b[field as keyof MetasSucursales];

    if (valueB < valueA) return -1;
    if (valueB > valueA) return 1;
    return 0;
  };

  const getComparator = (order: SortOrder, field: SortableField) => {
    return order === SORT_ORDER.DESC
      ? (a: MetasSucursales, b: MetasSucursales) => compareDescending(a, b, field)
      : (a: MetasSucursales, b: MetasSucursales) => -compareDescending(a, b, field);
  };

  const handleSort = (field: SortableField): void => {
    const isAscending = sortField === field && sortOrder === SORT_ORDER.ASC;
    const newOrder = isAscending ? SORT_ORDER.DESC : SORT_ORDER.ASC;
    
    setSortOrder(newOrder);
    setSortField(field);
  };

  // Memoized sorted data
  const sortedMetas = useMemo(
    () => [...metas].sort(getComparator(sortOrder, sortField)),
    [metas, sortOrder, sortField]
  );

  // Helper to create sort labels
  const createSortLabel = (field: SortableField, label: string) => (
    <TableSortLabel
      active={sortField === field}
      direction={sortField === field ? sortOrder : SORT_ORDER.ASC}
      onClick={() => handleSort(field)}
    >
      {label}
      {sortField === field && (
        <Box
          component="span"
          sx={{
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1,
          }}
        >
          {sortOrder === SORT_ORDER.DESC ? "sorted descending" : "sorted ascending"}
        </Box>
      )}
    </TableSortLabel>
  );

  // Format date helper
  const formatDate = (date: string | null | undefined): string => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "";
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: { xs: 2, sm: 4, lg: 6 }, bgcolor: "grey.50" }}>
      <Typography 
        variant="h4" 
        component="h1" 
        textAlign="center" 
        sx={{ mb: 4, color: "grey.700", textTransform: "uppercase" }}
      >
        Metas de Sucursales
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {createSortLabel(SORTABLE_FIELDS.SUCURSAL, "Sucursal")}
                </TableCell>
                <TableCell align="center">
                  {createSortLabel(SORTABLE_FIELDS.TICKET, "Ticket")}
                </TableCell>
                <TableCell align="center">
                  {createSortLabel(SORTABLE_FIELDS.MONTO, "Monto")}
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 150 }}>
                  {createSortLabel(SORTABLE_FIELDS.DIAS_COMERCIALES, "Días Comerciales")}
                </TableCell>
                <TableCell align="center">
                  {createSortLabel(SORTABLE_FIELDS.FECHA_INICIO, "Fecha Inicio")}
                </TableCell>
                <TableCell align="center">
                  {createSortLabel(SORTABLE_FIELDS.FECHA_FIN, "Fecha Fin")}
                </TableCell>
                <TableCell align="center">
                  {createSortLabel(SORTABLE_FIELDS.FECHA_CREACION, "Fecha Creación")}
                </TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMetas.map((meta) => (
                <TableRow key={meta._id} hover>
                  <TableCell align="center">{meta.sucursal}</TableCell>
                  <TableCell align="center">{meta.ticket}</TableCell>
                  <TableCell align="center">{meta.monto}</TableCell>
                  <TableCell align="center">{meta.dias}</TableCell>
                  <TableCell align="center">{formatDate(meta.fechaInicio.toString())}</TableCell>
                  <TableCell align="center">{formatDate(meta.fechaFin.toString())}</TableCell>
                  <TableCell align="center">{formatDate(meta.fecha.toString())}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Trash2 size={16} />}
                      onClick={() => handleDeleteMeta(meta._id)}
                      sx={{ textTransform: "none" }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={metas.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage="Filas por página:" 
          labelDisplayedRows={({ from, to }) => `${from}-${to} de ${totalPages}`}
        />
      </Paper>
    </Box>
  );
};