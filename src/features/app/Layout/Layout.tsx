import { AlignJustify } from "lucide-react";
import { MenuLateral } from "../components/Menu/MenuLateral";
import { useState } from "react";
import Sibar from "../components/Sibar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const toggleMenuOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
        <Sibar />
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
