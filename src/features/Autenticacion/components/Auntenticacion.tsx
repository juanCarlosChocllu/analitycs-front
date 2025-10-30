import {
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import { autenticacion2 } from "../service/autenticacionService";
import type { autenticacion } from "../interface/autenticaicon";
import toast, { Toaster } from "react-hot-toast";
import type { AxiosError } from "axios";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Autenticacion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<autenticacion>();

  const onSubmit = async (data: autenticacion) => {
    try {
      setLoading(true);
      const response = await autenticacion2(data);
      if (response.status === 200) {
        window.location.href = "/inicio";
      }
    } catch (error) {
      const e = error as AxiosError<any>;
      if (e.status == 403) {
        toast.error(e.response?.data.message);
      } else {
        toast.error(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <Paper
        elevation={10}
        className="w-full max-w-md p-10 rounded-3xl shadow-2xl border border-blue-100 backdrop-blur-md bg-white/70"
        component="section"
        aria-labelledby="login-title"
      >
        <div className="text-center mb-8">
          <h1
            id="login-title"
            className="text-3xl font-semibold text-blue-700 tracking-tight"
          >
            Bienvenido
          </h1>
          <p className="text-gray-500 mt-1">Inicia sesión para continuar</p>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Usuario */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <div className="relative">
              <PersonIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                fontSize="small"
              />
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "El usuario es obligatorio",
                })}
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby="username-error"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingresa tu usuario"
              />
            </div>
            {errors.username && (
              <p id="username-error" className="mt-1 text-red-600 text-sm">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <LockIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                fontSize="small"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby="password-error"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingresa tu contraseña"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-red-600 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <Button
            type="submit"
            fullWidth
            size="large"
            aria-label="Ingresar al sistema"
            variant="contained"
            sx={{
              borderRadius: 2,
              py: 1.4,
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              letterSpacing: "0.02em",
              background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
              boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
                boxShadow: "0 6px 15px rgba(37,99,235,0.45)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={26} sx={{ color: "white" }} />
            ) : (
              "Ingresar"
            )}
          </Button>

        </form>
      </Paper>
    </div>
  );
};
