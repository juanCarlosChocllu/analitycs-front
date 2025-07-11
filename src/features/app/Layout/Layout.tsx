import { AlignJustify } from "lucide-react";
import { MenuLateral } from "../components/Menu/MenuLateral";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const toggleMenuOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex w-full justify-end bg-gray-100 p-6 px-10">
        <h3 className="text-green-600 font-bold">Fecha Actual: &nbsp;</h3>
        <h3>{dayjs().format("dddd, DD MMMM YYYY")}</h3>
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
