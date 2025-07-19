export interface RecetaMedico {
    codigoReceta: string;
    idVenta: string | null;
    fechaReceta: string | null;
    fechaVenta: string | null;
    cantidad: number;
    flagVenta: string | boolean;
}

export interface RecetaData {
    id: string | number;
    medico: string;
    especialidad: string;
    recetasRegistradas: number;
    ventasRealizadas: number;
    tasaConversion: number;
    recetasMedico: RecetaMedico[];
}
