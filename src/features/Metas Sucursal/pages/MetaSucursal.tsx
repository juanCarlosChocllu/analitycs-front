import { useEffect, useState } from "react";
import { Buscador } from "../../app/components/Buscador/Buscador";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { CircularProgress } from "@mui/material";
import { formatearMetas } from "../utils/fomatearMetas";
import { metasSucursalActual, metasSucursalAnterior } from "../services/metaSucursalService";
import type { MetaSucursalFormateada } from "../interfaces/metaSucursal.interfaces";
import { TablaMetaSucursal } from "../components/TablaMetaSucursal";
import { Goal, Target } from "lucide-react";

export const MetaSucursal = () => {
    const [loading, setLoading] = useState(false);
    const [buscador, setBuscador] = useState<filtroBuscadorI>({});
    const [metas, setMetas] = useState<MetaSucursalFormateada[]>([]);
    useEffect(() => {

        const handleSearch = async () => {
        try {
            setLoading(true);
            const [responseActual, responseAnterior] = await Promise.all([
                metasSucursalActual(buscador),
                metasSucursalAnterior(buscador),
            ]);
    
            setMetas(formatearMetas(responseActual , responseAnterior));
            setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      handleSearch();
      }, [buscador]);
    return (
        <div>
            <h1 className="text-2xl font-bold text-center uppercase text-blue-950 mb-6 mt-4">Meta Sucursal</h1>
            <Buscador setFiltro={setBuscador} filtro={buscador} />
            {loading ? (
                <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
            ) : (
                metas.length > 0 ? (
                    <TablaMetaSucursal metas={metas} />
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Goal className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Resultados de KPIs Médicos
                      </h3>
                    </div>
                    <div className="text-center py-12 text-gray-500">
                      <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-sm">No se encontraron metas</p>
                      <p className="text-xs text-gray-400 mt-1">Puede que los filtros no coincidan con los datos</p>
                    </div>
                  </div>
                )
            )}
        </div>
    )
}
