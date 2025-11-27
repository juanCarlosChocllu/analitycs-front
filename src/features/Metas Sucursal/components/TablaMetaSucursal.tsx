import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import type { MetaSucursalFormateada } from "../interfaces/metaSucursal.interfaces";
import { porcentaje } from "../../app/util/porcentaje";
import {
  abreviarMoneda,
  abreviarMonedaFoot,
} from "../../app/util/abreviarMonenda";
import { calcularVariacionPorcentual } from "../../app/util/varicacion";
import { Fragment, useMemo } from "react";
import { useState } from "react";
import { detalleVenta } from "../services/metaSucursalService";
import type { filtroDetalle } from "../interfaces/filtroDetalle";
import DetalleVentaTable from "./DetalleVenta";
import type {
  DataDetalle,
  DetalleVenta,
} from "../interfaces/DetalleVenta.interface";
import { exporExcelMetasSucursal } from "../utils/fomatearMetas";

interface Props {
  metas: MetaSucursalFormateada[];
  filtro: filtroDetalle;
}

type OrderBy = keyof MetaSucursalFormateada | "varTicket" | "varImport";
type Order = "asc" | "desc";

export const TablaMetaSucursal = ({ metas, filtro }: Props) => {
  const [expandirFila, setExpandirFila] = useState<number | null>(null);
  const [detallesVenta, setDetallesVenta] = useState<DetalleVenta[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>("sucursal");
  const [order, setOrder] = useState<Order>("asc");

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedMetas = useMemo(() => {
    const comparator = (
      a: MetaSucursalFormateada,
      b: MetaSucursalFormateada
    ) => {
      let aValue: any;
      let bValue: any;

      if (orderBy === "varTicket") {
        aValue = calcularVariacionPorcentual(
          a.ticketVentaActual,
          a.ticketVentaAnterior
        );
        bValue = calcularVariacionPorcentual(
          b.ticketVentaActual,
          b.ticketVentaAnterior
        );
      } else if (orderBy === "varImport") {
        aValue = calcularVariacionPorcentual(
          a.importeVentaActual,
          a.importeVentaAnterior
        );
        bValue = calcularVariacionPorcentual(
          b.importeVentaActual,
          b.importeVentaAnterior
        );
      } else {
        aValue = a[orderBy as keyof MetaSucursalFormateada];
        bValue = b[orderBy as keyof MetaSucursalFormateada];
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) {
        return order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    };

    return [...metas].sort(comparator);
  }, [metas, order, orderBy]);

  const handleExpandirFila = async (index: number, idSucursal: string) => {
    setExpandirFila(index === expandirFila ? null : index);

    try {
      const data: DataDetalle = {
        sucursal: idSucursal,
        fechaInicio: filtro.fechaInicio,
        fechaFin: filtro.fechaFin,
        flagVenta: filtro.flagVenta,
        tipoVenta: filtro.tipoVenta,
        comisiona: filtro.comisiona,
      };

      const response = await detalleVenta(data);

      setDetallesVenta(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createSortHandler = (property: OrderBy) => () => {
    handleRequestSort(property);
  };

  const columnConfig = [
    { id: "sucursal" as OrderBy, label: "Sucursal" },
    { id: "montoMetaActual" as OrderBy, label: "Importe Meta (ciclo)" },
    { id: "ticketMetaActual" as OrderBy, label: "Meta Ticket (ciclo)" },
    { id: "importeVentaActual" as OrderBy, label: "Importe Venta" },
    { id: "cumplimientoImporteActual" as OrderBy, label: "CU Importe %" },
    { id: "ticketVentaActual" as OrderBy, label: "Ticket Venta" },
    { id: "cumplimientoTickectActual" as OrderBy, label: "CU Ticket %" },
    { id: "varTicket" as OrderBy, label: "Var ticket" },
    { id: "varImport" as OrderBy, label: "Var import" },
    { id: "montoMetaAnterior" as OrderBy, label: "Importe Meta (ciclo)" },
    { id: "ticketMetaAnterior" as OrderBy, label: "Meta Ticket (ciclo)" },
    { id: "importeVentaAnterior" as OrderBy, label: "Importe Venta" },
    { id: "cumplimientoImporteAnterior" as OrderBy, label: "CU Importe %" },
    { id: "ticketVentaAnterior" as OrderBy, label: "Ticket Venta" },
    { id: "cumplimientoTickectAnterior" as OrderBy, label: "CU Ticket %" },
  ];

  return (
    <div>
      <Button
      onClick={()=> exporExcelMetasSucursal(metas)}
        variant="contained"
        sx={{
          backgroundColor: "green",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
      >
        Excel
      </Button>
      <TableContainer component={Paper} sx={{ mt: 6 }}>
        <Table
          size="small"
          sx={{
            minWidth: 400,
            "& td, & th": {
              fontSize: "0.7rem",
              padding: "4px 8px",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Ventas Actual
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Días hábiles {metas[0]?.diasHabilesActual}
              </TableCell>
              <TableCell align="center" colSpan={3}></TableCell>
              <TableCell align="center" colSpan={3}>
                Ventas Anterior
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Días hábiles {metas[0]?.diasHabilesAnterior}
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "indigo", color: "white" }}>
              {columnConfig.map((column, i) => (
                <TableCell
                  key={i}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                  align="left"
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={createSortHandler(column.id)}
                    sx={{
                      color: "white !important",
                      "&:hover": { color: "white !important" },
                      "&.Mui-active": { color: "white !important" },
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedMetas.map((item, index) => (
              <Fragment key={index}>
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell colSpan={4} sx={{ fontWeight: "bold" }}>
                    Porcentaje de avance ideal {item.indeceAvanceActual} %
                  </TableCell>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell colSpan={4} sx={{ fontWeight: "bold" }}>
                    Porcentaje de avance ideal {item.indeceAvanceAnterior} %
                  </TableCell>
                </TableRow>

                <TableRow hover>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => handleExpandirFila(index, item._id)}
                    >
                      {item.sucursal}
                    </Button>
                  </TableCell>

                  <TableCell sx={{ backgroundColor: "lightgreen" }}>
                    {item.montoMetaActual.toLocaleString("en-US")}{" "}
                    {abreviarMoneda(item.sucursal)}
                  </TableCell>

                  <TableCell sx={{ backgroundColor: "lightgreen" }}>
                    {item.ticketMetaActual}
                  </TableCell>

                  <TableCell>
                    {item.importeVentaActual.toLocaleString("en-US")}{" "}
                    {abreviarMoneda(item.sucursal)}
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor:
                        item.indeceAvanceActual < item.cumplimientoImporteActual
                          ? "lightgreen"
                          : item.indeceAvanceActual >
                            item.cumplimientoImporteActual
                          ? "lightcoral"
                          : "#ffff8d",
                    }}
                  >
                    {item.cumplimientoImporteActual} %
                  </TableCell>

                  <TableCell>{item.ticketVentaActual}</TableCell>

                  <TableCell
                    sx={{
                      backgroundColor:
                        item.indeceAvanceActual < item.cumplimientoTickectActual
                          ? "lightgreen"
                          : item.indeceAvanceActual >
                            item.cumplimientoTickectActual
                          ? "lightcoral"
                          : "#ffff8d",
                    }}
                  >
                    {item.cumplimientoTickectActual} %
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor:
                        calcularVariacionPorcentual(
                          item.ticketVentaActual,
                          item.ticketVentaAnterior
                        ) > 0
                          ? "lightgreen"
                          : calcularVariacionPorcentual(
                              item.ticketVentaActual,
                              item.ticketVentaAnterior
                            ) < 0
                          ? "lightcoral"
                          : "#ffff8d",
                    }}
                  >
                    {calcularVariacionPorcentual(
                      item.ticketVentaActual,
                      item.ticketVentaAnterior
                    )}
                    %
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor:
                        calcularVariacionPorcentual(
                          item.importeVentaActual,
                          item.importeVentaAnterior
                        ) > 0
                          ? "lightgreen"
                          : calcularVariacionPorcentual(
                              item.importeVentaActual,
                              item.importeVentaAnterior
                            ) < 0
                          ? "lightcoral"
                          : "#ffff8d",
                    }}
                  >
                    {calcularVariacionPorcentual(
                      item.importeVentaActual,
                      item.importeVentaAnterior
                    )}
                    %
                  </TableCell>

                  <TableCell sx={{ backgroundColor: "lightblue" }}>
                    {item.montoMetaAnterior.toLocaleString("en-US")}{" "}
                    {abreviarMoneda(item.sucursal)}
                  </TableCell>

                  <TableCell sx={{ backgroundColor: "lightblue" }}>
                    {item.ticketMetaAnterior}
                  </TableCell>

                  <TableCell>
                    {item.importeVentaAnterior.toLocaleString("en-US")}{" "}
                    {abreviarMoneda(item.sucursal)}
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor:
                        item.indeceAvanceAnterior <=
                        item.cumplimientoImporteAnterior
                          ? "lightgreen"
                          : item.indeceAvanceAnterior >
                            item.cumplimientoImporteAnterior
                          ? "lightcoral"
                          : "#ffff8d",
                    }}
                  >
                    {item.cumplimientoImporteAnterior} %
                  </TableCell>

                  <TableCell>{item.ticketVentaAnterior}</TableCell>

                  <TableCell
                    sx={{
                      backgroundColor:
                        item.indeceAvanceAnterior <
                        item.cumplimientoImporteAnterior
                          ? "lightgreen"
                          : item.indeceAvanceAnterior >
                            item.cumplimientoImporteAnterior
                          ? "lightcoral"
                          : "#ffff8d",
                    }}
                  >
                    {item.cumplimientoTickectAnterior} %
                  </TableCell>
                </TableRow>
                {expandirFila === index && (
                  <TableRow>
                    <TableCell colSpan={16}>
                      <Box sx={{ p: 2 }}>
                        <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center uppercase underline">
                          Detalle de Venta
                        </h1>
                        <p className="text-lg font-semibold text-blue-900">
                          Tickets:{" "}
                          <span className="font-mono">
                            {detallesVenta.length}
                          </span>
                        </p>
                        {detallesVenta.length > 0 &&
                          detallesVenta.map((item, index) => (
                            <DetalleVentaTable
                              detalleVenta={item}
                              key={index}
                            />
                          ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                {metas
                  .reduce((acc, item) => acc + item.montoMetaActual, 0)
                  .toLocaleString("en-US")}
                {abreviarMonedaFoot(metas.map((item) => item.sucursal))}
              </TableCell>
              <TableCell>
                {metas.reduce((acc, item) => acc + item.ticketMetaActual, 0)}
              </TableCell>
              <TableCell>
                {metas
                  .reduce((acc, item) => acc + item.importeVentaActual, 0)
                  .toLocaleString("en-US")}
                {abreviarMonedaFoot(metas.map((item) => item.sucursal))}
              </TableCell>
              <TableCell>
                {porcentaje(
                  metas.reduce((acc, item) => acc + item.importeVentaActual, 0),
                  metas.reduce((acc, item) => acc + item.montoMetaActual, 0)
                )}
                %
              </TableCell>
              <TableCell>
                {metas.reduce((acc, item) => acc + item.ticketVentaActual, 0)}
              </TableCell>
              <TableCell>
                {porcentaje(
                  metas.reduce((acc, item) => acc + item.ticketVentaActual, 0),
                  metas.reduce((acc, item) => acc + item.ticketMetaActual, 0)
                )}{" "}
                %
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor:
                    calcularVariacionPorcentual(
                      metas.reduce(
                        (acc, item) => acc + item.ticketVentaActual,
                        0
                      ),
                      metas.reduce(
                        (acc, item) => acc + item.ticketVentaAnterior,
                        0
                      )
                    ) > 0
                      ? "lightgreen"
                      : calcularVariacionPorcentual(
                          metas.reduce(
                            (acc, item) => acc + item.ticketVentaActual,
                            0
                          ),
                          metas.reduce(
                            (acc, item) => acc + item.ticketVentaAnterior,
                            0
                          )
                        ) < 0
                      ? "lightcoral"
                      : "#ffff8d",
                }}
              >
                {calcularVariacionPorcentual(
                  metas.reduce((acc, item) => acc + item.ticketVentaActual, 0),
                  metas.reduce((acc, item) => acc + item.ticketVentaAnterior, 0)
                )}
                %
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor:
                    calcularVariacionPorcentual(
                      metas.reduce(
                        (acc, item) => acc + item.importeVentaActual,
                        0
                      ),
                      metas.reduce(
                        (acc, item) => acc + item.importeVentaAnterior,
                        0
                      )
                    ) > 0
                      ? "lightgreen"
                      : calcularVariacionPorcentual(
                          metas.reduce(
                            (acc, item) => acc + item.importeVentaActual,
                            0
                          ),
                          metas.reduce(
                            (acc, item) => acc + item.importeVentaAnterior,
                            0
                          )
                        ) < 0
                      ? "lightcoral"
                      : "#ffff8d",
                }}
              >
                {calcularVariacionPorcentual(
                  metas.reduce((acc, item) => acc + item.importeVentaActual, 0),
                  metas.reduce(
                    (acc, item) => acc + item.importeVentaAnterior,
                    0
                  )
                )}
                %
              </TableCell>
              <TableCell>
                {metas
                  .reduce((acc, item) => acc + item.montoMetaAnterior, 0)
                  .toLocaleString("en-US")}
                {abreviarMonedaFoot(metas.map((item) => item.sucursal))}
              </TableCell>
              <TableCell>
                {metas.reduce((acc, item) => acc + item.ticketMetaAnterior, 0)}
              </TableCell>
              <TableCell>
                {metas
                  .reduce((acc, item) => acc + item.importeVentaAnterior, 0)
                  .toLocaleString("en-US")}
                {abreviarMonedaFoot(metas.map((item) => item.sucursal))}
              </TableCell>
              <TableCell>
                {porcentaje(
                  metas.reduce(
                    (acc, item) => acc + item.importeVentaAnterior,
                    0
                  ),
                  metas.reduce((acc, item) => acc + item.montoMetaAnterior, 0)
                )}{" "}
                %
              </TableCell>
              <TableCell>
                {metas.reduce((acc, item) => acc + item.ticketVentaAnterior, 0)}
              </TableCell>
              <TableCell>
                {porcentaje(
                  metas.reduce(
                    (acc, item) => acc + item.ticketVentaAnterior,
                    0
                  ),
                  metas.reduce((acc, item) => acc + item.ticketMetaAnterior, 0)
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
