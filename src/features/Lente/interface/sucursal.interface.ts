export interface Kpisucursal {
    idEmpresa: string;
    empresa:   string;
    data:      Datum[];
}

export interface Datum {
    sucursal: string;
    id:       string;
    dataKpi:  { [key: string]: number | null }[];
}


export interface SucursalTableData {
    sucursal: string;
    tickets: number;
    lentes: number;
    ocupacional?: number;
    porcentajeOcupacionales?: number;
    antireflejo?: number;
    porcentajeAntireflejo?: number;
    progresivos?: number;
    porcentajeProgresivos?: number;
    progresivosOcupacionales?: number;
    progresivosOcupacionalesPorcentaje?: number;
    fotoCromatico?: number;
    procentajeFotoCromatico?: number;
    fotosensibles?: number;
    procentajeFotosensibles?: number;
}

export interface FooterValues {
    columnId: string;
    value: string | number;
}