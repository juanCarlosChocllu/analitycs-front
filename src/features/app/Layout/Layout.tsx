import { AlignJustify } from "lucide-react";
import { MenuLateral } from "../components/Menu/MenuLateral";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { ultimaDescarga } from "../service/appService";
import type { UltimaDescarga } from "../interfaces/UltimaDescarga";
import { Outlet } from "react-router";
import { AutenticacionContext } from "../context/AuntenticacionProvider";

dayjs.locale("es");

export const Layout = () => {
  const [open, setOpen] = useState(false);
  const [fechaUltimaDescarga, setFechaUltimaDescarga] =
    useState<UltimaDescarga[]>();
  const { sucursal, nombreAsesor, rol } = useContext(AutenticacionContext);

  const toggleMenuOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchUltimaDescarga = async () => {
      try {
        const response = await ultimaDescarga();
        setFechaUltimaDescarga(response);
      } catch (error) {
        console.error("Error al obtener la última descarga:", error);
      }
    };
    fetchUltimaDescarga();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-50 to-green-50">
      {/* HEADER */}
      <header className="relative flex items-center justify-between bg-white/80 backdrop-blur-md shadow-md border-b border-green-100 p-4 md:p-6">
        {/* Botón menú */}
        <button
          onClick={toggleMenuOpen}
          className="bg-gradient-to-br from-blue-950 to-blue-950 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <AlignJustify className="text-white" width={22} height={22} />
        </button>

        {/* Información central */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center">
          {
            sucursal && 
            <h2 className="text-xl md:text-2xl font-bold text-blue-950 tracking-widest uppercase drop-shadow-sm">
            {sucursal }
          </h2>
          }

          {/* Nombre y rol */}
          <div className="mt-1 flex flex-col items-center">
            {nombreAsesor && 
            <span className="px-3 py-1 text-sm md:text-base bg-green-100 text-blue-950 rounded-full shadow-sm font-medium">
              {nombreAsesor}
            </span>}
            <span className="mt-1 text-xs md:text-sm text-gray-500 italic tracking-wide">
              {rol  && rol}
            </span>
          </div>
        </div>

        {/* Última descarga */}
        <div className="flex flex-col items-end text-sm md:text-base">
          <p className="text-gray-500 font-semibold">Última descarga</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-blue-950 rounded-full animate-pulse"></div>
            <p className="text-green-700 font-bold text-right">
              {fechaUltimaDescarga
                ? dayjs(fechaUltimaDescarga?.[0]?.fechaDescarga).format(
                    "dddd, DD MMMM YYYY"
                  )
                : "Cargando..."}
            </p>
          </div>
        </div>
      </header>

      {/* Menú lateral */}
      <MenuLateral open={open} setOpen={setOpen} />

      {/* Contenido principal */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
