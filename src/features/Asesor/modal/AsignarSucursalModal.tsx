import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import { Store } from "lucide-react";
import {
  asignarSucursal,
  listarAsesorSucursal2,
} from "../service/asesorService";
import type { asesorSucursalI } from "../interface/asesorSucursal";
import toast from "react-hot-toast";

export const AsignarSucursalModal = ({usuario,asesorId,reload,setReload}:{usuario:string,asesorId:string, reload:boolean, setReload:(value:boolean)=>void}) => {
  const [open, setOpen] = useState(false);
  const [sucursales, setSucursales] = useState<asesorSucursalI[]>([]);
  const [asesor, setAsesor] = useState<string>("");

  const handleSucursalChange = (event: any) => {
    setAsesor(event.target.value);
  };

  const btnIngresar = async () => {
    
    try {
      const response = await asignarSucursal(asesor, usuario);

      if (response.status === 200) {
        setReload(!reload)
        toast.success("Asignado correctamente")
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      // Solo carga cuando se abre el modal
      (async () => {
        try {
          const response = await listarAsesorSucursal2(asesorId);
          setSucursales(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [open]);

  return (
    <>
      <Button
        variant="outlined"
        color="info"
        size="small"
        startIcon={<Store size={16} />}
        onClick={() => setOpen(true)}
      >
        Asignar sucursal
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Asignar Sucursal</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <FormControl fullWidth>
              <InputLabel id="sucursal-label">Selecciona una Sucursal</InputLabel>
              <Select
                labelId="sucursal-label"
                label="Selecciona una Sucursal"
                value={asesor}
                onChange={handleSucursalChange}
              >
                {sucursales.map((item) => (
                  <MenuItem key={item.asesor} value={item.asesor}>
                    {item.nombreSucursal}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={btnIngresar}
            disabled={!asesor}
          >
            Asignar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
