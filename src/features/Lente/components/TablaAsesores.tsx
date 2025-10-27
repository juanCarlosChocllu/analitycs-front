import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { useState } from "react";
import TablaOrdenada from "../../app/components/Tabla/TablaOrdenada";
import { informacionLenteAsesor } from "../services/lenteServices";
import Loading from "../../app/components/Loading/Loading";

import {TableCell, TableRow } from "@mui/material";
import type { Datum, InformacionAsesor, Venta, VentaAsesor } from "../interface/asesor.interface";
import { columnasAsesoresConFotosensibles, columnasAsesoresSinFotosensibles, columnasAsesoresSinFotosensiblesYConFotoCromatico } from "../utils/columnAsesores";
import { transformToTableDataConFotoCromaticoAsesor, transformToTableDataConFotosensiblesAsesor, transformToTableDataSinFotosensiblesAsesor } from "../utils/transformacionATableDataAsesor";
import type { FooterColumnConfig } from "../../app/interfaces/FooterColumnConfig";
import { useFooterTotals } from "../../app/util/footerGenerico";
import { ModalGenerico } from "./Modal/ModalGenerico";



interface FooterValues {
    columnId: string;
    value: string;
}

interface TablaConFotosensiblesProps {
    data: Datum;
    filtro: filtroBuscadorI;
    empresa?: string;
    tipoTabla: string;
    footerValues?: FooterValues[];
}

// Configuraciones para diferentes tipos de tabla (siguiendo el orden exacto de las columnas)
const getFooterColumns = (tipoTabla: string): FooterColumnConfig[] => {
    switch (tipoTabla) {
        case 'fotosensibles':
            // Orden: asesor, tickets, lentes, antireflejo, %, fotosensibles, %, ocupacional, %, progresivos, %, progr+ocup, %
            return [
                { key: 'tickets', type: 'sum' },
                { key: 'lentes', type: 'sum' },
                { key: 'antireflejo', type: 'sum' },
                { 
                    key: 'porcentajeAntireflejo', 
                    type: 'percentage', 
                    numeratorKey: 'antireflejo', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'fotosensibles', type: 'sum' },
                { 
                    key: 'procentajeFotosensibles', 
                    type: 'percentage', 
                    numeratorKey: 'fotosensibles', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'ocupacional', type: 'sum' },
                { 
                    key: 'porcentajeOcupacionales', 
                    type: 'percentage', 
                    numeratorKey: 'ocupacional', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'progresivos', type: 'sum' },
                { 
                    key: 'porcentajeProgresivos', 
                    type: 'percentage', 
                    numeratorKey: 'progresivos', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'progresivosOcupacionales', type: 'sum' },
                { 
                    key: 'progresivosOcupacionalesPorcentaje', 
                    type: 'percentage', 
                    numeratorKey: 'progresivosOcupacionales', 
                    denominatorKey: 'lentes',
                    decimals: 0
                }
            ];

        case 'fotocromatico':
            // Orden: asesor, tickets, lentes, antireflejo, %, progresivos, %, fotoCromatico, %
            return [
                { key: 'tickets', type: 'sum' },
                { key: 'lentes', type: 'sum' },
                { key: 'antireflejo', type: 'sum' },
                { 
                    key: 'porcentajeAntireflejo', 
                    type: 'percentage', 
                    numeratorKey: 'antireflejo', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'progresivos', type: 'sum' },
                { 
                    key: 'porcentajeProgresivos', 
                    type: 'percentage', 
                    numeratorKey: 'progresivos', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'fotoCromatico', type: 'sum' },
                { 
                    key: 'procentajeFotoCromatico', 
                    type: 'percentage', 
                    numeratorKey: 'fotoCromatico', 
                    denominatorKey: 'lentes',
                    decimals: 0
                }
            ];

        case 'sinFotosensibles':
        default:
            // Orden: asesor, tickets, lentes, ocupacional, %, antireflejo, %, progresivos, %, progr+ocup, %
            return [
                { key: 'tickets', type: 'sum' },
                { key: 'lentes', type: 'sum' },
                { key: 'ocupacional', type: 'sum' },
                { 
                    key: 'porcentajeOcupacionales', 
                    type: 'percentage', 
                    numeratorKey: 'ocupacional', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'antireflejo', type: 'sum' },
                { 
                    key: 'porcentajeAntireflejo', 
                    type: 'percentage', 
                    numeratorKey: 'antireflejo', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'progresivos', type: 'sum' },
                { 
                    key: 'porcentajeProgresivos', 
                    type: 'percentage', 
                    numeratorKey: 'progresivos', 
                    denominatorKey: 'lentes',
                    decimals: 0
                },
                { key: 'progresivosOcupacionales', type: 'sum' },
                { 
                    key: 'progresivosOcupacionalesPorcentaje', 
                    type: 'percentage', 
                    numeratorKey: 'progresivosOcupacionales', 
                    denominatorKey: 'lentes',
                    decimals: 0
                }
            ];
    }
};


export const TablaAsesores = ({ data, filtro, tipoTabla, footerValues }: TablaConFotosensiblesProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [asesorData, setAsesorData] = useState<InformacionAsesor>();

    const obtenerColumns = () => {
        switch (tipoTabla) {
            case 'fotosensibles':
                return columnasAsesoresConFotosensibles;
            case 'fotocromatico':
                return columnasAsesoresSinFotosensiblesYConFotoCromatico;
            case 'sinFotosensibles':
                return columnasAsesoresSinFotosensibles;
            default:
                return columnasAsesoresConFotosensibles;
        }
    }

    const transformarData = (data: Venta[]) => {
        switch (tipoTabla) {
            case 'fotosensibles':
                return transformToTableDataConFotosensiblesAsesor(data);
            case 'fotocromatico':
                return transformToTableDataConFotoCromaticoAsesor(data);
            case 'sinFotosensibles':
                return transformToTableDataSinFotosensiblesAsesor(data);
            default:
                return transformToTableDataConFotosensiblesAsesor(data);
        }
    }

    const handleClikInformacionkpi = async (id: string) => {

      
        
        try {
            setLoading(true)
            const response = await informacionLenteAsesor(id, filtro)
                
            console.log("response", response);
            
            setAsesorData(response)
            setLoading(false)
            setIsModalOpen(true);
        
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    // Usar la función genérica en lugar de calcularTotales
    const footerColumns = getFooterColumns(tipoTabla);
    const totals = useFooterTotals(data.venta, footerColumns);
    
 
    const dataKpi = transformarData(data.venta);
    const columns = obtenerColumns();

    // Generar footerValues dinámicamente si no se proporcionan
    const dynamicFooterValues: FooterValues[] = footerColumns.map(column => ({
        columnId: column.key,
        value: column.type === 'percentage' 
            ? `${totals[column.key]}%` 
            : totals[column.key].toString()
    }));
    
    return (
        <div>
            <TablaOrdenada 
                columns={columns as any} 
                rows={dataKpi as VentaAsesor[]} 
                onActionClick={handleClikInformacionkpi} 
                getRowId={(row: VentaAsesor) => row.id}
            >
                {(footerValues || dynamicFooterValues) && (
                    <TableRow>
                        <TableCell></TableCell>
                        {(footerValues || dynamicFooterValues).map((footerValue, index) => (
                            <TableCell key={index} align="right">
                                {footerValue.value}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TablaOrdenada>
            {loading ? (
                <Loading open={loading} />
            ) : isModalOpen && (
                <ModalGenerico data={asesorData as InformacionAsesor} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}