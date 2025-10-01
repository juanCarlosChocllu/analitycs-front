import { Button, Typography, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import { autenticacion2 } from "../service/autenticacionService";
import { useContext } from "react";
import { AutenticacionContext } from "../../app/context/AuntenticacionProvider";
import type { autenticacion } from "../interface/autenticaicon";
import toast, { Toaster } from "react-hot-toast";

export const Autenticacion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<autenticacion>();
  const { guardarToken } = useContext(AutenticacionContext);
  const onSubmit = async (data: autenticacion) => {
    try {
      const response = await autenticacion2(data);
      if (response.status === 200) {
        guardarToken(response.token);
        window.location.href = '/inicio'
      }
    } catch (error) {
      console.error(error);
      toast.error('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Paper
        elevation={10}
        className="w-full max-w-md p-10 rounded-3xl shadow-2xl border border-blue-200 backdrop-blur-sm bg-white/80"
        component="section"
        aria-labelledby="login-title"
      >
        <header className="mb-8 text-center">
          <Typography
            id="login-title"
            variant="h4"
            component="h1"
            className="font-bold text-blue-800 drop-shadow-sm"
          >
            Sistema de Analytics
          </Typography>
          <Typography variant="body1" className="text-gray-600 mt-1">
            Ingresa tus credenciales para continuar
          </Typography>
        </header>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="relative">
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 pointer-events-none">
                <PersonIcon fontSize="small" />
              </span>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "El usuario es obligatorio",
                })}
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby="username-error"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.username ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ingresa tu usuario"
              />
              {errors.username && (
                <p id="username-error" className="mt-1 text-red-600 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 pointer-events-none">
                <LockIcon fontSize="small" />
              </span>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby="password-error"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ingresa tu contraseña"
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            size="large"
            aria-label="Ingresar al sistema"
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #303F9F 90%)',
              },
            }}
          >
            Ingresar
          </Button>

        </form>
      </Paper>
    </div>
  );
};
