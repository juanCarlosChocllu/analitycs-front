import { Box, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { borrarDia, listarDias } from "../../services/metasServices";
import type { DiaModal } from "../../interfaces/DiaData.interface";
import { DeleteIcon } from "lucide-react";
import dayjs from "dayjs";


interface ModalDiasProps {
  isModalOpen: boolean;
  closeModal: () => void;
  dia: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 900,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto',
};

export const ModalDias = ({ isModalOpen, closeModal, dia }: ModalDiasProps) => {
  const modalTitleId = 'modal-title';
  const modalDescriptionId = 'modal-description';
  const [actulizar, setActualizar] = useState(true);
  const [datas, setDatas] = useState<DiaModal[]>([]);
  const [diaName, setDiaName] = useState<Date>();
  useEffect(() => {
    verDias();
  }, []);
  const verDias = async () => {
    try {
      const response = await listarDias(dia);
      const diaName = new Set(response.map((dia) => dia.dia));
      setDiaName(diaName.values().next().value);
      setDatas(response);
    } catch (error) {
      throw error;
    }
  };
  const handleDelete = async (dia: string) => {
    try {
      if (dia) {
         await borrarDia(dia);
        setActualizar(!actulizar);
        refresh();
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  const refresh = () => {
    verDias();
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby={modalTitleId}
      aria-describedby={modalDescriptionId}
    >
      <Box sx={style}>
        <IconButton
          aria-label="cerrar modal"
          onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id={modalTitleId} variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', textTransform: 'uppercase' }}>
          Detalles para el día: {dayjs(diaName).format('dddd, D, MMMM, YYYY')}
        </Typography>
        <Typography id={modalDescriptionId} sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          Aquí se muestran los datos detallados para el día seleccionado.
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', mt: 4 }}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="tabla de datos mejorada">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Sucursal</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Tipo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Fecha</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.map((diaData) => (
                    <TableRow
                      key={diaData._id}
                      hover
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ py: 1.5 }}>
                        <Typography variant="body1">{diaData.sucursal}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">{diaData.tipo}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">{diaData.estado}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">{dayjs(diaData.dia).format('DD/MM/YYYY')}</Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>
                        <Tooltip title="Eliminar entrada" placement="top">
                          <IconButton
                            aria-label="eliminar entrada"
                            onClick={() => handleDelete(diaData._id || '')}
                            sx={{ color: '#ef5350' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Modal>
  )
}
