import { BuscadorProductos } from "../components/BuscadorProducto";
import { useEffect, useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import {
  reporteProductoActual,
  reporteProductoAnterior,
} from "../service/productoService";
import type {
  DataEmpresaI,
  ProductoEmpresaI,
  ProductoI,
  ProductosStockI,
  VentaStockI,
  VentaStockSucursalI,
} from "../interface/productos";
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
import { consolidarMedicoData } from "../../Medicos/utils/funcionesDeCalculo";

export const ProductoPage = () => {
  const [value, setValue] = useState("1");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const [totalVentaStock, setTotalVentaStock] = useState<VentaStockI[]>([]);
  const [dataActual, setDataActual] = useState<ProductosStockI[]>([]);
  const [dataEmpresa, setDataEmpresa] = useState<DataEmpresaI[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [totalVentaStockSucursal, setTotalVentaStockSucursal] = useState<
    VentaStockSucursalI[]
  >([]);
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
      setTotalVentaStock(
        agruparVentaProductosPorRubroYCategoria(Actual, Anterior)
      );
      setTotalVentaStockSucursal(agruparPorSucursal(Actual, Anterior));
      setDataEmpresa(agruparPorEmpresa(Actual));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
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
                  icon={<Building2 />}
                  label="REPORTE SUCURSALES"
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
                  icon={<Building2 />}
                  label="Rank por cadena"
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
              </TabList>
            </Box>

            <TabPanel value="1">
              <TotalVentaProducto ventaTotalStock={totalVentaStock} />
              {filtro.fechaFin && filtro.fechaInicio && (
                <TotalVentaStock
                  ventaTotalStock={totalVentaStock}
                  fechaFin={filtro.fechaFin}
                  fechaInicio={filtro.fechaInicio}
                />
              )}
              <RotacionInventario ventaTotalStock={totalVentaStock} />
            </TabPanel>

            <TabPanel value="2">
              {filtro.fechaInicio && filtro.fechaFin && (
                <SucursalesVenta
                  data={totalVentaStockSucursal}
                  fechaInicio={filtro.fechaInicio}
                  fechaFin={filtro.fechaFin}
                />
              )}
            </TabPanel>

            <TabPanel value="3">
              { filtro.fechaFin && filtro.fechaInicio && <RankPorCadena  data={dataEmpresa}  fechaFin={filtro.fechaFin} fechaInicio={filtro.fechaInicio}/>}
            </TabPanel>
          </TabContext>
        </Box>
      </>
      {loader && <Loader />}
    </div>
  );
};

function agruparVentaProductosPorRubroYCategoria(
  dataActual: ProductosStockI[],
  dataAnterior: ProductosStockI[]
): VentaStockI[] {
  const agrupado: Record<
    string,
    Record<
      string,
      {
        ventaActual: number;
        ventasAnterior: number;
        presupuesto: number;
        stockSucursal: number;
        stockDeposito: number;
      }
    >
  > = {};

  for (const item of dataAnterior) {
    for (const producto of item.productos) {
      const { rubro, categoria, cantidadVentas } = producto;
      if (!agrupado[rubro]) {
        agrupado[rubro] = {};
      }
      if (!agrupado[rubro][categoria]) {
        agrupado[rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockDeposito: 0,
          stockSucursal: 0,
        };
      }
      agrupado[rubro][categoria].ventasAnterior += cantidadVentas;
    }
  }

  for (const item of dataActual) {
    for (const producto of item.productos) {
      const { rubro, categoria, cantidadVentas, stock ,cantidadCotizaciones} = producto;
      if (!agrupado[rubro]) {
        agrupado[rubro] = {};
      }
      if (!agrupado[rubro][categoria]) {
        agrupado[rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockDeposito: 0,
          stockSucursal: 0,
        };
      }

      agrupado[rubro][categoria].ventaActual += cantidadVentas;
       agrupado[rubro][categoria].presupuesto += cantidadCotizaciones;
      if (stock && stock.length > 0) {
        for (const s of stock) {
          if (s.tipo === "ALMACEN") {
            agrupado[rubro][categoria].stockDeposito += s.cantidad;
          } else if (s.tipo === "SUCURSAL") {
            agrupado[rubro][categoria].stockSucursal += s.cantidad;
          }
        }
      }
    }
  }

  const resultado = Object.entries(agrupado).map(([rubro, categorias]) => ({
    rubro,
    categorias: Object.entries(categorias).map(([categoria, valores]) => ({
      categoria,
      ...valores,
    })),
  }));

  return resultado;
}

function agruparPorSucursal(
  datatActual: ProductosStockI[],
  datatAnterior: ProductosStockI[]
): VentaStockSucursalI[] {
  const agrupado: Record<
    string,
    Record<
      string,
      Record<
        string,
        {
          ventaActual: number;
          ventasAnterior: number;
          presupuesto: number;
          stockSucursal: number;
          stockDeposito: number;
        }
      >
    >
  > = {};

  for (const item of datatActual) {
    const sucursal = item.sucursal;
    for (const producto of item.productos) {
      const rubro = producto.rubro;
      const categoria = producto.categoria;

      if (!agrupado[sucursal]) {
        agrupado[sucursal] = {};
      }
      if (!agrupado[sucursal][rubro]) {
        agrupado[sucursal][rubro] = {};
      }
      if (!agrupado[sucursal][rubro][categoria]) {
        agrupado[sucursal][rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockSucursal: 0,
          stockDeposito: 0,
        };
      }

      agrupado[sucursal][rubro][categoria].ventaActual +=
        producto.cantidadVentas;
      if (producto && producto.stock.length > 0) {
        for (const s of producto.stock) {
          if (s.tipo === "ALMACEN") {
            agrupado[sucursal][rubro][categoria].stockDeposito += s.cantidad;
          } else if (s.tipo === "SUCURSAL") {
            agrupado[sucursal][rubro][categoria].stockSucursal += s.cantidad;
          }
        }
      }
    }
  }

  for (const item of datatAnterior) {
    const sucursal = item.sucursal;

    for (const producto of item.productos) {
      const rubro = producto.rubro;
      const categoria = producto.categoria;

      if (!agrupado[sucursal]) {
        agrupado[sucursal] = {};
      }
      if (!agrupado[sucursal][rubro]) {
        agrupado[sucursal][rubro] = {};
      }
      if (!agrupado[sucursal][rubro][categoria]) {
        agrupado[sucursal][rubro][categoria] = {
          ventaActual: 0,
          ventasAnterior: 0,
          presupuesto: 0,
          stockSucursal: 0,
          stockDeposito: 0,
        };
      }

      agrupado[sucursal][rubro][categoria].ventasAnterior +=
        producto.cantidadVentas;
    }
  }
  const resultado = Object.entries(agrupado).map(([sucursal, rubros]) => ({
    sucursal,
    rubros: Object.entries(rubros).map(([rubro, categorias]) => ({
      rubro,
      categorias: Object.entries(categorias).map(([categoria, valores]) => ({
        categoria,
        ...valores,
      })),
    })),
  }));

  return resultado;
}

function agruparPorEmpresa(dataActual: ProductosStockI[]): DataEmpresaI[] {
  const agrupado: Record<string, Record<string, ProductoEmpresaI>> = {};

  for (const item of dataActual) {
    const empresa = item.empresa;

    if (!agrupado[empresa]) {
      agrupado[empresa] = {};
    }

    for (const producto of item.productos) {
      const marca = producto.marca;

      if (!agrupado[empresa][marca]) {
        agrupado[empresa][marca] = {
          cantidadVentas: 0,
          categoria: producto.categoria,
          marca: producto.marca,
          rubro: producto.rubro,
          cantidadCotizaciones:0,
          cantidadStockDeposito:0,
          cantidaStockSucursal:0
        };
      }
      agrupado[empresa][marca].cantidadVentas += producto.cantidadVentas;
        for (const stock of producto.stock) {
          if (stock.tipo === "ALMACEN") {
            agrupado[empresa][marca].cantidadStockDeposito  += stock.cantidad;
          } else if (stock.tipo === "SUCURSAL") {
             agrupado[empresa][marca].cantidaStockSucursal += stock.cantidad;
          }
          
        }
    }
  }

  const resultado = Object.entries(agrupado).map(([empresa, marcasObj]) => ({
    empresa,
    productos: Object.values(marcasObj),
  }));

  return resultado;
}
