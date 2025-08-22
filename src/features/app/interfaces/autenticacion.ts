
export interface AutenticacionContextI {
    isAuntenticacion:boolean,
    guardarToken :(token:string) => void
    rol:string
}

export  interface ResponseAutenticacion {
    token:string,
    status:number
    
}