import { Box, Button, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material"
import Paper from "@mui/material/Paper"
import type { MetaSucursalFormateada } from "../interfaces/metaSucursal.interfaces"
import { porcentaje } from "../../app/util/porcentaje"
import { abreviarMoneda, abreviarMonedaFoot } from "../../app/util/abreviarMonenda"
import { calcularVariacionPorcentual } from "../../app/util/varicacion"
import { Fragment } from "react/jsx-runtime"
import { useState } from "react"
import { detalleVenta } from "../services/metaSucursalService"
import type { filtroDetalle } from "../interfaces/filtroDetalle"
import DetalleVentaTable from "./DetalleVenta"
import type { DataDetalle, DetalleVenta } from "../interfaces/DetalleVenta.interface"


interface Props {
    metas: MetaSucursalFormateada[];
    filtro: filtroDetalle;
}

export const TablaMetaSucursal = ({ metas, filtro }: Props) => {
    const [expandirFila, setExpandirFila] = useState<number | null>(null);
    const [detallesVenta, setDetallesVenta] = useState<DetalleVenta[]>([]);


    const handleExpandirFila = async(index: number, idSucursal: string) => {
        setExpandirFila(index === expandirFila ? null : index);
     
        try {
            const data: DataDetalle = {
                sucursal: idSucursal,
                fechaInicio:filtro.fechaInicio,
                fechaFin: filtro.fechaFin,
                flagVenta: filtro.flagVenta,
                tipoVenta: filtro.tipoVenta,
                comisiona: filtro.comisiona,
            }
        
            const response = await detalleVenta(data);
         
            setDetallesVenta(response);
        } catch (error) {
            console.log(error);
        }

    };    
    return (
        <div className="flex w-[95%] mx-auto">
        <TableContainer component={Paper} sx={{ mt: 6 }}>
            <Table
                size="small"
                sx={{
                    minWidth: 400,
                    '& td, & th': {
                        fontSize: '0.7rem',
                        padding: '4px 8px',
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Ventas Actual
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                            Días hábiles {metas[0].diasHabilesActual}
                        </TableCell>
                        <TableCell align="center" colSpan={3}></TableCell>
                        <TableCell align="center" colSpan={3}>
                            Ventas Anterior
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            Días hábiles {metas[0].diasHabilesAnterior}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: 'indigo', color: 'white' }}>
                        {[
                            'Sucursal',
                            'Importe Meta (ciclo)',
                            'Meta Ticket (ciclo)',
                            'Importe Venta',
                            'CU Importe %',
                            'Ticket Venta',
                            'CU Ticket %',
                            'Var ticket',
                            'Var import',
                            'Importe Meta (ciclo)',
                            'Meta Ticket (ciclo)',
                            'Importe Venta',
                            'CU Importe %',
                            'Ticket Venta',
                            'CU Ticket %',
                        ].map((headCell, i) => (
                            <TableCell
                                key={i}
                                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}
                                align="left"
                            >
                                {headCell}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {metas.map((item, index) => (
                        <Fragment key={index}>
                            <TableRow>
                                <TableCell colSpan={3}></TableCell>
                                <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                                    Porcentaje de avance ideal {item.indeceAvanceActual} %
                                </TableCell>
                                <TableCell colSpan={3}></TableCell>
                                <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                                    Porcentaje de avance ideal {item.indeceAvanceAnterior} %
                                </TableCell>
                            </TableRow>

                            <TableRow hover>
                                <TableCell>
                                    <Button variant="text" onClick={() => handleExpandirFila(index, item._id)}>
                                        {item.sucursal}
                                    </Button>
                                </TableCell>

                                <TableCell sx={{ backgroundColor: 'lightgreen' }}>
                                    {item.montoMetaActual.toLocaleString('en-US')}{' '}
                                    {abreviarMoneda(item.sucursal)}
                                </TableCell>

                                <TableCell sx={{ backgroundColor: 'lightgreen' }}>
                                    {item.ticketMetaActual}
                                </TableCell>

                                <TableCell>
                                    {item.importeVentaActual.toLocaleString('en-US')}{' '}
                                    {abreviarMoneda(item.sucursal)}
                                </TableCell>

                                <TableCell
                                    sx={{
                                        backgroundColor:
                                            item.indeceAvanceActual < item.cumplimientoImporteActual
                                                ? 'lightgreen'
                                                : item.indeceAvanceActual > item.cumplimientoImporteActual
                                                    ? 'lightcoral'
                                                    : '#ffff8d',
                                    }}
                                >
                                    {item.cumplimientoImporteActual} %
                                </TableCell>

                                <TableCell>{item.ticketVentaActual}</TableCell>

                                <TableCell
                                    sx={{
                                        backgroundColor:
                                            item.indeceAvanceActual < item.cumplimientoTickectActual
                                                ? 'lightgreen'
                                                : item.indeceAvanceActual > item.cumplimientoTickectActual
                                                    ? 'lightcoral'
                                                    : '#ffff8d',
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
                                                ? 'lightgreen'
                                                : calcularVariacionPorcentual(
                                                    item.ticketVentaActual,
                                                    item.ticketVentaAnterior
                                                ) < 0
                                                    ? 'lightcoral'
                                                    : '#ffff8d',
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
                                                ? 'lightgreen'
                                                : calcularVariacionPorcentual(
                                                    item.importeVentaActual,
                                                    item.importeVentaAnterior
                                                ) < 0
                                                    ? 'lightcoral'
                                                    : '#ffff8d',
                                    }}
                                >
                                    {calcularVariacionPorcentual(
                                        item.importeVentaActual,
                                        item.importeVentaAnterior
                                    )}
                                    %
                                </TableCell>

                                <TableCell sx={{ backgroundColor: 'lightblue' }}>
                                    {item.montoMetaAnterior.toLocaleString('en-US')}{' '}
                                    {abreviarMoneda(item.sucursal)}
                                </TableCell>

                                <TableCell sx={{ backgroundColor: 'lightblue' }}>
                                    {item.ticketMetaAnterior}
                                </TableCell>

                                <TableCell>
                                    {item.importeVentaAnterior.toLocaleString('en-US')}{' '}
                                    {abreviarMoneda(item.sucursal)}
                                </TableCell>

                                <TableCell
                                    sx={{
                                        backgroundColor:
                                            item.indeceAvanceAnterior <= item.cumplimientoImporteAnterior
                                                ? 'lightgreen'
                                                : item.indeceAvanceAnterior > item.cumplimientoImporteAnterior
                                                    ? 'lightcoral'
                                                    : '#ffff8d',
                                    }}
                                >
                                    {item.cumplimientoImporteAnterior} %
                                </TableCell>

                                <TableCell>{item.ticketVentaAnterior}</TableCell>

                                <TableCell
                                    sx={{
                                        backgroundColor:
                                            item.indeceAvanceAnterior < item.cumplimientoImporteAnterior
                                                ? 'lightgreen'
                                                : item.indeceAvanceAnterior > item.cumplimientoImporteAnterior
                                                    ? 'lightcoral'
                                                    : '#ffff8d',
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
                                                Tickets: <span className="font-mono">{detallesVenta.length}</span>
                                            </p>
                                            {detallesVenta.length > 0 && (
                                                detallesVenta.map((item, index) => (
                                                    <DetalleVentaTable detalleVenta={item} key={index} />
                                                ))
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </Fragment>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow

                    >
                        <TableCell>Total</TableCell>
                        <TableCell>
                            {metas.reduce((acc, item) => acc + item.montoMetaActual, 0).toLocaleString('en-US')}
                            {abreviarMonedaFoot(metas.map(item => item.sucursal))}
                        </TableCell>
                        <TableCell >
                            {metas.reduce((acc, item) => acc + item.ticketMetaActual, 0)}
                        </TableCell>
                        <TableCell>
                            {metas.reduce((acc, item) => acc + item.importeVentaActual, 0).toLocaleString('en-US')}
                            {abreviarMonedaFoot(metas.map(item => item.sucursal))}
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
                            )}{' '}
                            %
                        </TableCell>
                        <TableCell
                            sx={{
                                backgroundColor:
                                    calcularVariacionPorcentual(
                                        metas.reduce((acc, item) => acc + item.ticketVentaActual, 0),
                                        metas.reduce((acc, item) => acc + item.ticketVentaAnterior, 0)
                                    ) > 0
                                        ? 'lightgreen'
                                        : calcularVariacionPorcentual(
                                            metas.reduce((acc, item) => acc + item.ticketVentaActual, 0),
                                            metas.reduce((acc, item) => acc + item.ticketVentaAnterior, 0)
                                        ) < 0
                                            ? 'lightcoral'
                                            : '#ffff8d',
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
                                        metas.reduce((acc, item) => acc + item.importeVentaActual, 0),
                                        metas.reduce((acc, item) => acc + item.importeVentaAnterior, 0)
                                    ) > 0
                                        ? 'lightgreen'
                                        : calcularVariacionPorcentual(
                                            metas.reduce((acc, item) => acc + item.importeVentaActual, 0),
                                            metas.reduce((acc, item) => acc + item.importeVentaAnterior, 0)
                                        ) < 0
                                            ? 'lightcoral'
                                            : '#ffff8d',
                            }}
                        >
                            {calcularVariacionPorcentual(
                                metas.reduce((acc, item) => acc + item.importeVentaActual, 0),
                                metas.reduce((acc, item) => acc + item.importeVentaAnterior, 0)
                            )}
                            %
                        </TableCell>
                        <TableCell >
                            {metas.reduce((acc, item) => acc + item.montoMetaAnterior, 0).toLocaleString('en-US')}
                            {abreviarMonedaFoot(metas.map(item => item.sucursal))}
                        </TableCell>
                        <TableCell >
                            {metas.reduce((acc, item) => acc + item.ticketMetaAnterior, 0)}
                        </TableCell>
                        <TableCell>
                            {metas.reduce((acc, item) => acc + item.importeVentaAnterior, 0).toLocaleString('en-US')}
                            {abreviarMonedaFoot(metas.map(item => item.sucursal))}
                        </TableCell>
                        <TableCell>
                            {porcentaje(
                                metas.reduce((acc, item) => acc + item.importeVentaAnterior, 0),
                                metas.reduce((acc, item) => acc + item.montoMetaAnterior, 0)
                            )}{' '}
                            %
                        </TableCell>
                        <TableCell>
                            {metas.reduce((acc, item) => acc + item.ticketVentaAnterior, 0)}
                        </TableCell>
                        <TableCell >
                            {porcentaje(
                                metas.reduce((acc, item) => acc + item.ticketVentaAnterior, 0),
                                metas.reduce((acc, item) => acc + item.ticketMetaAnterior, 0)
                            )}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        </div>
    )
}
