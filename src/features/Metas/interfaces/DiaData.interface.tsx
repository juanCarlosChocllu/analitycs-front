export interface DiaDataI {
    nombreD:string,
    empresa:string,
    tipo:string,
    uuid:string,
    sucursal: string,
    nombre: string,
    dia: Date,
    estado:string
}

export interface Data {
    nombre: string;
    tipo: string;
    data: DiaData[];
}

export interface DiaData {
    _id?: string,
    estado?: string,
    sucursal?: string,
    tipo?: string,
    dia?: Date,
    nombre?: string,
    flag?: string,
    fecha?: Date,
}

export interface Feriado {
    _id: string,
    nombre?: string,
    tipo?: string,
    flag?: string,
    fecha?: Date,
    estado?: string,
    sucursal?: string,
    dia?: Date,
}

export interface FeriadoData {
    _id: string,
    estado: string,
    sucursal: string,
    tipo: string,
    dia: Date,
}

export interface NombreDia {
    _id:string,
    nombre:string,
    tipo:string,
    flag:string,
    fecha:Date,
}

export interface DiaModal {
    _id:string,
    dia:Date,
    estado:string,
    sucursal:string,
    tipo:string,
    flag:string,
}