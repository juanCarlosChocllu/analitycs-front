import { useEffect, useState } from "react";

import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { getIndicadoresPorSucursal } from "../service/sucursalService";
import Typography from "@mui/material/Typography";
import type {
  GraficoIndicadorSucursalI,
  IndicadoresSucursalI,
  SucursalData,
} from "../interface/IndicadorSucursal";
import { Box } from "@mui/material";
import { IndicadoresCuadro } from "./IndicadoresCuadro";
import { Grafico } from "./Grafico";
import dayjs from "dayjs";
import { Loader } from "../../app/components/loader/Loader";
import { Download } from "lucide-react";
import { exportarExcelPorSucursal } from "../utils/exportarExcel/exportarIndicadoreSucursal";
import { TablaIndicadores } from "./TablaIndicadores";
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";

export const IndicadorSucursal = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [loader, setLoader] = useState<boolean>(false);

  const [data, setData] = useState<IndicadoresSucursalI>();
  const [dataSucursal, setDataSucursal] = useState<SucursalData[]>([]);

  useEffect(() => {
    listarIndicadoresSucursal();
  }, [filtro]);

  const listarIndicadoresSucursal = async () => {
    try {
      setLoader(true);
      const response = await getIndicadoresPorSucursal(filtro);
      setData(response);
      setDataSucursal(response.dataSucursal.filter((item)=> item.totalTicket > 0));
      setLoader(false);
    } catch (error) {
      console.error("Error al obtener indicadores:", error);
    } finally {
      setLoader(false);
    }
  };

  const dataset: GraficoIndicadorSucursalI[] =
    data && data?.dataDiaria.length > 0
      ? data.dataDiaria.map((item) => {
          const resultado: GraficoIndicadorSucursalI = {
            fecha: item.fecha,
            fechaFormateada: dayjs(item.fecha).format("DD MMMM"),
            precioPromedio: item.precioPromedio,
            ticketPromedio: item.ticketPromedio,
            cantidad: item.cantidad,
            ventaDiaria: item.ventaTotal,
            tickets: item.tickets,
          };
          return resultado;
        })
      : [];

  return (
    <Box sx={{ p: 3}}>
      <BuscadorBase filtro={filtro} setFiltro={setFiltro} />

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        📊 Indicadores por Sucursal
      </Typography>
      {data && (
        <IndicadoresCuadro
          sucursal={data?.sucursales}
          tcPromedio={data?.tcPromedio}
          ticketPromedio={data?.ticketPromedio}
          totalVentas={data?.totalVentas}
          unidadPorTicket={data?.unidadPorTickect}
          ventaPorDia={data?.ventaDiariaPorLocal}
        />
      )}
      {data && (
        <button
          onClick={() => exportarExcelPorSucursal(data.dataSucursal)}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto flex items-center gap-2"
        >
          <Download />
          Exportar
        </button>
      )}
      {data && <Grafico data={dataset} />}
      <Box sx={{ mt: 4 }}>
        <TablaIndicadores data={dataSucursal} />
      </Box>
      {loader && <Loader />}
    </Box>
  );
};
