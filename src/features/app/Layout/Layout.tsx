import { AlignJustify } from "lucide-react";
import { MenuLateral } from "../components/Menu/MenuLateral";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { ultimaDescarga } from "../service/appService";
import type { UltimaDescarga } from "../interfaces/UltimaDescarga";
import { Outlet } from "react-router";
dayjs.locale("es");

export const Layout = () => {
  const [open, setOpen] = useState(false);
  const [fechaUltimaDescarga, setFechaUltimaDescarga] = useState<UltimaDescarga[]>();
  const toggleMenuOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchUltimaDescarga = async () => {
      try {
        const response = await ultimaDescarga();
        setFechaUltimaDescarga(response);
        console.log("fecha",response[0].fechaDescarga);
      } catch (error) {
        console.error("Error al obtener la ultima descarga:", error);
      }
    };
    fetchUltimaDescarga();
  }, []);
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex w-full justify-end bg-gray-100 p-6 px-10">
        
        <h3 className="text-green-600 font-bold">Ultima Descarga: &nbsp;</h3>
        <h3>{dayjs(fechaUltimaDescarga?.[0].fechaDescarga || dayjs().format("YYYY-MM-DD")).startOf("day").format("dddd, DD MMMM YYYY")}</h3>
      </div>
      <button
        onClick={toggleMenuOpen}
        className="bg-[#374152] rounded-full m-4 fixed top-0 left-0 p-4 w-12 h-12 flex items-center justify-center"
      >
        <AlignJustify className="text-white" width={20} height={20} />
      </button>
      <MenuLateral open={open} setOpen={setOpen} />
       <div className="flex-1 overflow-y-auto p-6 bg-white">
        <Outlet /> {/* ⬅️ ESTA ES LA CLAVE */}
      </div>
    </div>
  );
};
