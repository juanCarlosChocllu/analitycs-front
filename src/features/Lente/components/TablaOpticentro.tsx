import type { Datum, SucursalTableData } from "../interface/sucursal.interface"
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import { useState } from "react";
import TablaOrdenada from "../../app/components/Tabla/TablaOrdenada";
import { ModalInformacion } from "./Modal/ModalInformacion";
import { ventaKpiInformacion } from "../services/lenteServices";
import Loading from "../../app/components/Loading/Loading";

// Extendemos SucursalTableData para incluir el id
interface SucursalTableDataWithId extends SucursalTableData {
    id: string;
}

interface TablaOpticentroProps {
    data: Datum[];
    filtro: filtroBuscadorI;
    empresa?: string;
}

export const TablaOpticentro = ({ data, filtro }: TablaOpticentroProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [kpiSucursal, setKpiSucursal] = useState<any>([]);

    const columns = [
        { id: 'sucursal', label: "Sucursal" },
        { id: 'tickets', label: "Tickets" },
        { id: 'lentes', label: "Lentes" },
        { id: 'ocupacional', label: "Ocupacional" },
        { id: 'porcentajeOcupacionales', label: " Ocupacionales % " },
        { id: 'antireflejo', label: "Antireflejo" },
        { id: 'porcentajeAntireflejo', label: " Antireflejo % " },
        { id: 'progresivos', label: "Progresivos" },
        { id: 'porcentajeProgresivos', label: "Progresivos % " },
        { id: 'progresivosOcupacionales', label: "Progr. + Ocup." },
        { id: 'progresivosOcupacionalesPorcentaje', label: "Progr. + Ocup. % " },
    ];

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
      
    // Función modificada para incluir el id en los datos transformados
    function transformToTableData(data: Datum[]): SucursalTableDataWithId[] {
        return data.map(sucursal => {
            const kpi = sucursal.dataKpi[0]; 
            
            return {
                id: sucursal.id, // Preservamos el id original
                sucursal: sucursal.sucursal,
                tickets: kpi.tickets as number,
                lentes: kpi.lentes as number,
                ocupacional: kpi.ocupacional as number,
                porcentajeOcupacionales: kpi.porcentajeOcupacionales as number,
                antireflejo: kpi.antireflejo as number,
                porcentajeAntireflejo: kpi.porcentajeAntireflejo as number,
                progresivos: kpi.progresivos as number,
                porcentajeProgresivos: kpi.porcentajeProgresivos as number,
                progresivosOcupacionales: kpi.progresivosOcupacionales as number,
                progresivosOcupacionalesPorcentaje: kpi.progresivosOcupacionalesPorcentaje as number
            };
        });
    }
    
    const dataKpi = transformToTableData(data);
    
    return (
        <div>
            <TablaOrdenada 
                columns={columns as any} 
                rows={dataKpi as any} 
                onActionClick={handleClikInformacionkpi} 
                getRowId={(row: SucursalTableDataWithId) => row.id} // Especificamos cómo obtener el id
                actionLabel="Información" 
            />
            {loading ? (
                <Loading open={loading} />
            ) : isModalOpen && (
                <ModalInformacion data={kpiSucursal} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}