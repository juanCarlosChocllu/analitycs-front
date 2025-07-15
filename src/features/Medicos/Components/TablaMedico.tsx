import { Stethoscope, Users } from "lucide-react"
import { TotalMedicos } from "./TotalMedicos";
import { TotalOftalmologos } from "./TotalOftalmologos";
import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { calcularTotalesSucursal, formatearImporte, obtenerColorChip, obtenerColorEspecialidad, porcentaje, procesarMedicosData } from "../utils/funcionesDeCalculo";
import { calcularVariacionPorcentual } from "../../app/utils/variacion";
import { BlueCell, GreenCell, HeaderCell, StyledTableContainer, VariationCell } from "../utils/ColoresStyled";
import type { SucursalVenta } from "../interfaces/Medicos";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


interface TablaMedicoProps {
  dataActual: SucursalVenta[];
  dataAnterior: SucursalVenta[];
}

export const TablaMedico = ({ dataActual, dataAnterior }: TablaMedicoProps) => {
  console.log("dataActual", dataActual);
  console.log("dataAnterior", dataAnterior);

  return (
    (dataActual.length === 0 && dataAnterior.length === 0) ? (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Resultados de KPIs Médicos
          </h3>
        </div>
        <div className="text-center py-12 text-gray-500">
          <Stethoscope className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-sm">Configure los filtros para visualizar los KPIs de desempeño</p>
          <p className="text-xs text-gray-400 mt-1">Los datos se actualizarán automáticamente</p>
        </div>
      </div>
    ) : (
      <div className="overflow-x-auto text-center">
        <h2>Tabla de Medicos</h2>
        <TotalMedicos dataActual={dataActual} dataAnterior={dataAnterior} />
        {/* <TotalOftometras /> */} //TODO: implementar
        <TotalOftalmologos dataActual={dataActual} dataAnterior={dataAnterior} /> 
        <br />
        <Box>
          {dataActual.map((sucursalActual: SucursalVenta, index: number) => {
            const medicosProcessed = procesarMedicosData(
              sucursalActual,
              dataAnterior,
              calcularVariacionPorcentual
            );

            return (
              <Box key={sucursalActual.idScursal || index} mb={6}>
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                  {sucursalActual.sucursal}
                </Typography>

                <StyledTableContainer>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Médico <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Especialidad <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Venta lente + lc <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Venta lente <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Importe <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Par unidades <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Par importe <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Var lente <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Var importe <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Var lente + lc <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Venta lente + lc <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Venta lente <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Importe <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Par unidades <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                        <HeaderCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            Par importe <ArrowUpwardIcon fontSize="small" />
                          </Box>
                        </HeaderCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {medicosProcessed.map((medico) => (
                        <TableRow key={medico.nombre} hover>
                          <TableCell>{medico.nombre}</TableCell>
                          <TableCell>
                            <Chip
                              label={medico.e}
                              size="small"
                              sx={{
                                backgroundColor: obtenerColorEspecialidad(medico.e),
                                color: 'white',
                                fontSize: '0.75rem'
                              }}
                            />
                          </TableCell>

                          {/* Datos actuales */}
                          <BlueCell>{medico.ventasLenteLcActual || 0}</BlueCell>
                          <BlueCell>{medico.cantidadActual || 0}</BlueCell>
                          <BlueCell>{formatearImporte(medico.importeActual || 0, sucursalActual.sucursal)}</BlueCell>
                          <BlueCell>{porcentaje(medico.cantidadActual || 0, sucursalActual.totalRecetas)}%</BlueCell>
                          <BlueCell>{porcentaje(medico.importeActual || 0, sucursalActual.importe)}%</BlueCell>

                          {/* Variaciones */}
                          <VariationCell variation={medico.variaciones.unidad}>
                            <Chip
                              label={`${medico.variaciones.unidad}%`}
                              size="small"
                              color={obtenerColorChip(medico.variaciones.unidad)}
                            />
                          </VariationCell>
                          <VariationCell variation={medico.variaciones.importe}>
                            <Chip
                              label={`${medico.variaciones.importe}%`}
                              size="small"
                              color={obtenerColorChip(medico.variaciones.importe)}
                            />
                          </VariationCell>
                          <VariationCell variation={medico.variaciones.lenteLc}>
                            <Chip
                              label={`${medico.variaciones.lenteLc}%`}
                              size="small"
                              color={obtenerColorChip(medico.variaciones.lenteLc)}
                            />
                          </VariationCell>

                          {/* Datos anteriores */}
                          <GreenCell>{medico.medicoAnterior.ventasLenteLc || 0}</GreenCell>
                          <GreenCell>{medico.medicoAnterior.cantidad || 0}</GreenCell>
                          <GreenCell>{formatearImporte(medico.medicoAnterior.importe || 0, sucursalActual.sucursal)}</GreenCell>
                          <GreenCell>
                            {porcentaje(
                              medico.medicoAnterior.cantidad || 0,
                              dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.totalRecetas || 1
                            )}%
                          </GreenCell>
                          <GreenCell>
                            {porcentaje(
                              medico.medicoAnterior.importe || 0,
                              dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.importe || 1
                            )}%
                          </GreenCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableHead>
                      <TableRow>
                        <HeaderCell>TOTAL</HeaderCell>
                        <HeaderCell></HeaderCell>
                        <HeaderCell>{calcularTotalesSucursal(sucursalActual.data).totalVentasLenteLc}</HeaderCell>
                        <HeaderCell>{calcularTotalesSucursal(sucursalActual.data).totalCantidad}</HeaderCell>
                        <HeaderCell>
                          {formatearImporte(
                            calcularTotalesSucursal(sucursalActual.data).totalImporte,
                            sucursalActual.sucursal
                          )}
                        </HeaderCell>
                        <HeaderCell>100%</HeaderCell>
                        <HeaderCell>100%</HeaderCell>
                        <HeaderCell>
                          {
                            calcularVariacionPorcentual(
                              calcularTotalesSucursal(sucursalActual.data).totalCantidad,
                              calcularTotalesSucursal(
                                dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.data || []
                              ).totalCantidad
                            )
                          }%
                        </HeaderCell>
                        <HeaderCell>
                          {
                            calcularVariacionPorcentual(
                              calcularTotalesSucursal(sucursalActual.data).totalImporte,
                              calcularTotalesSucursal(
                                dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.data || []
                              ).totalImporte
                            )
                          }%
                        </HeaderCell>
                        <HeaderCell>
                          {
                            calcularVariacionPorcentual(
                              calcularTotalesSucursal(sucursalActual.data).totalVentasLenteLc,
                              calcularTotalesSucursal(
                                dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.data || []
                              ).totalVentasLenteLc
                            )
                          }%
                        </HeaderCell>
                        <HeaderCell>
                          {calcularTotalesSucursal(
                            dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.data || []
                          ).totalVentasLenteLc}
                        </HeaderCell>
                        <HeaderCell>
                          {calcularTotalesSucursal(
                            dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.data || []
                          ).totalCantidad}
                        </HeaderCell>
                        <HeaderCell>
                          {formatearImporte(
                            calcularTotalesSucursal(
                              dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.data || []
                            ).totalImporte,
                            sucursalActual.sucursal
                          )}
                        </HeaderCell>
                        <HeaderCell>100%</HeaderCell>
                        <HeaderCell>100%</HeaderCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </StyledTableContainer>
              </Box>
            );
          })}
        </Box>
      </div>
    )
  )
}
