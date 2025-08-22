export interface filtroDetalle {
    fechaInicio: string;
    fechaFin: string;
    flagVenta: string;
    comisiona: boolean | null;
    tipoVenta: string[];
}

export interface DatosFormulario {
  empresa: string;
  sucursal: string;
  fechaInicio: string;
  fechaFin: string;
  fechaMetaInicio: string;
  fechaMetaFin: string;
  usarFiltroFechaCreacion?: boolean;
  usarFiltroFechaMetas?: boolean;
}
