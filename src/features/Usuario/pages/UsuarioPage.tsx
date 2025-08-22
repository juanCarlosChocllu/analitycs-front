import { useEffect, useState } from "react";
import { TablaUsuario } from "../components/TablaUsuario"
import { ModalUsuario } from "../components/ModalUsuario"
import { Box, Button } from "@mui/material";
import { SaveIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export const UsuarioPage = () => {
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);

     useEffect(() => {
        const handleRegister = async () => {
          if (isRegister) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsRefresh(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsRefresh(false);
            setIsRegister(false);
            toast.success('Usuario registrado correctamente');
            setIsModalOpen(false);
          }
        };
        handleRegister();
      }, [isRegister]);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
  return (
    <Box>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <Button
            variant="contained"
            sx={{ backgroundColor: '#4ca555', color: '#fff', fontWeight: 'semi-bold', borderRadius: '8px', mt: 2, display: 'flex', alignItems: 'center', gap: 1, mx: 'auto' }}
            startIcon={<SaveIcon />}
            onClick={handleOpenModal}
        >
            Registrar Nuevo Usuario
        </Button>
        {isModalOpen && (
            <ModalUsuario setIsRegister={setIsRegister} onClose={() => setIsModalOpen(false)} />
        )}
        <TablaUsuario isRefresh={isRefresh} />
    </Box>
  )
}
