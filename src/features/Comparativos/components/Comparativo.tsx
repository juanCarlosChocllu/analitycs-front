import { Box, Typography } from "@mui/material";
import { Buscador } from "../../app/components/Buscador/Buscador";
import { useEffect, useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { getVentaActual, getVentaAnterior } from "../service/ComprativoService";
import type { ComparativoData } from "../interface/compartivo";
import { Loader } from "../../app/components/loader/Loader";
import { Card } from "./Card";
import { ListarTodasLasEmpresas } from "./ListarTodasLasEmpresas";
import { TablaVentaSucursal } from "./ListarVentaSucursal";
import { GraficoComparativo } from "./GraficoComparativo";
import { GraficoComparativoAnual } from "./GraficoComparativoAnual";

export const Comparativo = () => {
  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [responseActual, setResponseActual] = useState<ComparativoData>();
  const [responseAnterior, setResponseActerior] = useState<ComparativoData>();
  const region = localStorage.getItem("region");

  useEffect(() => {
    listarVentas();
  }, [filtro]);

  const listarVentas = async () => {
    try {
      setLoading(true);
      const [responseActual, responseAnterior] = await Promise.all([
        getVentaActual(filtro),
        getVentaAnterior(filtro),
      ]);
      setResponseActerior(responseAnterior);
      setResponseActual(responseActual);
      console.log("responseActual", JSON.stringify(responseActual.dataDiaria)); 
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
  };
  return (
    <Box>
      <Buscador filtro={filtro} setFiltro={setFiltro} />
      {responseActual
        && responseAnterior && <ListarTodasLasEmpresas ventaActual={responseActual?.venta} ventaAnterior={responseAnterior?.venta} />}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            {responseActual && responseAnterior && (
              <>
                <section className=" p-4 bg-gray-50 shadow-md mb-6 justify-center items-center">
                  <GraficoComparativoAnual dataActual={responseActual.dataDiaria} dataAnterior={responseAnterior.dataDiaria} region={region?.toString() || "BOLIVIA"}/>
                </section>
                <section className="p-4 border rounded-lg bg-gray-50 shadow-md mb-6 justify-center items-center">
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', textTransform: 'uppercase' }}>Comparativo de Ventas Actuales</Typography>
                  <GraficoComparativo data={responseActual.dataDiaria} region={region?.toString() || "BOLIVIA"}/>
                </section>
                <section className="p-4 border rounded-lg bg-gray-100 shadow-md mb-6">
                  <h1 className="text-xl font-semibold mb-4 text-center">
                    Venta actual
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Card
                      title="CANT SUCURSALES"
                      value={responseActual.cantidadSucursal}
                    />
                    <Card
                      title="TOTAL VENTA"
                      value={responseActual.ventaSucursal.data.total}
                    />
                    <Card title="TCP" value={0} />
                    <Card
                      title="VENTA X DIA"
                      value={responseActual.ventaSucursal.data.ventaPorDia}
                    />
                    <Card
                      title="TKT PROMEDIO"
                      value={responseActual.ventaSucursal.data.ticketPromedio}
                    />
                    <Card title="TRAFICO" value={0} />
                  </div>
                </section>.
                <section className="p-4 border rounded-lg bg-gray-50 shadow-md mb-6 justify-center items-center">
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', textTransform: 'uppercase' }}>Comparativo de Ventas Anteriores</Typography>
                  <GraficoComparativo data={responseAnterior.dataDiaria} region={region?.toString() || "BOLIVIA"}/>
                </section>

                <section className="p-4 border rounded-lg bg-gray-100 shadow-md">
                  <h1 className="text-xl font-semibold mb-4 text-center">
                    Venta anterior
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Card
                      title="CANT SUCURSALES"
                      value={responseAnterior.cantidadSucursal}
                    />
                    <Card
                      title="TOTAL VENTA"
                      value={responseAnterior.ventaSucursal.data.total}
                    />
                    <Card title="TCP" value={0} />
                    <Card
                      title="VENTA X DIA"
                      value={responseAnterior.ventaSucursal.data.ventaPorDia}
                    />
                    <Card
                      title="TKT PROMEDIO"
                      value={responseAnterior.ventaSucursal.data.ticketPromedio}
                    />
                    <Card title="TRAFICO" value={0} />
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </div>
      {responseActual && responseAnterior && <TablaVentaSucursal data={responseActual} dataAnterior={responseAnterior} />}
    </Box>
  );
};
