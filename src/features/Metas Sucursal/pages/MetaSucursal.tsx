import { useEffect, useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { CircularProgress } from "@mui/material";
import { formatearMetas } from "../utils/fomatearMetas";
import { metasSucursalActual, metasSucursalAnterior } from "../services/metaSucursalService";
import type { MetaSucursalFormateada } from "../interfaces/metaSucursal.interfaces";
import { TablaMetaSucursal } from "../components/TablaMetaSucursal";
import { Goal, Target } from "lucide-react";
import type { filtroDetalle } from "../interfaces/filtroDetalle";
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";



export const MetaSucursal = () => {
    const [loading, setLoading] = useState(false);
    const [buscador, setBuscador] = useState<filtroBuscadorI>({});
    const [metas, setMetas] = useState<MetaSucursalFormateada[]>([]);
    const [filtroDetalle, setFiltroDetalle] = useState<filtroDetalle>({
        fechaInicio: "",
        fechaFin: "",
        flagVenta: "",
        comisiona: null,
        tipoVenta: []
    });
    useEffect(() => {

        const handleSearch = async () => {
        try {
            setLoading(true);
            const [responseActual, responseAnterior] = await Promise.all([
                metasSucursalActual(buscador),
                metasSucursalAnterior(buscador),
            ]);

            
            setMetas(formatearMetas(responseActual , responseAnterior));
            setFiltroDetalle({
                fechaInicio: buscador.fechaInicio || "",
                fechaFin: buscador.fechaFin || "",
                flagVenta: buscador.flagVenta || "",
                comisiona: buscador.comisiona || null,
                tipoVenta: buscador.tipoVenta || []
            })
            console.log("buscador", buscador);
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
            <BuscadorBase setFiltro={setBuscador} filtro={buscador} />
            {loading ? (
                <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
            ) : (
                metas.length > 0 ? (
                    <TablaMetaSucursal metas={metas} filtro={filtroDetalle} />
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Goal className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                      Metas de sucursal
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
