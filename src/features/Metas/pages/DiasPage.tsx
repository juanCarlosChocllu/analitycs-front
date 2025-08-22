import { Box, Button, Typography } from "@mui/material"
import { TablaDia } from "../components/TablaDia"
import { useNavigate } from "react-router-dom"

export const DiasPage = () => {
  const navigate = useNavigate();
  const handleAddDay = () => {
    navigate('/metas/dia');
  };
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Días Feriados</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddDay}>
          Agregar Día Feriado
        </Button>
      </Box>
      <Box sx={{ width: '100%', mt: 2}}>
        <TablaDia />
      </Box>
    </Box>
  )
}
