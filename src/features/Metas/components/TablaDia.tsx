import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { CalendarDays, DeleteIcon, } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { borrarDiaNombre, listarNombreDias } from '../services/metasServices';
import type {  NombreDia } from '../interfaces/DiaData.interface';
import { ModalDias } from './modal/ModalDias';

export const TablaDia = () => {
    const [datas, setDatas] = useState<NombreDia[]>([]);
    const [dia, setDia] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const obtenerListaDias = async () => {
        try {
            const response = await listarNombreDias();
       
            const filtarDias = response.filter((dia) => dia.flag === 'nuevo');
            setDatas(filtarDias);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        obtenerListaDias();
    }, []);
    const handleDelete = async (id: string) => {
        try {
            if (id) {
                const response = await borrarDiaNombre(id)
                if (response.status = 201) {
                    refresh()
                }
            }
        } catch (error) {
            console.log(error);

        }

    }

    const refresh = () => {
        obtenerListaDias();
    };
    const handleModal = (id: string) => {
        setIsModalOpen(true)
        setDia(id)
    };
    return (
        <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="tabla de datos mejorada">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Tipo</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datas.map((dia) => (
                                <TableRow
                                    key={dia._id}
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
                                        <Typography variant="body1">{dia.nombre}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 1.5 }}>
                                        <Typography variant="body2" color="text.secondary">{dia.tipo}</Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.5 }}>
                                        <Tooltip title="Ver detalles" placement="top">
                                            <IconButton
                                                aria-label="ver detalles"
                                                onClick={() => handleModal(dia._id)}
                                                sx={{ color: '#1976d2', mr: 1 }}
                                            >
                                                <CalendarDays />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar entrada" placement="top">
                                            <IconButton
                                                aria-label="eliminar entrada"
                                                onClick={() => handleDelete(dia._id)}
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
                    {isModalOpen && (
                        <ModalDias
                            isModalOpen={isModalOpen}
                            closeModal={() => setIsModalOpen(false)}
                            dia={dia}
                        />
                    )}
                </TableContainer>
            </Paper>
        </Box>
    )
}
