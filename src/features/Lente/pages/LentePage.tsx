import { useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { BuscadorKPI } from "../../app/components/Buscador/BuscadorKPI";
import { useEffect } from "react";
import { kpiEmpresasLentes } from "../services/kpiServices";
import { TablaTotalEmpresa } from "../components/TablaTotalEmpresa";
import { TablaEmpresas } from "../components/TablaEmpresas";


export const LentePage = () => {
    const [filtro, setFiltro] = useState<filtroBuscadorI>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        obtenerKpi();
    }, [filtro]);
    const obtenerKpi = async () => {
        try {
            setLoading(true);
            const kpi = await kpiEmpresasLentes(filtro);
            setData(kpi);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 ">
            <BuscadorKPI setFiltro={setFiltro} filtro={filtro} />
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 h-full p-2">
                        <TablaTotalEmpresa data={data} filtro={filtro} />
                        <TablaEmpresas data={data} filtro={filtro} />
                    </div>
                )}
            </div>
        </div>
    )
}
