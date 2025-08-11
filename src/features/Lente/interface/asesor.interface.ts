export interface Asesores {
    idEmpresa: string;
    empresa:   string;
    data:      Datum[];
}

export interface Datum {
    sucursal:   string;
    idSucursal: string;
    venta:      Venta[];
}

export interface Venta {
    asesor:                              string;
    idAsesor:                            string;
    _id:                                 null;
    lentes:                              number;
    tickets:                             number;
    antireflejo:                         number;
    progresivos:                         number;
    ocupacional?:                        number;
    progresivosOcupacionales?:           number;
    progresivosOcupacionalesPorcentaje?: number;
    porcentajeAntireflejo:               number;
    porcentajeProgresivos:               number;
    porcentajeOcupacionales?:            number;
    fotosensibles?:                      number;
    procentajeFotosensibles?:            number;
    fotoCromatico?:                      number;
    procentajeFotoCromatico?:            number;
}


export interface InformacionAsesor {
    antireflejo: Antireflejo[];
    progresivos: Ocupacional[];
    ocupacional: Ocupacional[];
    asesor:      string;
}

export interface Antireflejo {
    lentes:      number;
    tratamiento: Tratamiento[];
}

export interface Tratamiento {
    tratamiento: string;
    cantidad:    number;
    porcentaje:  number;
}

export interface Ocupacional {
    _id:      string;
    cantidad: number;
}


export interface VentaAsesor {
    id: string,
    asesor: string,
    tickets: number,
    lentes: number,
    ocupacional: number,
    porcentajeOcupacionales: number,
    antireflejo: number,
    porcentajeAntireflejo: number,
    progresivos: number,
    porcentajeProgresivos: number,
    fotosensibles: number,
    procentajeFotosensibles: number,
    progresivosOcupacionales: number,
    progresivosOcupacionalesPorcentaje: number,
}