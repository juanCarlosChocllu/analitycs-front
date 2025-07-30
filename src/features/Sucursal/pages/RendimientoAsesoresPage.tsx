import { useEffect, useState } from "react";
import { Buscador } from "../../app/components/Buscador/Buscador";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { Loader } from "lucide-react";
import { Top10Ticket } from "../components/Top10Ticket";
import type { DataAsesor } from "../interface/asersor.interface";
import { getIndicadoresPorAsesor } from "../service/sucursalService";
import { EmptyState } from "../../app/components/NoEncontrado/EmptyState";

const sugerencias = [
    "Verifica si ingresaste correctamente los filtros",
]

export const RendimientoAsesoresPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [filtro, setFiltro] = useState<filtroBuscadorI>({});
    const [data, setData] = useState<DataAsesor[]>([]);
    useEffect(() => {
        listarIndicadoresAsesor();
    }, [filtro]);
    const listarIndicadoresAsesor = async () => {
        try {
            setLoading(true);
            const response = await getIndicadoresPorAsesor(filtro);
            setData(response);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener indicadores:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 ">

            <Buscador setFiltro={setFiltro} filtro={filtro} />
            {data.length === 0 ? <EmptyState suggestions={sugerencias} /> : (
                <>
                    {loading ? <Loader className="animate-spin" />
                        :
                        <>
                            <Top10Ticket data={data} atributo="totalTicket" title="Top 10 Vendedores Ticket" tipo="ticket" />
                            <Top10Ticket data={data} atributo="ventaTotal" title="Top 10 Vendedores Venta" tipo="venta" />
                        </>
                    }
                </>
            )}



        </div>
    )
}
