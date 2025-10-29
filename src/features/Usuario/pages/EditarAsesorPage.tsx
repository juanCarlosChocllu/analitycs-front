
import type { UsuarioAsesor } from "../interfaces/usuario.interface";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { editarUsuario, obtenerUsuario } from "../services/serviceUsuario";
import { useParams } from "react-router";

export const EditarAsesorPage = () => {
  const { id } = useParams();

  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<UsuarioAsesor>();
  const [usuario, setUsuario] = useState<UsuarioAsesor>();

  useEffect(() => { obtenerAsesor(); }, []);

  useEffect(() => {
    if (usuario) {
    
      setValue("apellidos", usuario.apellidos);
      setValue("nombre", usuario.nombre);
      setValue("username", usuario.username);      
      setValue("rol", usuario.rol);
    }
  }, [usuario]);

  const obtenerAsesor = async () => {
    try {
      if (id) {
        const response = await obtenerUsuario(id);
        setUsuario(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: UsuarioAsesor) => {
    if (id) {
      data._id = id;
      try {
        const response = await editarUsuario(data);
        if (response?.status === 200) toast.success("Usuario editado exitosamente");
        else toast.error("Error: " + response?.status);
      } catch (error) {
        toast.error("Error al editar el usuario");
      }
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8 flex items-center justify-center">
      <Toaster />
      <Card className="w-full max-w-md shadow-xl overflow-hidden">
        <CardContent className="p-6">
          <Typography variant="h5" className="font-bold text-blue-900 mb-6 text-center">
            Editar Asesor
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
             
              fullWidth
              {...register("nombre", { required: "El nombre es requerido" })}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />
            <TextField
          
              fullWidth
              {...register("apellidos", { required: "Los apellidos son requeridos" })}
              error={!!errors.apellidos}
              helperText={errors.apellidos?.message}
            />
            <TextField
        
              fullWidth
              disabled
              {...register("username", { required: "El usuario es requerido" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <Controller
              name="rol"
              control={control}
              rules={{ required: "El rol es requerido" }}
               defaultValue={usuario?.rol || ""} 
              render={({ field }) => (
                <TextField
                  select
                  label="Rol"
                  fullWidth
                  {...field}
                  error={!!errors.rol}

                  helperText={errors.rol?.message}
                >
                  <MenuItem value="GESTOR">Gestor</MenuItem>
                  <MenuItem value="ASESOR">Asesor</MenuItem>
                </TextField>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#3498DB",
                "&:hover": { backgroundColor: "#2980b9" },
              }}
            >
              Guardar cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
