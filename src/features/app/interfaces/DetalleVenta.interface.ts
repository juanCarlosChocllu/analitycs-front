export interface DetalleVenta {
    detalle:  Detalle[];
    id_venta: string;
}

export interface Detalle {
    producto:          string;
    importe:           number;
    tracking:          string;
    fechaVenta:        Date;
    flagVenta:         string;
    fechaFinalizacion?: Date;
}

export interface Producto {
    GAFA : string,
    LENTE : string,
    LENTE_DE_CONTACTO : string,
    MONTURA : string,
    SERVICIO : string,
    OTRO_PRODUCTO : string,
}

export interface DataDetalle {
    sucursal:    string;
    fechaInicio: string;
    fechaFin:    string;
    flagVenta:   string;
    tipoVenta:   string[];
    comisiona:   null | boolean;
}
