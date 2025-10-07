import type { Datum, FooterValues, SucursalTableData } from "../interface/sucursal.interface"
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { useState } from "react";
import TablaOrdenada from "../../app/components/Tabla/TablaOrdenada";
import { ModalInformacion } from "./Modal/ModalInformacion";
import { ventaKpiInformacion } from "../services/lenteServices";
import Loading from "../../app/components/Loading/Loading";
import { columnasConFotosensibles, columnasSinFotosensibles, columnasSinFotosensiblesYConFotoCromatico } from "../utils/columnSucurales";
import { transformToTableDataConFotoCromatico, transformToTableDataConFotosensibles, transformToTableDataSinFotosensibles } from "../utils/transformacionATableData";

import {TableCell, TableRow } from "@mui/material";

// Extendemos SucursalTableData para incluir el id
interface SucursalTableDataWithId extends SucursalTableData {
    id: string;
}


interface TablaConFotosensiblesProps {
    data: Datum[];
    filtro: filtroBuscadorI;
    empresa?: string;
    tipoTabla: string;
    footerValues?: FooterValues[];
}

export const TablaSucursales = ({ data, filtro, tipoTabla, footerValues }: TablaConFotosensiblesProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [kpiSucursal, setKpiSucursal] = useState<any>([]);

    const obtenerColumns = () => {
        switch (tipoTabla) {
            case 'fotosensibles':
                return columnasConFotosensibles;
            case 'fotocromatico':
                return columnasSinFotosensiblesYConFotoCromatico;
            case 'sinFotosensibles':
                return columnasSinFotosensibles;
            default:
                return columnasConFotosensibles;
        }
    }

    const transformarData = (data: Datum[]) => {
        switch (tipoTabla) {
            case 'fotosensibles':
                return transformToTableDataConFotosensibles(data);
            case 'fotocromatico':
                return transformToTableDataConFotoCromatico(data);
            case 'sinFotosensibles':
                return transformToTableDataSinFotosensibles(data);
            default:
                return transformToTableDataConFotosensibles(data);
        }
    }
    

    const handleClikInformacionkpi = async (id: string) => {
        const {fechaInicio, fechaFin, tipoVenta, comisiona, flagVenta } = filtro 
        console.log("id de sucursal:", id);  
        console.log("fechaInicio", fechaInicio);  
        console.log("fechaFin", fechaFin);  
        console.log("tipoVenta", tipoVenta);  
        console.log("comisiona", comisiona);  
        console.log("flagVenta", flagVenta);  
        
        try {
            setLoading(true)
            const response = await ventaKpiInformacion(filtro, id)
                
            console.log("response", response?.data);
            
            setKpiSucursal(response?.data)
            setLoading(false)
            setIsModalOpen(true);
        
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    const calcularTotales = (data: any) => {
        const totales = data.reduce((acc: any, item: any) => {
          acc.tickets += item.tickets;
          acc.lentes += item.lentes;
          acc.ocupacional += item.ocupacional;
          acc.antireflejo += item.antireflejo;
          acc.progresivos += item.progresivos;
          acc.progresivosOcupacionales += item.progresivosOcupacionales;
          return acc;
        }, {
          tickets: 0,
          lentes: 0,
          ocupacional: 0,
          antireflejo: 0,
          progresivos: 0,
          progresivosOcupacionales: 0
        });
      
        // Calcular porcentajes totales
        totales.ocupacionalesPercent = Math.round((totales.ocupacional / totales.lentes) * 100);
        totales.antireflejoPercent = Math.round((totales.antireflejo / totales.lentes) * 100);
        totales.progresivosPercent = Math.round((totales.progresivos / totales.lentes) * 100);
        totales.progresivosOcupacionalesPercent = Math.round((totales.progresivosOcupacionales / totales.lentes) * 100);
      
        return totales;
    };
      
    // Ejemplo de uso
    console.log("Datos por sucursal:", data);
    console.log("Totales:", calcularTotales(data));
    
    const dataKpi = transformarData(data);
    const columns = obtenerColumns();
    
    return (
        <div>
            <TablaOrdenada 
                columns={columns as any} 
                rows={dataKpi as any} 
                onActionClick={handleClikInformacionkpi} 
                getRowId={(row: SucursalTableDataWithId) => row.id} 
                actionLabel="Información" 
            >
                {footerValues && (
                    <TableRow>
                        <TableCell></TableCell>
                    {footerValues.map((footerValue, index) => (
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
                <ModalInformacion data={kpiSucursal} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}