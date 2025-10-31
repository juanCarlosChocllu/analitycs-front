import { Box, Button } from "@mui/material"

import { useNavigate } from "react-router"

export const FacingPage = () => {
    const navigate = useNavigate()
  return (
    <Box>
        <Button onClick={()=>navigate('/registrar/facing')}>Regitrar</Button>
    </Box>
  )
}
