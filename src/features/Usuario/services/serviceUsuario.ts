import { analitycsV2 } from "../../app/config/analitycsV2";
import type {
  AsesorSinUsuario,
  Usuario,
  UsuarioAsesor,
} from "../interfaces/usuario.interface";

export async function listarUsuarios(): Promise<Usuario[]> {
  try {
    const response = await analitycsV2.get("usuarios/listar");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listarAsesores(): Promise<UsuarioAsesor[]> {
  try {
    const response = await analitycsV2.get("usuarios/asesor");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listarAsesorVentas(): Promise<AsesorSinUsuario[]> {
  try {
    const response = await analitycsV2.get("asesor/listar");
    return response.data;
  } catch (error) {
    throw error;
  }
}
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

export async function crearUsuarios(formData: any) {
  try {
    const response = await analitycsV2.post("usuarios/create", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function eliminarUsuarios(id: string) {
  try {
    const response = await analitycsV2.delete(`usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function perfil(): Promise<Usuario> {
  try {
    const response = await analitycsV2.get(`usuarios/perfil`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function cambiarPassword(password: string, id: string) {
  try {
    const response = await analitycsV2.post(
      `usuarios/resetear/contrasena/${id}`,
      { password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
