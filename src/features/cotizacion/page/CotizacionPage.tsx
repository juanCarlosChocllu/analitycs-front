import { useEffect, useState } from "react";
import type {filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { BuscadorCotizacion } from "../components/BuscadorCotizacion";
import { reporteCotizacion } from "../service/cotizacionService";
import { ListarCotizacion } from "../components/ListarCotizacion";
import type { CotizacionI } from "../interface/Cotizacion";

import { GraficoCotizacionBarraVertical } from "../components/GraficoCotizacionBarraVertical";

export const CotizacionPage = () => {
  const [cotizacion, setCotizacion] = useState<CotizacionI[]>([])
  const [buscador, setBuscador] = useState<filtroBuscadorI>({});
  const [_, setLoader] = useState<boolean>(false)
  useEffect(() => {
    reporte()
    
  }, [buscador])

  const reporte= async()=>{
    try {
      setLoader(true)
        const response = await reporteCotizacion(buscador)
        setCotizacion(response)
              setLoader(false)
        
    } catch (error) {
      setLoader(false)
      console.log(error);
      
    }
  }
  return (
    <>
     <BuscadorCotizacion setFiltro={setBuscador} filtro={buscador} />
     <ListarCotizacion cotizacion={cotizacion}/>
      <GraficoCotizacionBarraVertical cotizacion={cotizacion}/>
    </>

  )
}
