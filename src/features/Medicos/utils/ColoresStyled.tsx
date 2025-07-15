import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TableContainer } from "@mui/material";
export const BlueCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.action.disabledBackground,
  fontWeight: 500,
}));

export const GreenCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.action.disabledBackground,
  fontWeight: 500,
}));

export const VariationCell = styled(TableCell)<{ variation: number }>(({ theme, variation }) => ({
  backgroundColor: variation > 0 ? '#c8e6c9' : variation < 0 ? '#ffcdd2' : theme.palette.action.disabledBackground,
  fontWeight: 500,
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.action.disabledBackground,
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(2),
}));