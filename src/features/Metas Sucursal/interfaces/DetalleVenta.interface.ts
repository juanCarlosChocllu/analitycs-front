export interface DetalleVenta {
    detalleVenta:  Detalle[];
    id_venta: string;
    fechaVenta:string
    fechaFinalizacion?:string
                   estadoTracking:         string;
        
    flagVenta:         string;

}

export interface Detalle {
    rubro:          string;
    importe:           number;



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
