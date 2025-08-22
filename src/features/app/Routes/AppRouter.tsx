import { ComparativoPage } from "../../Comparativos/page/ComparativoPage"
import Medicos from "../../Medicos/pages/Medicos"
import { RecetaMedico } from "../../Medicos/pages/RecetaMedico"
import { IndicadoresSucursalPage } from "../../Sucursal/pages/IndicadoresSucursalPage"
import { Layout } from "../Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MetaSucursal } from "../../Metas Sucursal/pages/MetaSucursal"
import { RendimientoAsesoresPage } from "../../Sucursal/pages/RendimientoAsesoresPage"
import { LentePage } from "../../Lente/pages/LentePage"
import { AsesorLente } from "../../Lente/pages/AsesorLente"
import FormDia from "../../Metas/components/FormDia"
import { DiasPage } from "../../Metas/pages/DiasPage"
import { MetasSucursales } from "../../Metas Sucursal/pages/MetasSucursales"
import { UsuarioPage } from "../../Usuario/pages/UsuarioPage"

export const AppRouter = () => {
  return (
    <BrowserRouter>

      <Layout>
        <Routes>
          <Route path="/kpi/medicos" element={<Medicos />} />
          <Route path="/kpi/receta/medico" element={<RecetaMedico />} />
          <Route path="/indicadores/sucursal" element={<IndicadoresSucursalPage />} />
          <Route path="/comparaciones" element={<ComparativoPage />} />
          <Route path="/metas/sucursal" element={<MetaSucursal />} />
          <Route path="/metas/listar" element={<MetasSucursales />} />
          <Route path="/rendimiento" element={<RendimientoAsesoresPage />} />
          <Route path="/kpi/lentes" element={<LentePage />} />
          <Route path="/kpi/asesores" element={<AsesorLente />} />
          <Route path="/metas/dia" element={<FormDia />} />
          <Route path="/dias/listar" element={<DiasPage />} />	
          <Route path="/usuarios" element={<UsuarioPage />} />
        </Routes>
      </Layout>

    </BrowserRouter>
  )
}
