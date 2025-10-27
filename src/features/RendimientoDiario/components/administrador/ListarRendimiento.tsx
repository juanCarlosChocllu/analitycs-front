import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { BuscadorBase } from "../../../app/components/Buscador/BuscadorBase";
import type { filtroBuscadorI } from "../../../app/interfaces/BuscadorI";
import { listarRendimientoAsesor } from "../../service/RendimientoDiarioService";
import { mostrarEnDia } from "../../utils/mostrarDia";
import {
  tasaDeConversion,
  ticketPromedio,
} from "../../../app/util/ticketPromedio";
import { Loader } from "../../../app/components/loader/Loader";
import { porcentaje } from "../../../app/util/porcentaje";
import type {
  ResultadoRendimientoDiarioI,
  VentaDetalleI,
} from "../../interface/RendimientoDiario";

export const ListarRendimiento = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [datos, setDatos] = useState<ResultadoRendimientoDiarioI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    listarRendimiento();
  }, [filtro]);

  const listarRendimiento = async () => {
    try {
      setLoading(true);
      const response = await listarRendimientoAsesor(filtro);

      setDatos(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const agruparPorSemana = (ventas: VentaDetalleI[]) => {
    const semanas: Record<string, VentaDetalleI[]> = {};

    ventas.forEach((venta) => {
      const fecha = new Date(venta.fecha);
      const dia = fecha.getUTCDay();
      const inicioSemana = new Date(fecha);
      const offset = dia === 0 ? -6 : 1 - dia;
      inicioSemana.setDate(fecha.getUTCDate() + offset);
      inicioSemana.setHours(0, 0, 0, 0);

      const clave = inicioSemana.toISOString().slice(0, 10);

      if (!semanas[clave]) {
        semanas[clave] = [];
      }
      semanas[clave].push(venta);
    });

    return Object.entries(semanas).sort(
      ([fechaA], [fechaB]) =>
        new Date(fechaA).getTime() - new Date(fechaB).getTime()
    );
  };

  return (
    <>
      <BuscadorBase setFiltro={setFiltro} filtro={filtro} />
      <div className="grid grid-cols-1 gap-6">
        {datos.map((asesorData, idx) => (
          <div key={idx} className="rounded-xl shadow-md p-4">
            <h1 className="text-2xl text-center text-gray-600 mb-3">
              Sucursal: {asesorData.sucursal}
            </h1>
            <hr className="my-2 border-gray-300" />
            {asesorData.ventas.map((asesorItem, indexAsesor) => {
              const ventasPorSemana = agruparPorSemana(asesorItem.ventaAsesor);
              return (
                <div key={indexAsesor} className="mb-10">
                  <h2 className="text-lg font-bold mb-2">
                    Asesor: {asesorItem.asesor}
                  </h2>

                  {ventasPorSemana.map(
                    ([semanaInicio, ventasSemana], semanaIdx) => {
                      const ventasOrdenadas = [...ventasSemana].sort(
                        (a, b) =>
                          new Date(a.fecha).getTime() -
                          new Date(b.fecha).getTime()
                      );
                      const metaIndividual =
                        ((Math.round(
                          asesorItem.dias *
                            ventasPordiaAsesor(
                              asesorData.ventas,
                              asesorData.metaTicket
                            )
                        ) /
                          asesorData.diasComerciales) *
                          6) |
                        0;

                      const metaMontoIndividual =
                        (asesorData.metaMonto / asesorData.metaTicket) | 0;

                      const metaIndividualPrecioPromedio = ticketPromedio(
                        metaIndividual,
                        metaMontoIndividual
                      );
                      const totalTicket = ventasOrdenadas.reduce(
                        (acc, v) => acc + v.ticket,
                        0
                      );

                      const totalEntregadas = ventasOrdenadas.reduce(
                        (acc, v) => acc + v.entregas,
                        0
                      );

                      const metaLentes = metaIndividual * 0.9;

                      const totalLente = ventasOrdenadas.reduce(
                        (acc, v) => acc + v.cantidadLente,
                        0
                      );

                      const totalTicketPromedio = ticketPromedio(
                        ventasOrdenadas.reduce((acc, v) => acc + v.ticket, 0),
                        ventasOrdenadas.reduce(
                          (acc, v) => acc + v.montoTotalVentas,
                          0
                        )
                      );

                      const totalSeguntoPar = ventasOrdenadas.reduce(
                        (acc, v) => acc + v.segundoPar,
                        0
                      );

                      const metaLentesDeContacto: number = 8;

                      const metaProgresivos: number =
                        asesorData.empresa == "OPTICENTRO" ? 25 : 15;
                      const mentaAntireflejo = 95;
                      return (
                        <div
                          key={semanaIdx}
                          className="bg-white rounded-md border border-gray-200 mb-6 p-3"
                        >
                          <h3 className="text-md font-bold text-gray-700 mb-2">
                            Semana {semanaIdx + 1} (desde {semanaInicio})
                          </h3>

                          <TableContainer component={Paper}>
                            <Table size="small">
                              <TableHead>
                                <TableRow
                                  sx={{
                                    backgroundColor: "#1976d2",
                                    color: "#fff",
                                  }}
                                >
                                  <TableCell
                                    sx={{ color: "#fff", fontWeight: "bold" }}
                                  >
                                    Concepto
                                  </TableCell>
                                  {ventasOrdenadas.map((venta, i) => (
                                    <TableCell
                                      key={i}
                                      sx={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                      }}
                                    >
                                      {mostrarEnDia(venta.fecha)} -{" "}
                                      {venta.fecha}
                                    </TableCell>
                                  ))}
                                  <TableCell
                                    sx={{
                                      color: "#fff",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    Total
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color: "#fff",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    Metas individuales
                                  </TableCell>

                                  <TableCell
                                    sx={{
                                      color: "#fff",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    Cumplimiento
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {[
                                  {
                                    label: "Tickets",
                                    values: ventasOrdenadas.map(
                                      (v) => v.ticket
                                    ),
                                    total: totalTicket,
                                    meta: metaIndividual.toFixed(2),
                                    cumplimiento: `${
                                      metaIndividual > 0
                                        ? (
                                            (totalTicket / metaIndividual) *
                                            100
                                          ).toFixed(2)
                                        : 0
                                    } %`,
                                  },
                                  {
                                    label: "Lentes",
                                    values: ventasOrdenadas.map(
                                      (v) => v.cantidadLente
                                    ),
                                    total: totalLente,
                                    meta: metaLentes,
                                    cumplimiento: `${
                                      metaLentes > 0
                                        ? (
                                            (totalLente / metaLentes) *
                                            100
                                          ).toFixed(2)
                                        : 0
                                    } %`,
                                  },
                                  {
                                    label: "Entregas",
                                    values: ventasOrdenadas.map(
                                      (v) => v.entregas
                                    ),
                                    total: totalEntregadas,
                                    meta: metaIndividual.toFixed(2),
                                    cumplimiento: `${
                                      metaIndividual > 0
                                        ? (
                                            (totalEntregadas / metaIndividual) *
                                            100
                                          ).toFixed(2)
                                        : 0
                                    } %`,
                                  },
                                  {
                                    label: "Progresivos",
                                    values: ventasOrdenadas.map(
                                      (v) => v.progresivos
                                    ),
                                    total: ventasOrdenadas.reduce(
                                      (acc, v) => acc + v.progresivos,
                                      0
                                    ),
                                    meta: `${metaProgresivos} %`,
                                    cumplimiento: `${porcentaje(
                                      ventasOrdenadas.reduce(
                                        (acc, v) => acc + v.progresivos,
                                        0
                                      ),
                                      ventasOrdenadas.reduce(
                                        (acc, v) => acc + v.ticket,
                                        0
                                      )
                                    )} %`,
                                  },
                                  {
                                    label: "Antireflejos",
                                    values: ventasOrdenadas.map(
                                      (v) => v.antireflejos
                                    ),
                                    total: ventasOrdenadas.reduce(
                                      (acc, v) => acc + v.antireflejos,
                                      0
                                    ),
                                    meta: `${mentaAntireflejo} %`,
                                    cumplimiento: `${porcentaje(
                                      ventasOrdenadas.reduce(
                                        (acc, v) => acc + v.antireflejos,
                                        0
                                      ),
                                      ventasOrdenadas.reduce(
                                        (acc, v) => acc + v.ticket,
                                        0
                                      )
                                    )} %`,
                                  },
                                  {
                                    label: "Monto",
                                    values: ventasOrdenadas.map(
                                      (v) => `Bs ${v.montoTotalVentas}`
                                    ),
                                    total:
                                      "Bs " +
                                      ventasOrdenadas
                                        .reduce(
                                          (acc, v) => acc + v.montoTotalVentas,
                                          0
                                        )
                                        .toFixed(2),
                                    meta: `${metaMontoIndividual} Bs`,
                                  },

                                  {
                                    label: "Segundo Par",
                                    values: ventasOrdenadas.map(
                                      (v) => v.segundoPar
                                    ),
                                    total: totalSeguntoPar,

                                    meta: `${30} %`,
                                    cumplimiento: porcentaje(
                                      totalSeguntoPar,
                                      30
                                    ),
                                  },
                                  {
                                    label: "Lente de contacto",
                                    values: ventasOrdenadas.map((v) => v.lc),
                                    total: ventasOrdenadas.reduce(
                                      (acc, v) => acc + v.lc,
                                      0
                                    ),
                                    meta: `${metaLentesDeContacto}%`,
                                    cumplimiento: `${porcentaje(
                                      ventasOrdenadas.reduce(
                                        (acc, v) => acc + v.lc,
                                        0
                                      ),
                                      metaLentesDeContacto
                                    )} %`,
                                  },
                                  {
                                    label: "Atenciones",
                                    values: ventasOrdenadas.map(
                                      (v) => v.atenciones
                                    ),
                                    total: ventasOrdenadas.reduce(
                                      (acc, v) => acc + v.atenciones,
                                      0
                                    ),
                                  },
                                  {
                                    label: "Ticket Promedio",
                                    values: ventasOrdenadas.map(
                                      (v) =>
                                        `Bs ${ticketPromedio(
                                          v.ticket,
                                          v.montoTotalVentas
                                        )}`
                                    ),
                                    total: `Bs ${totalTicketPromedio}`,
                                    meta: metaIndividualPrecioPromedio,
                                  },
                                  {
                                    label: "Tasa de conversión",
                                    values: ventasOrdenadas.map((v) =>
                                      tasaDeConversion(v.ticket, v.atenciones)
                                    ),
                                    total: tasaDeConversion(
                                      ventasOrdenadas.reduce(
                                        (acc, v) => acc + v.ticket,
                                        0
                                      ),
                                      ventasOrdenadas.reduce(
                                        (acc, v) => acc + v.atenciones,
                                        0
                                      )
                                    ),
                                  },
                                ].map((row, i) => (
                                  <TableRow key={i}>
                                    <TableCell>{row.label}</TableCell>
                                    {row.values.map((value, j) => (
                                      <TableCell key={j}>{value}</TableCell>
                                    ))}
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell>
                                      {row.meta ? row.meta : 0}
                                    </TableCell>
                                    <TableCell>
                                      {row.cumplimiento || 0}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {loading && <Loader />}
      </div>
    </>
  );
};
