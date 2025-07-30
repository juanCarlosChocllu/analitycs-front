export interface DataAsesor {
    sucursal:         string;
    asesor:           string;
    _id:              null;
    unidadPorTicket:  number;
    importeTotalSuma: number;
    ventaTotal:       number;
    cantidad:         number;
    totalTicket:      number;
    ticketPromedio:   number;
    precioPromedio:   number;
}

export interface ProcesedData {
    sucursales: Record<string, DataAsesor[]>,
    allAsesores: DataAsesor[]
}