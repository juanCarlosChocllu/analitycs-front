import { instance } from "../../app/service/instaceAxios"
import type { Usuario } from "../interfaces/usuario.interface"



export async function  listarUsuarios():Promise<Usuario[]>{

    try {
        const response = await instance.get('usuarios/listar')
        return response.data
    } catch (error) {
        throw error
        
    }

}




export async function  crearUsuarios(formData:any){

    try {
        const response = await instance.post('usuarios/create',
            formData,
           )
        return response.data
    } catch (error) {
        throw error
        
    }

}



export async function  eliminarUsuarios(id:string){

    try {
        const response = await instance.delete(`usuarios/${id}`)
        return response.data
    } catch (error) {
        throw error
        
    }

}

export async function perfil():Promise<Usuario>{    
    try {
        const response = await instance.get(`usuarios/perfil`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
        
    }

}

export async function cambiarPassword(password:string, id:string){    
    try {
        const response = await instance.post(`usuarios/resetear/contrasena/${id}`,{password})
        return response.data
    } catch (error) {
        throw error
        
    }

}