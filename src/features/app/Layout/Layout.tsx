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

  const notificaciones = async (fecha?: UltimaDescarga[]) => {
    if (!("Notification" in window)) {
      alert("Este navegador no soporta notificaciones.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("¡Gracias por ingresar! 👋", {
        body: `Gracias por ingresar. El sistema está actualizado hasta el ${
          fecha ? dayjs(fecha[0].fechaDescarga).format("DD/MM/YYYY") : "..."
        }.`,
        icon: "/logoAnalytics.svg",
      });
    }
  };

  useEffect(() => {
    const fetchUltimaDescarga = async () => {
      try {
        const response = await ultimaDescarga();
        setFechaUltimaDescarga(response);

        const path = window.location.pathname;
        console.log(path);
        if (path == "/inicio") {
          setTimeout(() => {
            notificaciones(response);
          }, 5000);
        }
      } catch (error) {
        console.error("Error al obtener la última descarga:", error);
      }
    };

    fetchUltimaDescarga();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-50 to-green-50">
      <header
        className="
          bg-white/80 backdrop-blur-md shadow-md border-b border-green-100
          p-3 md:p-4
          grid grid-cols-1 md:grid-cols-3 items-center gap-2 text-center md:text-left
        "
      >
        <div className="flex items-center justify-start md:justify-start">
          <button
            onClick={toggleMenuOpen}
            className="bg-blue-950 rounded-full p-2.5 w-10 h-10 flex items-center justify-center shadow-md hover:scale-105 transition"
          >
            <AlignJustify className="text-white" width={20} height={20} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          {sucursal && (
            <h2 className="text-lg md:text-xl font-bold text-blue-950 uppercase tracking-wide">
              {sucursal}
            </h2>
          )}
          {nombreAsesor && (
            <span className="px-2 py-0.5 mt-1 text-xs md:text-sm bg-green-100 text-blue-950 rounded-full font-medium">
              {nombreAsesor}
            </span>
          )}
          {rol && (
            <span className="mt-0.5 text-[11px] md:text-xs text-gray-500 italic">
              {rol}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center md:items-end text-xs md:text-sm">
          <p className="text-gray-500 font-medium">Última descarga</p>
          <div className="flex items-center gap-2 mt-1 justify-center md:justify-end flex-wrap">
            <div className="w-2 h-2 bg-blue-950 rounded-full animate-pulse"></div>
            <p className="text-green-700 font-semibold truncate max-w-[180px] md:max-w-none">
              {fechaUltimaDescarga
                ? dayjs(fechaUltimaDescarga[0].fechaDescarga).format(
                    "DD/MM/YYYY"
                  )
                : "Cargando..."}
            </p>
          </div>
        </div>
      </header>

      <MenuLateral open={open} setOpen={setOpen} />

      <main className="flex-1 p-3 md:p-2">
        <Outlet />
      </main>
    </div>
  );
};
