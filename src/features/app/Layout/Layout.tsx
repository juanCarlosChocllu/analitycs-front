import { AlignJustify } from "lucide-react";
import { MenuLateral } from "../components/Menu/MenuLateral";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { ultimaDescarga } from "../service/services";
dayjs.locale("es");

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [fechaUltimaDescarga, setFechaUltimaDescarga] = useState<string>("");
  const toggleMenuOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchUltimaDescarga = async () => {
      try {
        const response = await ultimaDescarga();
        setFechaUltimaDescarga(response);
      } catch (error) {
        console.error("Error al obtener la ultima descarga:", error);
      }
    };
    fetchUltimaDescarga();
  }, []);
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex w-full justify-end bg-gray-100 p-6 px-10">
        <h3 className="text-green-600 font-bold">Fecha Actual: &nbsp;</h3>
        <h3>{dayjs().format("dddd, DD MMMM YYYY")}</h3>
        <h3 className="text-green-600 font-bold">Ultima Descarga: &nbsp;</h3>
        <h3>{fechaUltimaDescarga}</h3>
      </div>
      <button
        onClick={toggleMenuOpen}
        className="bg-[#374152] rounded-full m-4 fixed top-0 left-0 p-4 w-12 h-12 flex items-center justify-center"
      >
        <AlignJustify className="text-white" width={20} height={20} />
      </button>
      <MenuLateral open={open} setOpen={setOpen} />
      {children}
    </div>
  );
};
