
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
import { AutenticacionAsesoresPage } from "../../Autenticacion/page/AutenticacionAsesoresPage";

import { RendimientoDiarioPage } from "../../RendimientoDiario/page/RendimientoDiarioPage";
import { InicioAsesorPage } from "../../Asesor/page/InicioAsesorPage";
import { ListarRendimientoAsesorPage } from "../../RendimientoDiario/page/ListarRendimientoAsesorPage";
import { AutenticacionPage } from "../../Autenticacion/page/AutenticacionPage";
import FormDia from "../../Metas/components/FormDia"
import { DiasPage } from "../../Metas/pages/DiasPage"
import { MetasSucursales } from "../../Metas Sucursal/pages/MetasSucursales"
import { UsuarioPage } from "../../Usuario/pages/UsuarioPage"
import { useContext } from "react";
import { AutenticacionContext } from "../context/AuntenticacionProvider";


export const AppRouter = () => {
  const { isAuntenticacion  } = useContext(AutenticacionContext);
  return (
       <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<AutenticacionPage />} />
        <Route path="/asesor" element={<AutenticacionAsesoresPage />} />
        <Route element={<Layout />}>
        {
          isAuntenticacion && (
            <>    
              <Route path="/kpi/asesores" element={<AsesorLente />} />
              <Route path="/kpi/medicos" element={<Medicos />} />
              <Route path="/kpi/receta/medico" element={<RecetaMedico />} />
              <Route path="/indicadores/sucursal" element={<IndicadoresSucursalPage />} />
              <Route path="/comparaciones" element={<ComparativoPage />} />
              <Route path="/metas/sucursal" element={<MetaSucursal />} />
              <Route path="/metas/listar" element={<MetasSucursales />} />
              <Route path="/rendimiento" element={<RendimientoAsesoresPage />} />
              <Route path="/kpi/lentes" element={<LentePage />} />
    
              <Route path="/asesor/inicio" element={<InicioAsesorPage />} />
              <Route path="/rendimiento/diario" element={<RendimientoDiarioPage />} />
              <Route path="/listar/rendimiento/asesor" element={<ListarRendimientoAsesorPage />} />
              <Route path="/kpi/asesores" element={<AsesorLente />} />
              <Route path="/metas/dia" element={<FormDia />} />
              <Route path="/dias/listar" element={<DiasPage />} />	
              <Route path="/usuarios" element={<UsuarioPage />} />
              </>
          )
        }
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
