import { useEffect, useState } from "react";
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

export const Copia = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [datos, setDatos] = useState<DatosAsesor[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    listarRendimiento();
  }, [filtro]);

  const listarRendimiento = async () => {
    try {
      setLoading(true)
      const response = await listarRendimientoAsesor(filtro);
      
      setDatos(response.filter((item)=> item.ventas.length > 0));
      setLoading(false)
     
    } catch (error) {
       setLoading(false)
      
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
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                    <div className="overflow-auto">
                      <table className="min-w-full text-sm text-left border">
                        <thead className="bg-blue-100">
                          <tr>
                            <th className="p-2 font-semibold border">
                              Concepto
                            </th>
                            {ventasOrdenadas.map((venta, i) => (
                              <th key={i} className="p-2 font-semibold border">
                                {mostrarEnDia(venta.fecha)} {venta.fecha}
                              </th>
                            ))}
                            <th className="p-2 font-semibold border">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">Lentes</td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {venta.cantidadLente}
                              </td>
                            ))}
                            <td className="p-2 border ">
                              {ventasOrdenadas.reduce(
                                (acc, v) => acc + v.cantidadLente,
                                0
                              )}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">Entregas</td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {venta.entregas}
                              </td>
                            ))}
                            <td className="p-2 border">
                              {ventasOrdenadas.reduce(
                                (acc, v) => acc + v.entregas,
                                0
                              )}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">
                              Progresivos
                            </td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {venta.progresivos}
                              </td>
                            ))}
                            <td className="p-2 border ">
                              {ventasOrdenadas.reduce(
                                (acc, v) => acc + v.progresivos,
                                0
                              )}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">
                              Antireflejos
                            </td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {venta.antireflejos}
                              </td>
                            ))}
                            <td className="p-2 border ">
                              {ventasOrdenadas.reduce(
                                (acc, v) => acc + v.antireflejos,
                                0
                              )}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">Monto</td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                Bs {venta.montoTotalVentas}
                              </td>
                            ))}
                            <td className="p-2 border ">
                              Bs{" "}
                              {ventasOrdenadas
                                .reduce((acc, v) => acc + v.montoTotalVentas, 0)
                                .toFixed(2)}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">Tickets</td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {venta.ticket}
                              </td>
                            ))}
                            <td className="p-2 border">
                              {ventasOrdenadas.reduce(
                                (acc, v) => acc + v.ticket,
                                0
                              )}
                            </td>
                          </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">Segundo Par</td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {venta.segundoPar}
                              </td>
                            ))}
                            <td className="p-2 border">
                              {ventasOrdenadas.reduce(
                                (acc, v) => acc + v.segundoPar,
                                0
                              )}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">
                              Atenciones
                            </td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {venta.atenciones}
                              </td>
                            ))}
                            <td className="p-2 border">
                              {ventasOrdenadas.reduce(
                                (acc, v) => acc + v.atenciones,
                                0
                              )}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">
                              Ticket Promedio
                            </td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                Bs{" "}
                                {ticketPromedio(
                                  venta.ticket,
                                  venta.montoTotalVentas
                                )}
                              </td>
                            ))}
                            <td className="p-2 border">
                              Bs{" "}
                              {ticketPromedio(
                                ventasOrdenadas.reduce(
                                  (acc, v) => acc + v.ticket,
                                  0
                                ),
                                ventasOrdenadas.reduce(
                                  (acc, v) => acc + v.montoTotalVentas,
                                  0
                                )
                              )}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-2 border font-medium">
                              Tasa de conversión
                            </td>
                            {ventasOrdenadas.map((venta, i) => (
                              <td key={i} className="p-2 border">
                                {tasaDeConversion(
                                  venta.ticket,
                                  venta.atenciones
                                )}
                              </td>
                            ))}
                            <td className="p-2 border ">
                              {tasaDeConversion(
                                ventasOrdenadas.reduce(
                                  (acc, v) => acc + v.ticket,
                                  0
                                ),
                                ventasOrdenadas.reduce(
                                  (acc, v) => acc + v.atenciones,
                                  0
                                )
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ))}


        {loading && <Loader/>}
      </div>
    </>
  );
};
