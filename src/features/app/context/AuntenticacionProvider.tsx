import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AutenticacionContextI } from "../interfaces/autenticacion";
import { verificarRol } from "../service/appService";

export const AutenticacionContext = createContext<AutenticacionContextI>({
  isAuntenticacion: false,
  rol: "",
});

export const AutenticacionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAuntenticacion, setIsAuntenticacion] = useState(false);
  const [rol, setRol] = useState<string>("");
  useEffect(() => {
    if (window.location.pathname != "/") {
      role();
    }
  }, []);

  const role = async () => {
    try {
      const reponse = await verificarRol();
      if (reponse) {
        setRol(reponse.rol);
        setIsAuntenticacion(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AutenticacionContext.Provider value={{ isAuntenticacion, rol }}>
      {children}
    </AutenticacionContext.Provider>
  );
};
