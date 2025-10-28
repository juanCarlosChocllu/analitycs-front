import { useContext, useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { registrarRendimientoDiarioI } from "../interface/RendimientoDiario";
import { editarRendimientoDiarioAsesor } from "../service/RendimientoDiarioService";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AutenticacionContext } from "../../app/context/AuntenticacionProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface EditarRendimientoDiarioModalProps {
  reload: boolean;
  setReload: (data: boolean) => void;
  antenciones: number;
  id: string;
  segundoPar: number;
  presupuesto: number;
}

export const EditarRendimientoDiarioModal = ({
  reload,
  setReload,
  antenciones,
  id,
  segundoPar,
  presupuesto,
}: EditarRendimientoDiarioModalProps) => {
  const [open, setOpen] = useState(false);
  const { empresa } = useContext(AutenticacionContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<registrarRendimientoDiarioI>({
    defaultValues: {
      atenciones: 0,
      segundoPar: 0,
      presupuesto: 0,
    },
  });
  useEffect(() => {
    setValue("atenciones", antenciones);
    setValue("segundoPar", segundoPar);
    setValue("presupuesto", presupuesto);
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: registrarRendimientoDiarioI) => {
    try {
      data.atenciones = Number(data.atenciones);
      data.segundoPar = Number(data.segundoPar);
      data.presupuesto = Number(data.presupuesto);
      await editarRendimientoDiarioAsesor(data, id);
      setReload(!reload);
      handleClose();
    } catch (error) {
      console.log(error);

      const e = error as AxiosError;

      if (e.response?.status === 409) {
        const mensaje = (e.response.data as { message: string }).message;
        toast.error(mensaje);
      }
      if (e.response?.status === 400) {
        const mensaje = (e.response.data as { message: string }).message;
        toast.error(mensaje);
      }
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Editar
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-titulo">
        <Box sx={style}>
          <Typography id="modal-titulo" variant="h6" component="h2" mb={2}>
            Registrar Rendimiento Diario
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="atenciones"
              control={control}
              rules={{
                required: "Atenciones es requerido",
                min: { value: 0, message: "Debe ser positivo" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Atenciones"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.atenciones}
                  helperText={
                    errors.atenciones ? errors.atenciones.message : ""
                  }
                />
              )}
            />

            <Controller
              name="segundoPar"
              control={control}
              rules={{
                required: "Segundo Par es requerido",
                min: { value: 0, message: "Debe ser positivo" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Segundo Par"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.segundoPar}
                  helperText={
                    errors.segundoPar ? errors.segundoPar.message : ""
                  }
                />
              )}
            />
            {empresa != "OPTICENTRO" && (
              <Controller
                name="presupuesto"
                control={control}
                rules={{
                  required: "Presupuesto es requerido",
                  min: { value: 0, message: "Debe ser positivo" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Presupuesto"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.presupuesto}
                    helperText={
                      errors.presupuesto ? errors.presupuesto.message : ""
                    }
                  />
                )}
              />
            )}

            <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
