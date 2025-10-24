import { AlignJustify } from "lucide-react";
import { MenuLateral } from "../components/Menu/MenuLateral";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { mostrarSucursal, ultimaDescarga } from "../service/appService";
import type { UltimaDescarga } from "../interfaces/UltimaDescarga";
import { Outlet } from "react-router";

dayjs.locale("es");

export const Layout = () => {
  const [open, setOpen] = useState(false);
  const [fechaUltimaDescarga, setFechaUltimaDescarga] =
    useState<UltimaDescarga[]>();
  const [sucursal, setSucursal] = useState<string>("");

  const toggleMenuOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchUltimaDescarga = async () => {
      try {
        const [response, responseSucursal] = await Promise.all([
          ultimaDescarga(),
          mostrarSucursal(),
        ]);

        setSucursal(responseSucursal.sucursal);
        setFechaUltimaDescarga(response);
      } catch (error) {
        console.error("Error al obtener la última descarga:", error);
      }
    };
    fetchUltimaDescarga();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <header className="relative flex items-center justify-between bg-white shadow-md p-4 md:p-6">
        <button
          onClick={toggleMenuOpen}
          className="bg-[#374152] rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-md hover:bg-[#4b5563] transition"
        >
          <AlignJustify className="text-white" width={20} height={20} />
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="text-lg md:text-xl font-bold text-green-700 uppercase tracking-wide">
            {sucursal && sucursal}
          </h2>
        </div>

        <div className="text-right text-sm md:text-base">
          <p className="text-gray-600 font-semibold">Última descarga:</p>
          <p className="text-green-600 font-bold">
            {dayjs(fechaUltimaDescarga?.[0]?.fechaDescarga || dayjs()).format(
              "dddd, DD MMMM YYYY"
            )}
          </p>
        </div>
      </header>

      <MenuLateral open={open} setOpen={setOpen} />
      <main className="flex-1 overflow-y-auto p-6 bg-white shadow-inner">
        <Outlet />
      </main>
    </div>
  );
};
