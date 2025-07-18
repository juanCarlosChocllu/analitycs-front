import type { DataDiaria } from "../interface/compartivo";
import type { ResumenDiario } from "../interface/procesarDato.interface";

export function procesarDatos(data: DataDiaria[]): ResumenDiario[] {
  const agrupado: { [fecha: string]: ResumenDiario } = {};

  const PRODUCTOS: Array<
    keyof Omit<
      ResumenDiario,
      "fecha" | "totalCantidad" | "totalImporte" | "totalTickets" | "totalPrecioPromedio" | "totalTicketsPromedio"
    >
  > = ["LENTE", "MONTURA", "GAFA", "LENTE DE CONTACTO", "SERVICIO"];

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

    if (PRODUCTOS.includes(producto as any)) {
      const prod = producto as keyof (typeof agrupado)[typeof fecha];

      const resumenProducto = agrupado[fecha][prod] as any;

      resumenProducto.cantidad += cantidad;
      resumenProducto.importe += importe;
      resumenProducto.tickets += ticket;

      agrupado[fecha].totalCantidad += cantidad;
      agrupado[fecha].totalImporte += importe;
      agrupado[fecha].totalTickets += ticket;
      agrupado[fecha].totalPrecioPromedio += item.precioPromedio;
      agrupado[fecha].totalTicketsPromedio += item.ticketPromedio;
    }
  });

  return Object.values(agrupado).sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );
}
