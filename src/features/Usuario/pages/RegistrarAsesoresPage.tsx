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
    watch,
    setValue,
    control,
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
    } catch (err) {
      console.log(err);
      setError([]);
      const e = err as AxiosError<ErrorUser>;
      if (e.status === 400 && e.response?.data.errors)
        setError(e.response.data.errors);
      if (e.status === 409) setErrorUser("El usuario ya existe");
      toast.error("Error al crear el usuario");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Toaster position="top-center" />
      <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Registrar Usuario
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              placeholder="Nombre"
              {...register("nombre", { required: "El nombre es requerido" })}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />
            <TextField
              fullWidth
              placeholder="Apellidos"
              {...register("apellidos", {
                required: "Los apellidos son requeridos",
              })}
              error={!!errors.apellidos}
              helperText={errors.apellidos?.message}
            />
            <TextField
              fullWidth
              placeholder="Usuario"
              {...register("username", { required: "El usuario es requerido" })}
              error={!!errors.username || !!errorUser}
              helperText={errors.username?.message || errorUser}
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
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
                label="Contraseña"
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.rol}>
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select
                labelId="rol-label"
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "#3498DB",
                "&:hover": { backgroundColor: "#2980b9" },
              }}
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
