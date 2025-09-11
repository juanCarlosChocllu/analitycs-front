import { Stethoscope, Users } from "lucide-react";
import { TotalMedicos } from "./TotalMedicos";
import { TotalOftalmologos } from "./TotalOftalmologos";
import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { calcularTotalesSucursal, formatearImporte, obtenerColorChip, obtenerColorEspecialidad, porcentaje, procesarMedicosData } from "../utils/funcionesDeCalculo";
import { calcularVariacionPorcentual } from "../../app/utils/variacion";
import { BlueCell, GreenCell, HeaderCell, StyledTableContainer, VariationCell } from "../utils/ColoresStyled";
import type { SucursalVenta } from "../interfaces/Medicos";
import { TotalOftometras } from "./TotalOftometras";
import TableSortLabel from '@mui/material/TableSortLabel';
import { useState } from "react";

interface TablaMedicoProps {
  dataActual: SucursalVenta[];
  dataAnterior: SucursalVenta[];
}

// Incluye aquí TODAS las keys para ordenarlas
type Ordenable =
  | "nombre"
  | "e"
  | "ventasLenteLcActual"
  | "cantidadActual"
  | "importeActual"
  | "parUnidadesActual"
  | "parImporteActual"
  | "variacionUnidad"
  | "variacionImporte"
  | "variacionLenteLc"
  | "ventasLenteLcAnterior"
  | "cantidadAnterior"
  | "importeAnterior"
  | "parUnidadesAnterior"
  | "parImporteAnterior"
  | "porcentajeCantidadActual"
  | "porcentajeImporteActual"
  | "porcentajeCantidadAnterior"
  | "porcentajeImporteAnterior";

