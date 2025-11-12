import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Store } from "lucide-react";
import type { asesorSucursalI } from "../interface/asesorSucursal";
import {
  asignarSucursal,
  listarAsesorSucursal2,
  nuevoDetalleAsesor,
} from "../service/asesorService";
import toast from "react-hot-toast";
import type { EmpresasI, SucursalI } from "../../app/interfaces/BuscadorI";
import {
  getEmpresas,
  getSucursalesPorEmpresa,
} from "../../app/service/appService";
import type { AxiosError } from "axios";

export const AsignarSucursalModal = ({
  usuario,
  asesorId,
  reload,
  setReload,
}: {
  usuario: string;
  asesorId: string;
  reload: boolean;
  setReload: (value: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [sucursales, setSucursales] = useState<asesorSucursalI[]>([]);
  const [asesor, setAsesor] = useState<string>("");
  const [empresas, setEmpresas] = useState<EmpresasI[]>([]);
  const [empresa, setEmpresa] = useState<string>("");
  const [sucursalesEmpresa, setSucursalesEmpresa] = useState<SucursalI[]>([]);
  const [sucursalesEmpresaSeleccionada, setSucursalesEmpresaSeleccionada] = useState<string>('');
  const handleTabChange = (_: any, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleSucursalChange = (event: any) => {
    setAsesor(event.target.value);
  };

  useEffect(() => {
    if (open) {
      (async () => {
        try {
          const response = await listarAsesorSucursal2(asesorId);

          setSucursales(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [open, asesorId, tabIndex]);

  useEffect(() => {
    if (tabIndex == 1) {
      (async () => {
        try {
          const response = await getEmpresas();

          setEmpresas(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [tabIndex]);

  useEffect(() => {
    setSucursalesEmpresa([])
    setSucursalesEmpresaSeleccionada('')
    if (tabIndex == 1) {
      (async () => {
        try {
          
          const response = await getSucursalesPorEmpresa(empresa);
          setSucursalesEmpresa(response);

        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [empresa]);

  const btnIngresar = async () => {
    try {
      const response = await asignarSucursal(asesor, usuario);
      if (response.status === 200) {
        setReload(!reload);
        toast.success("Asignado correctamente");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const btnGuardar = async () => {
    try {
      if (sucursalesEmpresaSeleccionada && asesorId){
        const response = await nuevoDetalleAsesor(asesorId, sucursalesEmpresaSeleccionada)
        if(response.status == 201){
          toast.success('Registrado')

        }
      }else{
        toast.error('Selecciones una sucursal')
      }
      console.log(sucursalesEmpresaSeleccionada, asesorId);
      
    } catch (error) {
      const e = error as AxiosError<any>
      if(e.status ==  409){
        toast.error(e.response?.data.message)
      }else{
        toast.error(e.message)
      }
      console.log(error);
    }
  };

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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Gestión de Sucursales</DialogTitle>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Sucursales existentes" />
          <Tab label="Añadir nueva sucursal" />
        </Tabs>

        <DialogContent sx={{ mt: 2 }}>
          {tabIndex === 0 && (
            <Box display="flex" flexDirection="column" gap={3} mt={2}>
              <FormControl fullWidth>
                <InputLabel id="sucursal-label">
                  Selecciona una Sucursal
                </InputLabel>
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
          )}

          {tabIndex === 1 && (
            <Box mt={2}>
              <FormControl fullWidth>
                <InputLabel id="sucursal-label">
                  Selecciona una Empresa
                </InputLabel>
                <Select
                  labelId="sucursal-label"
                  label="Selecciona una Sucursal"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                >
                  {empresas.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="sucursal-label">
                  Selecciona una Sucursal
                </InputLabel>
                <Select
                  labelId="sucursal-label"
                  label="Selecciona una Sucursal"
                  value={sucursalesEmpresaSeleccionada}
                  onChange={(e)=> setSucursalesEmpresaSeleccionada(e.target.value)}
                >
                  {sucursalesEmpresa.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancelar
          </Button>

          {tabIndex === 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={btnIngresar}
              disabled={!asesor}
            >
              Asignar
            </Button>
          ) : (
            <Button onClick={btnGuardar} variant="contained" color="primary">
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
