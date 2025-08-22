
import {
  Button,
  Typography,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {useForm} from 'react-hook-form'
import type { autenticacion } from '../interface/autenticaicon';
import { autenticacionAsesorService } from '../service/autenticacionService';
import { useContext } from 'react';
import { AutenticacionContext } from '../../app/context/AuntenticacionProvider';
export const AutenticacionAsesor = () => {
  const {register, handleSubmit}=useForm<autenticacion>()
  const {guardarToken}=useContext(AutenticacionContext)
  const onSubmit = async (data:autenticacion)=>{
    try {
      const response = await autenticacionAsesorService(data)
     if(response.status == 200){
        guardarToken(response.token)
        window.location.href = '/asesor/inicio'
     }
    } catch (error) {
      console.log(error);
      
    }
    
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <Paper
        elevation={10}
        className="w-full max-w-md p-10 rounded-3xl shadow-2xl border border-blue-200 backdrop-blur-sm bg-white/80"
      >
        <div className="mb-8 text-center">
          <Typography
            variant="h4"
            className="font-bold text-blue-800 drop-shadow-sm"
          >
            Portal Asesores
          </Typography>
          <Typography variant="body1" className="text-gray-600 mt-1">
            Ingresa tus credenciales para continuar
          </Typography>
        </div>

        <form  className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
              Usuario
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <PersonIcon fontSize="small" />
              </span>
              <input
                id="username"
                type="text"
                {...register("username")}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu usuario"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <LockIcon fontSize="small" />
              </span>
              <input
                id="password"
                type="password"
               {...register("password")}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            size="large"
            className="!bg-gradient-to-r !from-blue-600 !to-blue-800 hover:!from-blue-700 hover:!to-blue-900 !text-white !py-3 !rounded-xl shadow-lg"
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </div>
  );
};
