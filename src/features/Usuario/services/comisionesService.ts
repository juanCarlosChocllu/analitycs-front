import { comisionesInstance } from "../../app/service/comisionesInstance";
import type { AsesorSinUsuario, UsuarioAsesor } from "../interfaces/usuario.interface";

export const crearUsuario = async (usuario: UsuarioAsesor) => {
    try {
        const resultado = await comisionesInstance.post("usuario", usuario);
        return resultado;
    } catch (error) {
         throw error
     
    }
}
export const listarAsesorSinUsuario=async():Promise<AsesorSinUsuario[]>=> {
    try {
        const response = await  comisionesInstance.get(`asesor/sin/usuario`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const editarUsuario = async (usuario: UsuarioAsesor) => {
    try {
        console.log('service', usuario._id);
        
        const resultado = await comisionesInstance.patch("usuario/" + usuario._id, usuario);
        return resultado;
    } catch (error) {
        throw error

    }
}


export const eliminarUsuario = async (id: string) => {
    try {
        const resultado = await comisionesInstance.delete("usuario/" + id);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export const obtenerUsuario = async () : Promise<UsuarioAsesor[]> => {
    try {
        const resultado = await comisionesInstance.get("usuario/asesor");
        return resultado.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}