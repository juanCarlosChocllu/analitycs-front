import { useState } from "react";
import { Box } from "@mui/material";
import type { CotizacionI } from "../interface/Cotizacion";
import { GraficoCotizacion } from "./GraficoCotizacion";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";

export const ListarCotizacion = ({
  cotizacion,
}: {
  cotizacion: CotizacionI[];
}) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  const columns: GridColDef[] = [
    { field: "sucursal", headerName: "Sucursal", flex: 1 },
    { field: "asesor", headerName: "Asesor", flex: 2 },
    { field: "codigo", headerName: "Código", flex: 1 },
    { field: "noCompra", headerName: "No compra", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "id_venta", headerName: "ID venta", flex: 1 },
    { field: "fecha", headerName: "Fecha", flex: 1 },
  ];
  const rows = cotizacion.map((cot) => ({
    id: cot._id,
    sucursal: cot.sucursal,
    asesor: cot.asesor,
    codigo: cot.codigo,
    noCompra: cot.noCompra,
    total: cot.total1 + cot.total2,
    id_venta: cot.id_venta,
    fecha: new Date(cot.fechaCotizacion).toLocaleDateString(),
  }));

  return (
    <Box sx={{ padding: 2 }}>
      <GraficoCotizacion cotizacion={cotizacion} />
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20, 50]}
        disableRowSelectionOnClick

      />
    </Box>
  );
};
