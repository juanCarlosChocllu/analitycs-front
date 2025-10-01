
export interface AutenticacionContextI {
    isAuntenticacion:boolean,
    rol:string
}

export  interface ResponseAutenticacion {
    token:string,
    status:number
    
}