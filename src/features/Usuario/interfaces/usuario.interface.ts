export interface Usuario {
    _id:       string;
    nombre:    string;
    apellidos: string;
    username:  string;
    rol:       string;
    flag:      string;
}



export interface UsuarioAsesor {
    _id: string;
    nombre: string;
    apellidos: string;
    username: string;
    password?: string;
    sucursales?: dataAsesor[];
    asesor:string
    rol: string;
    flag?: string;
    asesorUsuario?:string[]
}


export interface ErrorUser {
    statusCode: number;
    message:    string;
    errors:     Error[];
}

export interface Error {
    propiedad: string;
    errors:    string[];
}
interface dataAsesor {
    sucursal:string, asesor:string
}

export interface AsesorSeleccionadoI {
    nombres:string
    apellidos:string
    usuario:string
}

export interface Asesor {
    id:string,
    nombre:string,
    sucursalNombre:string,
    idSucursal:string,
}

export interface AsesorSinUsuario {
    id:string,
    nombre:string,
    sucursal:string,
  
}
