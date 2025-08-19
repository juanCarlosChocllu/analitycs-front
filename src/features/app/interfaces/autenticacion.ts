
export interface AutenticacionContextI {
    isAuntenticacion:boolean,
    guardarToken :(token:string) => void
}

export  interface ResponseAutenticacion {
    token:string,
    status:number
}