import Medicos from "../../Medicos/pages/Medicos"
import { IndicadoresSucursalPage } from "../../Sucursal/pages/IndicadoresSucursalPage"
import { Layout } from "../Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Medicos />} />
          <Route path="/indicadores/sucursal" element={<IndicadoresSucursalPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
