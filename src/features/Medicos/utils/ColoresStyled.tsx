import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TableContainer } from "@mui/material";
export const BlueCell = styled(TableCell)(({}) => ({
    backgroundColor: '#e3f2fd',
    fontWeight: 500,
  }));
  
  export const GreenCell = styled(TableCell)(({}) => ({
    backgroundColor: '#e8f5e8',
    fontWeight: 500,
  }));
  
  export const VariationCell = styled(TableCell)<{ variation: number }>(({ variation }) => ({
    backgroundColor: variation > 0 ? '#c8e6c9' : variation < 0 ? '#ffcdd2' : '#fff3e0',
    fontWeight: 500,
  }));
  
  export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[1],
  }));
  
  export const HeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: theme.spacing(2),
  }));