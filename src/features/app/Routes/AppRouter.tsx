import { ComparativoPage } from "../../Comparativos/page/ComparativoPage";
import Medicos from "../../Medicos/pages/Medicos";
import { RecetaMedico } from "../../Medicos/pages/RecetaMedico";
import { IndicadoresSucursalPage } from "../../Sucursal/pages/IndicadoresSucursalPage";
import { Layout } from "../Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetaSucursal } from "../../Metas Sucursal/pages/MetaSucursal";
import { RendimientoAsesoresPage } from "../../Sucursal/pages/RendimientoAsesoresPage";
import { LentePage } from "../../Lente/pages/LentePage";
import { AsesorLente } from "../../Lente/pages/AsesorLente";

import { RendimientoDiarioPage } from "../../RendimientoDiario/page/RendimientoDiarioPage";

import { ListarRendimientoAsesorPage } from "../../RendimientoDiario/page/ListarRendimientoAsesorPage";
import { AutenticacionPage } from "../../Autenticacion/page/AutenticacionPage";
import FormDia from "../../Metas/components/FormDia";
import { DiasPage } from "../../Metas/pages/DiasPage";
import { MetasSucursales } from "../../Metas Sucursal/pages/MetasSucursales";
import { UsuarioPage } from "../../Usuario/pages/UsuarioPage";
import { useContext } from "react";
import { AutenticacionContext } from "../context/AuntenticacionProvider";

import { Home } from "../components/Home/Home";

import { RendimientoSemanal } from "../../RendimientoDiario/page/RendimientoSemanal";

import { RegistrarAsesoresPage } from "../../Usuario/pages/RegistrarAsesoresPage";
import { ListarAsesorPage } from "../../Usuario/pages/ListarAsesorPage";
import { RendimientoDiarioAsesorPage } from "../../RendimientoDiario/page/RendimientoDiarioAsesorPage";
import { AvanceMetasAsesorPage } from "../../RendimientoDiario/page/AvanceMetasAsesorPage";
import { AvanceVentasPage } from "../../RendimientoDiario/page/AvanceVentasPage";
import { ListarMarcaPage } from "../../marca/page/ListarMarcaPage";
import { ProductoPage } from "../../Productos/page/ProductoPage";
import { CotizacionPage } from "../../cotizacion/page/CotizacionPage";
import { KpiProductoPage } from "../../Productos/page/KpiProductoPage";
import { KpiMaterialPage } from "../../Lente/pages/KpiMaterialPage";

export const AppRouter = () => {
  const { isAuntenticacion } = useContext(AutenticacionContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AutenticacionPage />} />
        <Route element={<Layout />}>
          {isAuntenticacion && (
            <>
              <Route path="/inicio" element={<Home />} />
              <Route path="/kpi/asesores" element={<AsesorLente />} />
              <Route path="/kpi/medicos" element={<Medicos />} />
              <Route path="/kpi/receta/medico" element={<RecetaMedico />} />
              <Route
                path="/indicadores/sucursal"
                element={<IndicadoresSucursalPage />}
              />
              <Route path="/comparaciones" element={<ComparativoPage />} />
              <Route path="/metas/sucursal" element={<MetaSucursal />} />
              <Route path="/metas/listar" element={<MetasSucursales />} />
              <Route
                path="/rendimiento"
                element={<RendimientoAsesoresPage />}
              />
              <Route path="/kpi/lentes" element={<LentePage />} />
              {/*<Route path="/asesor/inicio" element={<InicioAsesorPage />} />*/}
              <Route
                path="/rendimiento/diario"
                element={<RendimientoDiarioPage />}
              />
              {/*falat*/}{" "}
              <Route
                path="/listar/rendimiento/asesor"
                element={<ListarRendimientoAsesorPage />}
              />
              {/*si*/}{" "}
              <Route
                path="/rendimiento/semanal/asesor"
                element={<RendimientoSemanal />}
              />
              <Route path="/kpi/asesores" element={<AsesorLente />} />
              <Route path="/metas/dia" element={<FormDia />} />
              <Route path="/dias/listar" element={<DiasPage />} />
              <Route path="/usuarios" element={<UsuarioPage />} />
              <Route path="/asesor/usuarios" element={<ListarAsesorPage />} />
              {/*si*/}{" "}
              <Route
                path="/asesor/registrar"
                element={<RegistrarAsesoresPage />}
              />
              <Route
                path="/rendimiento/diario/asesor"
                element={<RendimientoDiarioAsesorPage />}
              />
              {/*si*/}{" "}
              <Route
                path="/avance/metas/asesor"
                element={<AvanceMetasAsesorPage />}
              />
              <Route
                path="/avance/ventas/asesor"
                element={<AvanceVentasPage />}
              />
              <Route path="/listar/marca" element={<ListarMarcaPage />} />
              <Route path="/producto/reporte" element={<ProductoPage />} />
              <Route path="/reporte/cotizacion" element={<CotizacionPage />} />
              <Route path="/kpi/producto" element={<KpiProductoPage />} />
              <Route path="/kpi/material" element={<KpiMaterialPage />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
