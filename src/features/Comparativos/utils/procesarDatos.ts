import type { DataDiaria } from "../interface/compartivo";
import type { ResumenDiario } from "../interface/procesarDato.interface";

export function procesarDatos(data: DataDiaria[]): ResumenDiario[] {
  const agrupado: { [fecha: string]: ResumenDiario } = {};

  const PRODUCTOS = [
    "LENTE",
    "MONTURA",
    "GAFA",
    "LENTE DE CONTACTO",
    "SERVICIO",
  ] as const;
  type ProductoKey = typeof PRODUCTOS[number];

  data.forEach((item) => {
    const { fecha, producto, cantidad, importe, ticket } = item;

    if (!agrupado[fecha]) {
      agrupado[fecha] = {
        fecha,
        LENTE: { cantidad: 0, importe: 0, tickets: 0 },
        MONTURA: { cantidad: 0, importe: 0, tickets: 0 },
        GAFA: { cantidad: 0, importe: 0, tickets: 0 },
        "LENTE DE CONTACTO": { cantidad: 0, importe: 0, tickets: 0 },
        SERVICIO: { cantidad: 0, importe: 0, tickets: 0 },
        totalCantidad: 0,
        totalImporte: 0,
        totalTickets: 0,
        totalTicketsPromedio: 0,
        totalPrecioPromedio: 0,
      };
    }

    const productoKey = (producto || "").toUpperCase().trim() as ProductoKey;
    if (PRODUCTOS.includes(productoKey)) {
      const resumenProducto = agrupado[fecha][productoKey] as any;

      resumenProducto.cantidad += cantidad;
      resumenProducto.importe += importe;
      resumenProducto.tickets += ticket;

      agrupado[fecha].totalCantidad += cantidad;
      agrupado[fecha].totalImporte += importe;
      agrupado[fecha].totalTickets += ticket;
    }
  });

  // Calcular promedios totales derivados (no suma de promedios)
  Object.values(agrupado).forEach((r) => {
    r.totalTicketsPromedio = r.totalTickets > 0 ? Number((r.totalImporte / r.totalTickets).toFixed(2)) : 0;
    r.totalPrecioPromedio = r.totalCantidad > 0 ? Number((r.totalImporte / r.totalCantidad).toFixed(2)) : 0;
  });

  return Object.values(agrupado).sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );
}
