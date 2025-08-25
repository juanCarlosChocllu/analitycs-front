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
import type { DatosAsesor } from "../../interface/RendimientoDiario";
import { mostrarEnDia } from "../../utils/mostrarDia";
import {
  tasaDeConversion,
  ticketPromedio,
} from "../../../app/util/ticketPromedio";
import { Loader } from "../../../app/components/loader/Loader";

export const ListarRendimiento = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [datos, setDatos] = useState<DatosAsesor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    listarRendimiento();
  }, [filtro]);

  const listarRendimiento = async () => {
    try {
      setLoading(true);
      const response = await listarRendimientoAsesor(filtro);
      setDatos(response.filter((item) => item.ventas.length > 0));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const agruparPorSemana = (ventas: DatosAsesor["ventas"]) => {
    const semanas: Record<string, typeof ventas> = {};
    ventas.forEach((venta) => {
      const fecha = new Date(venta.fecha);
      const dia = fecha.getDay();
      const fechaInicioSemana = new Date(fecha);
      fechaInicioSemana.setDate(fecha.getDate() - (dia === 0 ? 6 : dia - 1));
      fechaInicioSemana.setHours(0, 0, 0, 0);
      const clave = fechaInicioSemana.toISOString().slice(0, 10);

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
          <div key={idx} className="bg-gray-100 rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold text-blue-600 mb-1">
              {asesorData.asesor}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Sucursal: {asesorData.sucursal}
            </p>
            <hr className="my-2 border-gray-300" />

            {agruparPorSemana(asesorData.ventas).map(
              ([semanaInicio, ventasSemana], semanaIdx) => {
                const ventasOrdenadas = [...ventasSemana].sort(
                  (a, b) =>
                    new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
                );

                return (
                  <div
                    key={semanaIdx}
                    className="bg-white rounded-md border border-gray-200 mb-6 p-3"
                  >
                    <h3 className="text-md font-bold text-gray-700 mb-2">
                      Semana {semanaIdx + 1} (desde {semanaInicio})
                    </h3>

                    <TableContainer component={Paper}>
                      <Table size="small" aria-label="rendimiento asesor">
                        <TableHead>
                          <TableRow>
                            <TableCell>Concepto</TableCell>
                            {ventasOrdenadas.map((venta, i) => (
                              <TableCell key={i}>
                                {mostrarEnDia(venta.fecha)} {venta.fecha}
                              </TableCell>
                            ))}
                            <TableCell>Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[
                            {
                              label: "Lentes",
                              values: ventasOrdenadas.map((v) => v.cantidadLente),
                              total: ventasOrdenadas.reduce(
                                (acc, v) => acc + v.cantidadLente,
                                0
                              ),
                            },
                            {
                              label: "Entregas",
                              values: ventasOrdenadas.map((v) => v.entregas),
                              total: ventasOrdenadas.reduce(
                                (acc, v) => acc + v.entregas,
                                0
                              ),
                            },
                            {
                              label: "Progresivos",
                              values: ventasOrdenadas.map((v) => v.progresivos),
                              total: ventasOrdenadas.reduce(
                                (acc, v) => acc + v.progresivos,
                                0
                              ),
                            },
                            {
                              label: "Antireflejos",
                              values: ventasOrdenadas.map((v) => v.antireflejos),
                              total: ventasOrdenadas.reduce(
                                (acc, v) => acc + v.antireflejos,
                                0
                              ),
                            },
                            {
                              label: "Monto",
                              values: ventasOrdenadas.map(
                                (v) => `Bs ${v.montoTotalVentas}`
                              ),
                              total:
                                "Bs " +
                                ventasOrdenadas
                                  .reduce((acc, v) => acc + v.montoTotalVentas, 0)
                                  .toFixed(2),
                            },
                            {
                              label: "Tickets",
                              values: ventasOrdenadas.map((v) => v.ticket),
                              total: ventasOrdenadas.reduce(
                                (acc, v) => acc + v.ticket,
                                0
                              ),
                            },
                            {
                              label: "Segundo Par",
                              values: ventasOrdenadas.map((v) => v.segundoPar),
                              total: ventasOrdenadas.reduce(
                                (acc, v) => acc + v.segundoPar,
                                0
                              ),
                            },
                            {
                              label: "Atenciones",
                              values: ventasOrdenadas.map((v) => v.atenciones),
                              total: ventasOrdenadas.reduce(
                                (acc, v) => acc + v.atenciones,
                                0
                              ),
                            },
                            {
                              label: "Ticket Promedio",
                              values: ventasOrdenadas.map((v) =>
                                `Bs ${ticketPromedio(v.ticket, v.montoTotalVentas)}`
                              ),
                              total: `Bs ${ticketPromedio(
                                ventasOrdenadas.reduce((acc, v) => acc + v.ticket, 0),
                                ventasOrdenadas.reduce(
                                  (acc, v) => acc + v.montoTotalVentas,
                                  0
                                )
                              )}`,
                            },
                            {
                              label: "Tasa de conversión",
                              values: ventasOrdenadas.map((v) =>
                                tasaDeConversion(v.ticket, v.atenciones)
                              ),
                              total: tasaDeConversion(
                                ventasOrdenadas.reduce((acc, v) => acc + v.ticket, 0),
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
        ))}

        {loading && <Loader />}
      </div>
    </>
  );
};
