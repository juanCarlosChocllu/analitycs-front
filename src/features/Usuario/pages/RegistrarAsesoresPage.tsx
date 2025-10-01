import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ListarAsesor } from "../components/ListarAsesor";
import type {
  AsesorSeleccionadoI,
  ErrorUser,
  UsuarioAsesor,
} from "../interfaces/usuario.interface";
import { crearUsuarios } from "../services/serviceUsuario";

export const RegistrarAsesoresPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UsuarioAsesor>();

  const [error, setError] = useState<any[]>([]);
  const [errorUser, setErrorUser] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [asesorSelect, setAsesorSelect] = useState<AsesorSeleccionadoI>({
    apellidos: "",
    nombres: "",
    usuario: "",
  });
  const [asesores, setAsesores] = useState<string>("");
  const rolSeleccionado = watch("rol");

  useEffect(() => {
    setValue("nombre", asesorSelect.nombres);
    setValue("apellidos", asesorSelect.apellidos);
    setValue("username", asesorSelect.usuario);
  }, [asesorSelect]);

  const onSubmit = async (data: UsuarioAsesor) => {
    data.asesor = asesores;
    try {
      console.log(data);

      const response = await crearUsuarios(data);
      if (response?.status === 201) {
        setError([]);
        setErrorUser("");
        toast.success("Usuario creado exitosamente");
        navigate("/asesor/usuarios");
      } else {
        setError([]);
        toast.error("Error: " + response?.status);
      }
    } catch (error) {
      console.log(error);

      setError([]);
      const e = error as AxiosError<ErrorUser>;
      if (e.status === 400) {
        e.response?.data.errors &&
          Array.isArray(e.response.data.errors) &&
          setError(e.response.data.errors);
      }
      if (e.status === 409) {
        setErrorUser("El usuario ya existe");
      }
      toast.error("Error al crear el usuario");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Toaster position="top-center" />
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Registrar Usuario
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Nombre"
              margin="normal"
              {...register("nombre", { required: "El nombre es requerido" })}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Apellidos"
              {...register("apellidos", {
                required: "El apellido es requerido",
              })}
              error={!!errors.apellidos}
              helperText={errors.apellidos?.message}
            />

            {/* Nombre de usuario */}
            <TextField
              fullWidth
              margin="normal"
              label="Usuario"
              {...register("username", { required: "El usuario es requerido" })}
              error={!!errors.username || !!errorUser}
              helperText={errors.username?.message || errorUser}
            />

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
              {error.length > 0 && (
                <Box mt={1}>
                  {error
                    .filter((i) => i.propiedad === "password")
                    .map((i) =>
                      i.errors.map((msg: string, idx: number) => (
                        <FormHelperText key={idx} error>
                          {msg}
                        </FormHelperText>
                      ))
                    )}
                </Box>
              )}
            </FormControl>

            {/* Rol */}
            <FormControl fullWidth margin="normal" error={!!errors.rol}>
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select
                labelId="rol-label"
                id="rol"
                defaultValue=""
                {...register("rol", { required: "El rol es requerido" })}
              >
                <MenuItem value="">Selecciona un rol</MenuItem>
                <MenuItem value="GESTOR">GESTOR</MenuItem>
                <MenuItem value="ASESOR">ASESOR</MenuItem>
              </Select>
              {errors.rol && (
                <FormHelperText>{errors.rol.message}</FormHelperText>
              )}
            </FormControl>

            {/* Botón */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Agregar usuario
            </Button>
          </Box>
        </CardContent>
      </Card>

      {(rolSeleccionado === "GESTOR" || rolSeleccionado === "ASESOR") && (
        <Box mt={4}>
          <ListarAsesor
            asesoresSeleccionados={asesores}
            setAsesoresSeleccionados={setAsesores}
            setAsesorData={setAsesorSelect}
          />
        </Box>
      )}
    </Container>
  );
};
