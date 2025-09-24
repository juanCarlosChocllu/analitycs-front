import type { ProductosStockI, VentaStockI } from "../interface/productos";

export function agruparVentaProductosPorRubroYCategoria(
  dataActual: ProductosStockI[],
  dataAnterior: ProductosStockI[]
): VentaStockI[] {
  const agrupado: Record<
    string,
    Record<
      string,
      {
        ventaActual: number;
        ventasAnterior: number;
        presupuesto: number;
        stockSucursal: number;
        stockDeposito: number;
      }
    >
  > = {};

  for (const item of dataAnterior) {
    for (const producto of item.productos) {
      const { rubro, categoria, cantidadVentas } = producto;
      if (!agrupado[rubro]) {
        agrupado[rubro] = {};
      }
      if (!agrupado[rubro][categoria]) {
        agrupado[rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockDeposito: 0,
          stockSucursal: 0,
        };
      }
      agrupado[rubro][categoria].ventasAnterior += cantidadVentas;
    }
  }

  for (const item of dataActual) {
    for (const producto of item.productos) {
      const { rubro, categoria, cantidadVentas, stock, cantidadCotizaciones } = producto;
      if (!agrupado[rubro]) {
        agrupado[rubro] = {};
      }
      if (!agrupado[rubro][categoria]) {
        agrupado[rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockDeposito: 0,
          stockSucursal: 0,
        };
      }

      agrupado[rubro][categoria].ventaActual += cantidadVentas;
      agrupado[rubro][categoria].presupuesto += cantidadCotizaciones;
      if (stock && stock.length > 0) {
        for (const s of stock) {
          if (s.tipo === "ALMACEN") {
            agrupado[rubro][categoria].stockDeposito += s.cantidad;
          } else if (s.tipo === "SUCURSAL") {
            agrupado[rubro][categoria].stockSucursal += s.cantidad;
          }
        }
      }
    }
  }

  const resultado = Object.entries(agrupado).map(([rubro, categorias]) => ({
    rubro,
    categorias: Object.entries(categorias).map(([categoria, valores]) => ({
      categoria,
      ...valores,
    })),
  }));

  return resultado;
}



export function agruparPorRubro(dataActual: ProductosStockI[]) {
  const agrupado: Record<
    string,
    Record<
      string,
      {
        marca: string;
        categoria: string;
        stockSucursal: number;
        totalVentas: number;
      }
    >
  > = {};
  for (const item of dataActual) {
    for (const producto of item.productos) {
      if (!agrupado[producto.rubro]) {
        agrupado[producto.rubro] = {};
      }
      if (!agrupado[producto.rubro][producto.marca]) {
        agrupado[producto.rubro][producto.marca] = {
          categoria: "",
          marca: "",
          stockSucursal: 0,
          totalVentas: 0,
        };
      }
      agrupado[producto.rubro][producto.marca].categoria = producto.categoria;
      agrupado[producto.rubro][producto.marca].marca = producto.marca;
      agrupado[producto.rubro][producto.marca].totalVentas +=
        producto.cantidadVentas;
      for (const stock of producto.stock) {
        if (stock.tipo == "SUCURSAL") {
          agrupado[producto.rubro][producto.marca].stockSucursal +=
            stock.cantidad;
        }
      }
    }
  }

  const agrupadoArr = Object.entries(agrupado).map(([rubro, producto]) => {
    return {
      rubro,
      producto: Object.entries(producto).map(([_, values]) => ({ ...values })),
    };
  });
  return agrupadoArr;
}
