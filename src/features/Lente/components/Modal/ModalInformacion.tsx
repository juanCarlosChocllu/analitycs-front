import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Button,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


export interface GenericKpiItem {
  _id: string;
  cantidad: number;
}

export interface TratamientoItem {
  tratamiento: string;
  cantidad: number;
}

export interface AntireflejoData {
  lentes: number;
  tratamiento: TratamientoItem[];
}

export interface InformacionData {
  sucursal?: string;
  asesor?: string;
  antireflejo?: AntireflejoData[];
  progresivos?: GenericKpiItem[];
  ocupacional?: GenericKpiItem[];
}

export interface InformacionProps {
  data: InformacionData;
  onClose: () => void;
}

export const ModalInformacion = ({ data, onClose }: InformacionProps) => {
  const totalLentes = data.antireflejo?.[0]?.lentes || 0;

  const calcularTotal = (arr: GenericKpiItem[] | TratamientoItem[]) =>
    arr.reduce((total, item) => total + item.cantidad, 0);

  const calcularPorcentaje = (cantidad: number) =>
    totalLentes > 0 ? ((cantidad / totalLentes) * 100).toFixed(0) : 0;

  const renderTable = (
    title: string,
    rows?: GenericKpiItem[] | TratamientoItem[],
    idKey: string = "_id"
  ) => {
    if (!rows || rows.length === 0) {
      return null;
    }
    return (
      <Box mt={4} >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'semi-bold' }}>
          {title}
        </Typography>
        <TableContainer component={Paper} elevation={2}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0f2f1', color: '#00786a' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#00786a' }}>{idKey === "tratamiento" ? "Tratamiento" : "Tipo"}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#00786a' }}>Cantidad</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#00786a' }}>Porcentaje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'semi-bold' }}>{(item as any)[idKey]}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'semi-bold', color: '#00786a' }}>{item.cantidad}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'semi-bold', color: '#00786a' }}>{calcularPorcentaje(item.cantidad)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0f2f1', color: '#00786a' }}>Total</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#00786a', backgroundColor: '#e0f2f1' }}>{calcularTotal(rows)}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#00786a', backgroundColor: '#e0f2f1' }}>{calcularPorcentaje(calcularTotal(rows))}%</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#00786a'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
          Información de KPI
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff',
            backgroundColor: '#00786a',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: '#00574b',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: '#00786a' }}>
          {data.sucursal || data.asesor}
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: '#00786a' }}>
          Lentes Totales: {totalLentes}
        </Typography>

        {renderTable("Antireflejos", data.antireflejo?.[0]?.tratamiento, "tratamiento")}

        {renderTable("Progresivos", data.progresivos)}

        {renderTable("Ocupacional", data.ocupacional)}

        <Box mt={4} textAlign="center">
          <Button variant="contained" sx={{ backgroundColor: '#00786a', color: '#fff', borderRadius: '8px' }} onClick={onClose} size="large">
            Cerrar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};