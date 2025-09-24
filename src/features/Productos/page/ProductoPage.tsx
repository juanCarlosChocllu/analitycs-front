import { BuscadorProductos } from "../components/BuscadorProducto";
import { useEffect, useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import {
  reporteProductoActual,
  reporteProductoAnterior,
} from "../service/productoService";
import type { ProductosStockI } from "../interface/productos";
import { TotalVentaProducto } from "../components/TotalVentaProducto";

import { RotacionInventario } from "../components/RotacionInventario";
import { TotalVentaStock } from "../components/TotalVentaStock";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Building2, ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import TabPanel from "@mui/lab/TabPanel";
import { SucursalesVenta } from "../components/SucursalesVenta";
import { RankPorCadena } from "../components/RankPorCadena";
import { Loader } from "../../app/components/loader/Loader";
import { RankPorRubro } from "../components/RankPorRubro";
import { useEstadoReload } from "../../app/zustand/estadosZustand";
import { RankPorRubroVIP } from "../components/RankPorRubroVip";

export const ProductoPage = () => {
  const [value, setValue] = useState("1");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const { triggerReload } = useEstadoReload();
  const [dataActual, setDataActual] = useState<ProductosStockI[]>([]);
  const [dataAnterior, setDataAnterior] = useState<ProductosStockI[]>([]);

  const [loader, setLoader] = useState<boolean>(false);

  const [filtro, setFiltro] = useState<filtroBuscadorI>({});
  useEffect(() => {
    reporteActualResponse();
  }, [filtro]);

  const reporteActualResponse = async () => {
    try {
      setLoader(true);
      const [Actual, Anterior] = await Promise.all([
        reporteProductoActual(filtro),
        reporteProductoAnterior(filtro),
      ]);

      setDataActual(Actual);
      setDataAnterior(Anterior);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    } finally {
      triggerReload();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 ">
      <BuscadorProductos filtro={filtro} setFiltro={setFiltro} />
      <>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderColor: "divider",
                p: 1,
                gap: 2,
              }}
            >
              <TabList
                onChange={(_, newValue) => handleChange(newValue)}
                aria-label="Tabs"
                sx={{
                  "& .MuiTab-root": {
                    color: "#4c5663",
                    backgroundColor: "#f7f9fa",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    px: 2,
                    py: 1,
                    "&.Mui-selected": {
                      backgroundColor: "#2664eb",
                      color: "#fff",
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                <Tab
                  icon={<ChartNoAxesColumnIncreasingIcon />}
                  label="REPORTE"
                  value="1"
                  sx={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                />
                <Tab
                  icon={<ChartNoAxesColumnIncreasingIcon />}
                  label="RANK POR RUBRO"
                  value="2"
                  sx={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                />
                 <Tab
                  icon={<ChartNoAxesColumnIncreasingIcon />}
                  label="RANK POR RUBRO VIP"
                  value="3"
                  sx={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                />
                <Tab
                  icon={<Building2 />}
                  label="REPORTE SUCURSALES"
                  value="4"
                  sx={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                />
                <Tab
                  icon={<Building2 />}
                  label="Rank por cadena"
                  value="5"
                  sx={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                />
              </TabList>
            </Box>

            <TabPanel value="1">
              <TotalVentaProducto
                dataActual={dataActual}
                dataAnterior={dataAnterior}
              />
              {filtro.fechaFin && filtro.fechaInicio && (
                <TotalVentaStock
                  dataActual={dataActual}
                  dataAnterior={dataAnterior}
                  fechaFin={filtro.fechaFin}
                  fechaInicio={filtro.fechaInicio}
                />
              )}
              <RotacionInventario
                dataActual={dataActual}
                dataAnterior={dataAnterior}
              />
            </TabPanel>
            <TabPanel value="2">
              {filtro.fechaFin && filtro.fechaInicio && (
                <RankPorRubro
                  dataActual={dataActual}
                  fechaFin={filtro.fechaFin}
                  fechaInicio={filtro.fechaInicio}
                />
              )}
            </TabPanel>
              <TabPanel value="3">
              {filtro.fechaFin && filtro.fechaInicio && (
                <RankPorRubroVIP
                  dataActual={dataActual}
                  fechaFin={filtro.fechaFin}
                  fechaInicio={filtro.fechaInicio}
                />
              )}
            </TabPanel>

            <TabPanel value="4">
              {filtro.fechaInicio && filtro.fechaFin && (
                <SucursalesVenta
                  datatActual={dataActual}
                  datatAnterior={dataAnterior}
                  fechaInicio={filtro.fechaInicio}
                  fechaFin={filtro.fechaFin}
                />
              )}
            </TabPanel>

            <TabPanel value="5">
              {filtro.fechaFin && filtro.fechaInicio && (
                <RankPorCadena
                  datatActual={dataActual}
                  fechaFin={filtro.fechaFin}
                  fechaInicio={filtro.fechaInicio}
                />
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </>
      {loader && <Loader />}
    </div>
  );
};