export const TablaMedico = ({ dataActual, dataAnterior }: TablaMedicoProps) => {
  const [columnaOrdenada, setColumnaOrdenada] = useState<Ordenable>("nombre");
  const [tipoOrdenamiento, setTipoOrdenamiento] = useState<"asc" | "desc">("asc");

  console.log("dataActual tabla", dataActual);
  console.log("dataAnterior tabla", dataAnterior);

  // Función auxiliar para obtener datos anidados
  function getCellValue(medico: any, campo: Ordenable): any {
    // Actual
    if (campo === "ventasLenteLcActual") return medico.ventasLenteLcActual ?? 0;
    if (campo === "cantidadActual") return medico.cantidadActual ?? 0;
    if (campo === "importeActual") return medico.importeActual ?? 0;
    if (campo === "parUnidadesActual") return medico.parUnidadesActual ?? 0;
    if (campo === "parImporteActual") return medico.parImporteActual ?? 0;

    // Variaciones
    if (campo === "variacionUnidad") return medico.variaciones?.unidad ?? 0;
    if (campo === "variacionImporte") return medico.variaciones?.importe ?? 0;
    if (campo === "variacionLenteLc") return medico.variaciones?.lenteLc ?? 0;

    // Anterior
    if (campo === "ventasLenteLcAnterior") return medico.medicoAnterior?.ventasLenteLc ?? 0;
    if (campo === "cantidadAnterior") return medico.medicoAnterior?.cantidad ?? 0;
    if (campo === "importeAnterior") return medico.medicoAnterior?.importe ?? 0;
    if (campo === "parUnidadesAnterior") return medico.parUnidadesAnterior ?? 0;
    if (campo === "parImporteAnterior") return medico.parImporteAnterior ?? 0;

    // Calculados
    if (campo === "porcentajeCantidadAnterior") return medico.porcentajeCantidadAnterior ?? 0;
    if (campo === "porcentajeImporteAnterior") return medico.porcentajeImporteAnterior ?? 0;

    // Básicos
    if (campo === "nombre") return medico.nombre ?? "";
    if (campo === "e") return medico.e ?? "";

    // Default fallback
    return medico[campo];
  }

  // Comparador universal para string y number
  function comparar<T>(a: T, b: T, campo: Ordenable) {
    const valA = getCellValue(a, campo);
    const valB = getCellValue(b, campo);

    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;
    if (typeof valA === "string" && typeof valB === "string") {
      return tipoOrdenamiento === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    if (typeof valA === "number" && typeof valB === "number") {
      return tipoOrdenamiento === "asc"
        ? valA - valB
        : valB - valA;
    }
    return 0;
  }

  // Handler sort
  const handleSort = (campo: Ordenable) => {
    if (columnaOrdenada === campo) {
      setTipoOrdenamiento(tipoOrdenamiento === "asc" ? "desc" : "asc");
    } else {
      setColumnaOrdenada(campo);
      setTipoOrdenamiento("asc");
    }
  };

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
      <div className="overflow-x-auto text-center mt-10">
        <h2 className="text-xl font-bold text-gray-900 uppercase">Tabla de Medicos</h2>
        <TotalMedicos dataActual={dataActual} dataAnterior={dataAnterior} />
        <TotalOftalmologos dataActual={dataActual} dataAnterior={dataAnterior} />
        <TotalOftometras dataActual={dataActual} dataAnterior={dataAnterior} />
        <br />
        <Box className="">
          {dataActual.map((sucursalActual: SucursalVenta, index: number) => {
            const totalRecetasAnterior = dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.totalRecetas || 1;
            const totalImporteAnterior = dataAnterior.find((s: SucursalVenta) => s.sucursal === sucursalActual.sucursal)?.importe || 1;
            const medicosProcessed = procesarMedicosData(
              sucursalActual,
              dataAnterior,
              calcularVariacionPorcentual
            );

            // Enriquecemos cada médico con los campos de porcentaje para ordenar y mostrar
            const medicosWithPercent = medicosProcessed.map((medico) => ({
              ...medico,
              porcentajeCantidadAnterior: porcentaje(medico.medicoAnterior.cantidad || 0, totalRecetasAnterior),
              porcentajeImporteAnterior: porcentaje(medico.medicoAnterior.importe || 0, totalImporteAnterior),
              porcentajeCantidadActual: porcentaje(medico.cantidadActual || 0, sucursalActual.totalRecetas || 1),
              porcentajeImporteActual: porcentaje(medico.importeActual || 0, sucursalActual.importe || 1),
            }));

            // Ordenar por la columna seleccionada
            const medicosOrdenados = [...medicosWithPercent].sort((a, b) => comparar(a, b, columnaOrdenada));

            return (
              <Box key={sucursalActual.idScursal || index} mb={6} className="w-[95%] mx-auto border border-gray-200 rounded-lg pt-4">
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                  {sucursalActual.sucursal}
                </Typography>
                <StyledTableContainer>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "nombre"}
                            direction={columnaOrdenada === "nombre" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("nombre")}
                          >Médico</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "e"}
                            direction={columnaOrdenada === "e" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("e")}
                          >Especialidad</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "ventasLenteLcActual"}
                            direction={columnaOrdenada === "ventasLenteLcActual" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("ventasLenteLcActual")}
                          >Venta lente + lc</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "cantidadActual"}
                            direction={columnaOrdenada === "cantidadActual" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("cantidadActual")}
                          >Venta lente</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "importeActual"}
                            direction={columnaOrdenada === "importeActual" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("importeActual")}
                          >Importe</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "porcentajeCantidadActual"}
                            direction={columnaOrdenada === "porcentajeCantidadActual" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("porcentajeCantidadActual")}
                          >Par unidades</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "porcentajeImporteActual"}
                            direction={columnaOrdenada === "porcentajeImporteActual" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("porcentajeImporteActual")}
                          >Par importe</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "variacionUnidad"}
                            direction={columnaOrdenada === "variacionUnidad" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("variacionUnidad")}
                          >Var lente</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "variacionImporte"}
                            direction={columnaOrdenada === "variacionImporte" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("variacionImporte")}
                          >Var importe</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "variacionLenteLc"}
                            direction={columnaOrdenada === "variacionLenteLc" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("variacionLenteLc")}
                          >Var lente + lc</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "ventasLenteLcAnterior"}
                            direction={columnaOrdenada === "ventasLenteLcAnterior" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("ventasLenteLcAnterior")}
                          >Venta lente + lc</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "cantidadAnterior"}
                            direction={columnaOrdenada === "cantidadAnterior" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("cantidadAnterior")}
                          >Venta lente</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "importeAnterior"}
                            direction={columnaOrdenada === "importeAnterior" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("importeAnterior")}
                          >Importe</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "porcentajeCantidadAnterior"}
                            direction={columnaOrdenada === "porcentajeCantidadAnterior" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("porcentajeCantidadAnterior")}
                          >Par unidades</TableSortLabel>
                        </HeaderCell>
                        <HeaderCell>
                          <TableSortLabel
                            active={columnaOrdenada === "porcentajeImporteAnterior"}
                            direction={columnaOrdenada === "porcentajeImporteAnterior" ? tipoOrdenamiento : "asc"}
                            onClick={() => handleSort("porcentajeImporteAnterior")}
                          >Par importe</TableSortLabel>
                        </HeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medicosOrdenados.map((medico) => (
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
                          <BlueCell>
                            {medico.porcentajeCantidadActual}%
                          </BlueCell>
                          <BlueCell>
                            {medico.porcentajeImporteActual}%
                          </BlueCell>
                          {/* Variaciones */}
                          <VariationCell variation={medico.variaciones?.unidad ?? 0}>
                            <Chip
                              label={`${medico.variaciones?.unidad ?? 0}%`}
                              size="small"
                              color={obtenerColorChip(medico.variaciones?.unidad ?? 0)}
                            />
                          </VariationCell>
                          <VariationCell variation={medico.variaciones?.importe ?? 0}>
                            <Chip
                              label={`${medico.variaciones?.importe ?? 0}%`}
                              size="small"
                              color={obtenerColorChip(medico.variaciones?.importe ?? 0)}
                            />
                          </VariationCell>
                          <VariationCell variation={medico.variaciones?.lenteLc ?? 0}>
                            <Chip
                              label={`${medico.variaciones?.lenteLc ?? 0}%`}
                              size="small"
                              color={obtenerColorChip(medico.variaciones?.lenteLc ?? 0)}
                            />
                          </VariationCell>
                          {/* Datos anteriores */}
                          <GreenCell>{medico.medicoAnterior?.ventasLenteLc ?? 0}</GreenCell>
                          <GreenCell>{medico.medicoAnterior?.cantidad ?? 0}</GreenCell>
                          <GreenCell>{formatearImporte(medico.medicoAnterior?.importe ?? 0, sucursalActual.sucursal)}</GreenCell>
                          <GreenCell>
                            {medico.porcentajeCantidadAnterior}%
                          </GreenCell>
                          <GreenCell>
                            {medico.porcentajeImporteAnterior}%
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
