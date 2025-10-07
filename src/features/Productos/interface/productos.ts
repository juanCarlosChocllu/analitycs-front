export interface ProductosStockI {
  sucursal: string;
  empresa: string;
  productos: ProductoI[];
}

export interface DataEmpresaI {
  empresa: string;
  productos: ProductoEmpresaI[];
}

export interface ProductoI {
  rubro: string;
  marca: string;
  cantidadVentas: number;
  cantidadCotizaciones: number;
  categoria: string;
  stock: StockI[];
}

export interface ProductoEmpresaI {
  rubro: string;
  marca: string;
  cantidadVentas: number;
  cantidadCotizaciones: number;
  categoria: string;
  cantidaStockSucursal: number;
  cantidadStockDeposito: number;
}

export interface StockI {
  cantidad: number;
  tipo: string;
}

export interface VentaStockSucursalI {
  sucursal: string;
  rubros: VentaStockI[];
}

export interface VentaStockI {
  rubro: string;
  categorias: categoriaAgrupadaI[];
}

export interface categoriaAgrupadaI {
  categoria: string;
  ventaActual: number;
  ventasAnterior: number;
  presupuesto: number;
  stockSucursal: number;
  stockDeposito: number;
}

export interface agrupadoPorRubroI {
  rubro: string;
  producto: {
    marca: string;
    categoria: string;
    stockSucursal: number;
    totalVentas: number;
  }[];
}

export interface kpiProductosI {
  sucursal: string;
  cantidad: number;
  idSucursal: string;
  rubro: string;
}

export interface detalleProductoKpiI {
     marca:string,
        cantidad:number,
        rubro:string
}
