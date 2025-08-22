import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import FiltroMetas from "../components/FiltroMetas";
import { TablaMeta } from "../components/TablaMeta";
import { ModalMetaSucursal } from "../components/ModalMetaSucursal";
import type { DatosFormulario } from "../interfaces/filtroDetalle";
import { SaveIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export const MetasSucursales = () => {
  const [filtro, setFiltro] = useState<DatosFormulario>({
    empresa: '',
    sucursal: '',
    usarFiltroFechaCreacion: false,
    fechaInicio: '',
    fechaFin: '',
    usarFiltroFechaMetas: false,
    fechaMetaInicio: '',
    fechaMetaFin: '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const handleRegister = async () => {
      if (isRegister) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsRefresh(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsRefresh(false);
        setIsRegister(false);
        toast.success('Meta registrada correctamente');
        setIsModalOpen(false);
      }
    };
    handleRegister();
  }, [isRegister]);

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#4ca555', color: '#fff', fontWeight: 'semi-bold', borderRadius: '8px' }}
          startIcon={<SaveIcon />}
          onClick={handleOpenModal}
        >
          Registrar Nueva Meta
        </Button>
      </Box>
      <FiltroMetas setFiltro={setFiltro} />
      <TablaMeta filtro={filtro} isRefresh={isRefresh} />
      {isModalOpen && (
        <ModalMetaSucursal onClose={() => setIsModalOpen(false)} setIsRegister={setIsRegister}/>
      )}
    </div>
  );
};
