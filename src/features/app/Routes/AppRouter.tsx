import { ComparativoPage } from "../../Comparativos/page/ComparativoPage"
import Medicos from "../../Medicos/pages/Medicos"
import { RecetaMedico } from "../../Medicos/pages/RecetaMedico"
import { IndicadoresSucursalPage } from "../../Sucursal/pages/IndicadoresSucursalPage"
import { Layout } from "../Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export const AppRouter = () => {
  return (
    <BrowserRouter>

      <Layout>
        <Routes>
          <Route path="/kpi/medicos" element={<Medicos />} />
          <Route path="/kpi/receta/medico" element={<RecetaMedico />} />
          <Route path="/indicadores/sucursal" element={<IndicadoresSucursalPage />} />
          <Route path="/comparaciones" element={<ComparativoPage />} />
        </Routes>
      </Layout>

    </BrowserRouter>
  )
}
