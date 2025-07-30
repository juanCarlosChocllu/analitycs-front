import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import type { DataAsesor } from "../interface/asersor.interface"

interface TablaTop10Props {
    data: DataAsesor[];
}
const formatName = (name: string) => {
    const words = name.split(' ');
    if (words.length > 2) {
        return `${words[0]} ${words[1]}...`;
    }
    return name;
};

export const TablaTop10 = ({ data }: TablaTop10Props) => {
    return (
        <TableContainer>
            <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <TableHead>
                    <TableRow className="border-b border-gray-200">
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ranking
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Asesor
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tickets
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sucursal
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cantidad
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Importe Total
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio Promedio
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket Promedio
                        </TableCell>

                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unidad por Ticket
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Venta Total
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rendimiento
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((asesor, index) => (
                        <TableRow key={asesor.asesor} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <TableCell className="py-4 px-4">
                                <div className="flex items-center">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                                        }`}>
                                        {index + 1}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="py-4 px-4">
                                <div>
                                    <p className="font-medium text-gray-900">{formatName(asesor.asesor)}</p>
                                    <p className="text-sm text-gray-500">{asesor.asesor.split(' ').slice(2).join(' ')}</p>
                                </div>
                            </TableCell>
                            <TableCell className="py-4 px-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {asesor.totalTicket}
                                </span>
                            </TableCell>
                            <TableCell className="py-4 px-4">
                                <span className="text-gray-600">{asesor.sucursal}</span>
                            </TableCell>
                            <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {asesor.cantidad}
                            </TableCell>
                            <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {asesor.importeTotalSuma.toLocaleString("en-US")}
                            </TableCell>
                            <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {asesor.precioPromedio.toLocaleString("en-US")}
                            </TableCell>
                            <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {asesor.ticketPromedio.toLocaleString("en-US")}
                            </TableCell>

                            <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {asesor.unidadPorTicket.toFixed(2)}
                            </TableCell>
                            <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {asesor.ventaTotal.toLocaleString("en-US")}
                            </TableCell>
                            <TableCell className="py-4 px-4">
                                <div className="flex items-center">
                                    <TableCell className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                            style={{ width: `${(asesor.totalTicket / data[0].totalTicket) * 100}%` }}
                                        ></div>
                                    </TableCell>
                                    <span className="text-sm text-gray-600">
                                        {Math.round((asesor.totalTicket / data[0].totalTicket) * 100)}%
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow className="font-bold">
                        <TableCell className="px-4 py-2 text-left " colSpan={2} sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "center" }}>TOTAL</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "center" }}>
                            {data.reduce(
                                (total, asesor) => total + asesor.totalTicket,
                                0
                            )}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left" colSpan={1}></TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                            {data.reduce((total, asesor) => total + asesor.cantidad, 0)}
                        </TableCell>

                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                            {data
                                .reduce((total, asesor) => total + asesor.importeTotalSuma, 0)
                                .toLocaleString("en-US")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                            {(
                                data.reduce(
                                    (total, asesor) => total + asesor.importeTotalSuma,
                                    0
                                ) /
                                data.reduce((total, asesor) => total + asesor.cantidad, 0)
                            ).toLocaleString("en-US")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                            {(
                                data.reduce(
                                    (total, asesor) => total + asesor.importeTotalSuma,
                                    0
                                ) /
                                data.reduce(
                                    (total, asesor) => total + asesor.totalTicket,
                                    0
                                )
                            ).toLocaleString("en-US")}
                        </TableCell>

                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                            {(
                                data.reduce(
                                    (total, asesor) => total + asesor.cantidad,
                                    0
                                ) /
                                data.reduce(
                                    (total, asesor) => total + asesor.totalTicket,
                                    0
                                )
                            ).toLocaleString("en-US")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "left" }}>
                            {data
                                .reduce((total, asesor) => total + asesor.ventaTotal, 0)
                                .toLocaleString("en-US")}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}