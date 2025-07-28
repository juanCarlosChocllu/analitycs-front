import { Box, TableSortLabel } from "@mui/material";

export interface EtiquetaOrdenamientoProps {
  campoOrdenadoPor: string;
  tipoOrdenamiento: string;
  crearManejadorOrdenamiento: (campo: string) => void;
  campo: string;
  texto: string;
  TIPO_ORDENAMIENTO: { ASCENDENTE: string; DESCENDENTE: string };
  estiloVisualmenteOculto: React.CSSProperties;
}

export const EtiquetaOrdenamiento: React.FC<EtiquetaOrdenamientoProps> = ({
  campoOrdenadoPor,
  tipoOrdenamiento,
  crearManejadorOrdenamiento,
  campo,
  texto,
  TIPO_ORDENAMIENTO,
  estiloVisualmenteOculto,
}) => (
  <TableSortLabel
    active={campoOrdenadoPor === campo}
    direction={
      campoOrdenadoPor === campo
        ? tipoOrdenamiento
        : TIPO_ORDENAMIENTO.ASCENDENTE
    }
    onClick={() => crearManejadorOrdenamiento(campo)}
  >
    {texto}
    {campoOrdenadoPor === campo ? (
      <Box component="span" sx={estiloVisualmenteOculto}>
        {tipoOrdenamiento === TIPO_ORDENAMIENTO.DESCENDENTE
          ? "ordenado descendente"
          : "ordenado ascendente"}
      </Box>
    ) : null}
  </TableSortLabel>
);