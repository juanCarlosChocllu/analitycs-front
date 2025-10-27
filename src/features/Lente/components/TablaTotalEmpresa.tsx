import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import type { Kpisucursal } from "../interface/sucursal.interface";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { ventaKpiInformacionTodasEmpresas } from "../services/lenteServices";

interface TablaTotalEmpresaProps {
    data: Kpisucursal[];
    filtro: filtroBuscadorI;
}

export const TablaTotalEmpresa = ({ data, filtro }: TablaTotalEmpresaProps) => {
    const handleClikInformacionkpi =async () => {
        try {
            const response = await ventaKpiInformacionTodasEmpresas(filtro);
            console.log('falta', response);
            

        } catch (error) {
            console.log(error);
        }
    }
    let tickets = 0;
    let lentes = 0;
    let antireflejo = 0;
    let ocupacional = 0;
    let progresivos = 0;
    let fotosensibles = 0;
    let fotoCromatico = 0;
    for (let e of data) {
        for (let d of e.data) {
            for (let kpi of d.dataKpi) {
                tickets += kpi.tickets ? kpi.tickets : 0;
                lentes += kpi.lentes ? kpi.lentes : 0;
                antireflejo += kpi.antireflejo ? kpi.antireflejo : 0;
                ocupacional += kpi.ocupacional ? kpi.ocupacional : 0;
                progresivos += kpi.progresivos ? kpi.progresivos : 0;
                fotosensibles += kpi.fotosensibles ? kpi.fotosensibles : 0;
                fotoCromatico += kpi.fotoCromatico ? kpi.fotoCromatico : 0;
            }
        }
    }
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                TOTAL DE TODAS LAS CADENAS
            </h2>
            <div className="overflow-x-auto">
                <Table className="min-w-full text-xs text-left text-gray-500">
                    <TableHead className="text-xs text-gray-700 bg-gray-100">
                        <TableRow>
                            <TableCell className="px-6 py-3"></TableCell>
                            <TableCell className="px-6 py-3">Ticket</TableCell>
                            <TableCell className="px-6 py-3">Lentes</TableCell>
                            <TableCell className="px-6 py-3">Antir.</TableCell>
                            <TableCell className="px-6 py-3">Antir. %</TableCell>
                            <TableCell className="px-6 py-3">Ocup.</TableCell>
                            <TableCell className="px-6 py-3">Ocup. %</TableCell>
                            <TableCell className="px-6 py-3">Progr.</TableCell>
                            <TableCell className="px-6 py-3">Progr. %</TableCell>
                            <TableCell className="px-6 py-3">Fotos.</TableCell>
                            <TableCell className="px-6 py-3">Fotos. %</TableCell>
                            <TableCell className="px-6 py-3">Foto Crom.</TableCell>
                            <TableCell className="px-6 py-3">Foto Crom. %</TableCell>
                            <TableCell className="px-6 py-3">Progr. + Ocup. %</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="text-xs">
                            <TableCell className="px-6 py-3">
                                <Button
                                    onClick={() => {
                                        handleClikInformacionkpi();
                                    }}
                                >
                                    Total
                                </Button>
                            </TableCell>
                            <TableCell className="px-6 py-4">{tickets}</TableCell>
                            <TableCell className="px-6 py-4">{lentes}</TableCell>
                            <TableCell className="px-6 py-4">{antireflejo}</TableCell>
                            <TableCell className="px-6 py-4">
                                {((antireflejo / lentes) * 100).toFixed(0)}%
                            </TableCell>
                            <TableCell className="px-6 py-4">{ocupacional}</TableCell>
                            <TableCell className="px-6 py-4">
                                {((ocupacional / lentes) * 100).toFixed(0)}%
                            </TableCell>
                            <TableCell className="px-6 py-4">{progresivos}</TableCell>
                            <TableCell className="px-6 py-4">
                                {((progresivos / lentes) * 100).toFixed(0)}%
                            </TableCell>
                            <TableCell className="px-6 py-4">{fotosensibles}</TableCell>
                            <TableCell className="px-6 py-4">
                                {((fotosensibles / lentes) * 100).toFixed(0)}%
                            </TableCell>
                            <TableCell className="px-6 py-4">{fotoCromatico}</TableCell>
                            <TableCell className="px-6 py-4">
                                {((fotoCromatico / lentes) * 100).toFixed(0)}%
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                {(((progresivos + ocupacional) / lentes) * 100).toFixed(0)}%
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
