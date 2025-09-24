import { analitycsV2 } from "../../app/service/analitycsV2";
import type {
  AsesorSinUsuario,
  UsuarioAsesor,
} from "../interfaces/usuario.interface";

export const crearUsuario = async (usuario: UsuarioAsesor) => {
  try {
    const resultado = await analitycsV2.post("usuario", usuario);
    return resultado;
  } catch (error) {
    throw error;
  }
};
export const listarAsesorSinUsuario = async (): Promise<AsesorSinUsuario[]> => {
  try {
    const response = await analitycsV2.get(`asesor/listar`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarUsuario = async (usuario: UsuarioAsesor) => {
  try {
    const resultado = await analitycsV2.patch(
      "usuario/" + usuario._id,
      usuario
    );
    return resultado;
  } catch (error) {
    throw error;
  }
};

export const eliminarUsuario = async (id: string) => {
  try {
    const resultado = await analitycsV2.delete("usuario/" + id);
    return resultado;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuario = async (): Promise<UsuarioAsesor[]> => {
  try {
    const resultado = await analitycsV2.get("usuario/asesor");
    return resultado.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
