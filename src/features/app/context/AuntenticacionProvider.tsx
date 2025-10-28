import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AutenticacionContextI } from "../interfaces/autenticacion";
import { verificarRol } from "../service/appService";

export const AutenticacionContext = createContext<AutenticacionContextI>({
  isAuntenticacion: false,
  rol: "",
  empresa: "",
  idEmpresa: "",
  idSucursal: "",
  sucursal: "",
  nombreAsesor:""
});

export const AutenticacionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAuntenticacion, setIsAuntenticacion] = useState(false);
  const [rol, setRol] = useState<string>("");
  const [empresa, setEmpresa] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idSucursal, setIdSucursal] = useState("");
  const [sucursal, setSucursal] = useState("");
   const [nombreAsesor, setNombreAsesor] = useState("");
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
        setSucursal(reponse.sucursal)
        setEmpresa(reponse.empresa)
        setIdEmpresa(reponse.idEmpresa)
        setIdSucursal(reponse.idSucursal)
        setNombreAsesor(reponse.nombre)

      }
    } catch (error) {
      console.log('e', error);
    }
  };

  return (
    <AutenticacionContext.Provider
      value={{
        isAuntenticacion,
        rol,
        empresa: empresa,
        idEmpresa: idEmpresa,
        idSucursal: idSucursal,
        sucursal: sucursal,
        nombreAsesor:nombreAsesor
      }}
    >
      {children}
    </AutenticacionContext.Provider>
  );
};
