import { useEffect, useState, Fragment, useContext } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";
import type { VentaMestaAsesor } from "../interface/RendimientoDiario";
import { ListarAvanceMetasAsesor } from "../service/RendimientoDiarioService";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Button,
  Collapse,
} from "@mui/material";
import { DetalleAvanceMetaAsesor } from "../components/asesor/DetalleAvanceMetaAsesor";
import { TablaMetaHeader } from "../components/TablaMetaHeader";
import { TablaMetasInformacion } from "../components/TablaMetasInformacion";
import {
  cumplimientoMetaAsesor,
  metasFaltantes,
  ventasPordiaAsesor,
} from "../utils/rendimientoUtil";
import { AutenticacionContext } from "../../app/context/AuntenticacionProvider";

export const AvanceMetasAsesorPage = () => {
  const { nombreAsesor, rol } = useContext(AutenticacionContext);
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [datos, setDatos] = useState<VentaMestaAsesor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [asesorExpandidoIndex, setAsesorExpandidoIndex] = useState<{
    sucursalIndex: number;
    asesorIndex: number;
  } | null>(null);

  useEffect(() => {
    listarRendimiento();
  }, [filtro]);

  const listarRendimiento = async () => {
    try {
      setLoading(true);
      const response = await ListarAvanceMetasAsesor(filtro);
      const data: VentaMestaAsesor[] = response
        .map((item) => {
          const ventaFiltrada = item.ventaAsesor.filter((a) =>
            a.ventas.some((v) => v.ticket > 0)
          );
          return { ...item, ventaAsesor: ventaFiltrada };
        })
        .filter((item) => item.ventaAsesor.length > 0);

      setDatos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDetalle = (sucursalIndex: number, asesorIndex: number) => {
    if (
      asesorExpandidoIndex &&
      asesorExpandidoIndex.sucursalIndex === sucursalIndex &&
      asesorExpandidoIndex.asesorIndex === asesorIndex
    ) {
      setAsesorExpandidoIndex(null);
    } else {
      setAsesorExpandidoIndex({ sucursalIndex, asesorIndex });
    }
  };

  return (
    <Box>
      <BuscadorBase setFiltro={setFiltro} filtro={filtro} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {datos.map((d, sucursalIndex) => (
            <Fragment key={sucursalIndex}>
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                {d.sucursal}
              </Typography>
              {rol == "ADMINISTARDIOR" && datos.length > 0 && (
                <>
                  <TablaMetaHeader
                    diasComerciales={d.diasComerciales}
                    metaTicket={d.metaTicket}
                  />
                  <TablaMetasInformacion
                    diasComerciales={d.diasComerciales}
                    metaTicket={d.metaTicket}
                    venta={d.ventaAsesor}
                  />
                </>
              )}

              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Asesor</TableCell>
                      <TableCell>Días</TableCell>
                      <TableCell>Meta</TableCell>
                      <TableCell>Total Ticket</TableCell>
                      <TableCell>% Cumplimiento</TableCell>
                      <TableCell>Falta</TableCell>
                      <TableCell>Detalle</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {d.ventaAsesor
                      .filter((item) => {
                        if (rol != "ADMINISTRADOR") {
                          return item.asesor === nombreAsesor;
                        }
                        return true;
                      })
                      .map((item, asesorIndex) => {
                        const isExpanded =
                          asesorExpandidoIndex?.sucursalIndex ===
                            sucursalIndex &&
                          asesorExpandidoIndex?.asesorIndex === asesorIndex;

                        return (
                          <Fragment key={asesorIndex}>
                            <TableRow>
                              <TableCell>{item.asesor}</TableCell>
                              <TableCell>{item.dias}</TableCell>
                              <TableCell>
                                {Math.round(
                                  item.dias *
                                    ventasPordiaAsesor(
                                      d.ventaAsesor,
                                      d.metaTicket
                                    )
                                )}
                              </TableCell>
                              <TableCell>
                                {item.ventas.reduce(
                                  (acc, venta) => acc + venta.ticket,
                                  0
                                )}
                              </TableCell>
                              <TableCell>
                                {cumplimientoMetaAsesor(
                                  item.ventas.reduce(
                                    (acc, venta) => acc + venta.ticket,
                                    0
                                  ),
                                  Math.round(
                                    item.dias *
                                      ventasPordiaAsesor(
                                        d.ventaAsesor,
                                        d.metaTicket
                                      )
                                  )
                                )}{" "}
                                %
                              </TableCell>
                              <TableCell>
                            
                                {metasFaltantes(
                                  Math.round(
                                    item.dias *
                                      ventasPordiaAsesor(
                                        d.ventaAsesor,
                                        d.metaTicket
                                      )
                                  ),
                                  item.ventas.reduce(
                                    (acc, venta) => acc + venta.ticket,
                                    0
                                  )
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() =>
                                    toggleDetalle(sucursalIndex, asesorIndex)
                                  }
                                >
                                  {isExpanded ? "Cerrar" : "Detalle"}
                                </Button>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell colSpan={7} sx={{ padding: 0 }}>
                                <Collapse
                                  in={isExpanded}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Box
                                    sx={{
                                      padding: 2,
                                      backgroundColor: "#fafafa",
                                    }}
                                  >
                                    <DetalleAvanceMetaAsesor
                                      detalle={item.ventas}
                                    />
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        );
                      })}
                  </TableBody>
                  {rol == "ADMINISTRADOR" && (
                    <TableBody>
                      <TableRow
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                      >
                        <TableCell>
                          <strong>Total</strong>
                        </TableCell>
                        <TableCell>
                          {d.ventaAsesor.reduce(
                            (acc, item) => acc + item.dias,
                            0
                          )}
                        </TableCell>
                        <TableCell>
                          {Math.round(
                            d.ventaAsesor.reduce(
                              (acc, item) =>
                                acc +
                                item.dias *
                                  ventasPordiaAsesor(
                                    d.ventaAsesor,
                                    d.metaTicket
                                  ),
                              0
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {d.ventaAsesor.reduce(
                            (acc, item) =>
                              acc +
                              item.ventas.reduce(
                                (a, venta) => a + venta.ticket,
                                0
                              ),
                            0
                          )}
                        </TableCell>
                        <TableCell>
                          {cumplimientoMetaAsesor(
                            Math.round(
                              d.ventaAsesor.reduce(
                                (acc, item) =>
                                  acc +
                                  item.dias *
                                    ventasPordiaAsesor(
                                      d.ventaAsesor,
                                      d.metaTicket
                                    ),
                                0
                              )
                            ),
                            d.ventaAsesor.reduce(
                              (acc, item) =>
                                acc +
                                item.ventas.reduce(
                                  (a, venta) => a + venta.ticket,
                                  0
                                ),
                              0
                            )
                          )}
                          %
                        </TableCell>
                        <TableCell>
                          {metasFaltantes(
                            Math.round(
                              d.ventaAsesor.reduce(
                                (acc, item) =>
                                  acc +
                                  item.dias *
                                    ventasPordiaAsesor(
                                      d.ventaAsesor,
                                      d.metaTicket
                                    ),
                                0
                              )
                            ),
                            d.ventaAsesor.reduce(
                              (acc, item) =>
                                acc +
                                item.ventas.reduce(
                                  (a, venta) => a + venta.ticket,
                                  0
                                ),
                              0
                            )
                          )}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Fragment>
          ))}
        </>
      )}
    </Box>
  );
};
