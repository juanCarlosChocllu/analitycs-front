
import { AxiosError } from "axios";
import { ListarAsesor } from "../components/ListarAsesor";
import type { ErrorUser,  UsuarioAsesor } from "../interfaces/usuario.interface";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { editarUsuario } from "../services/comisionesService";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent,  Input } from "@mui/material";


interface Props {
  usuario: UsuarioAsesor;
  setMostrarEdicion:(value:boolean)=>void;
  mostrarEdicion:boolean;

}



export const EditarUsuarioPage = ({
  usuario,

  mostrarEdicion,
  setMostrarEdicion
}: Props) => {  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<UsuarioAsesor>();


  const [asesores, setAsesores] = useState<string>("")
  const rolSeleccionado = watch("rol")
  useEffect(() => {
    setValue("rol", usuario.rol)
    setValue("apellidos", usuario.apellidos)
    setValue("nombre", usuario.nombre)
    const data: string[] = []

    
    if (usuario.sucursales && usuario.sucursales.length > 0) {
      for (const da of usuario.sucursales) {
        if(da.asesor){
        data.push(da.asesor)
        }
      }
    }
;
    
    //setAsesores(data)
  }, [usuario])

  const onSubmit = async (data: UsuarioAsesor) => {
    data.asesor = asesores
    data._id = usuario._id
    console.log('a', data);
    
    try {
    ;
      
        const response = await editarUsuario(data);
        console.log(response);
        
        if (response?.status === 200) {

          toast.success("Usuario creado exitosamente");
   
          setMostrarEdicion(!mostrarEdicion)
        } else {

          toast.error("Error: " + response?.status);
        }
      

    } catch (error) {
 console.log(error);
      const e = error as AxiosError<ErrorUser>;

      if (e.status == 400) {

      }

      if (e.status == 409) {

      }
      toast.error("Error al crear el usuario");
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8 flex items-center justify-center">
      <Toaster />
      <Card className="w-full max-w-md shadow-xl  overflow-hidden p-0">
      
        <CardContent className="p-6 pt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="nombre"
                className="text-sm font-medium text-blue-800"
              >
                Nombre
              </label>
              <Input
                id="nombre"
                placeholder="Ingresa tu nombre"

                {...register("nombre", { required: true })}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <span className="h-3 w-3" /> El nombre es requerido
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="apellidos"
                className="text-sm font-medium text-blue-800"
              >
                Apellidos
              </label>
              <Input
                id="apellidos"

                placeholder="Ingresa tus apellidos"
                {...register("apellidos", { required: true })}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
              {errors.apellidos && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <span className="h-3 w-3" /> El apellido es requerido
                </p>
              )}
            </div>

            {/*  <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-blue-800"
              >
                Nombre de usuario
              </label>
              <Input
                id="username"
                placeholder="Ingresa tu nombre de usuario"
                {...register("username", { required: true })}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <span className="h-3 w-3" /> El nombre de usuario es requerido
                </p>
              )}
              {errorUser && (
                <div className="text-red-600 text-sm flex flex-col gap-1">
                  {errorUser}
                </div>
              )}
            </div> 

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-blue-800"
              >
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  className="border-blue-200 focus-visible:ring-blue-500 pr-10"
                  {...register("password", {
                    required: true,
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-blue-400 hover:text-blue-600 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  </span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-yellow-600 text-sm flex items-center gap-2">
                  {errors.password.message}
                </p>
              )}

              {error.length > 0 && (
                <div className="text-red-600 text-sm flex flex-col gap-1">
                  {error.map((i) => {
                    if (i.propiedad === "password") {
                      return i.errors.map((e: any, index: number) => (
                        <p key={index} className="flex items-center gap-1">
                          <span className="h-3 w-3" /> {e}
                        </p>
                      ));
                    }
                    return null;
                  })}
                </div>
              )}
            </div>*/}

            <div className="space-y-2">
              <label
                htmlFor="rol"
                className="text-sm font-medium text-blue-800"
              >
                Rol
              </label>
              <select
                id="rol"

                {...register("rol", { required: true })}
                className="border-blue-200 focus:ring-blue-500"
              >
                <option value="" className="text-gray-400">
                  Selecciona un rol
                </option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="GESTOR">Gestor</option>
                <option value="ASESOR">Asesor</option>

              </select>
              {errors.rol && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <span className="h-3 w-3" /> El rol es requerido
                </p>
              )}


            </div>
            <button
              type="submit"
              className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#3498DB" }}
            >
              Agregar usuario
            </button>
          </form>
        </CardContent>
      </Card>

      {
        (rolSeleccionado === "GESTOR" || rolSeleccionado === "ASESOR") && <>
          <ListarAsesor asesoresSeleccionados={asesores} setAsesoresSeleccionados={setAsesores} />

        </>
      }
    </div>
  );
};
