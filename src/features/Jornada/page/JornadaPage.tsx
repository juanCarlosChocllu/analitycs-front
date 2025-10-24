import { useEffect, useState } from "react";
import { listarAsessorPorSucursal } from "../../Asesor/service/asesorService";
import type { listarAsesorSucursal } from "../../Asesor/interface/asesorSucursal";
import { TrabajadorCard } from "../components/TrabajadorCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEstadoReload } from "../../app/zustand/estadosZustand";

export function JornadaPage() {
  const fechaActual = new Date();
  const anoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth(); 

  const [asesores, setAsesores] = useState<listarAsesorSucursal[]>([]);
  const [nombre, setNombre] = useState<string>("");
  const [pagina, setPagina] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const { isReloading } = useEstadoReload();
  const fetchAsesores = async (page: number, nombreBuscado: string) => {
    try {
      const response = await listarAsessorPorSucursal(page, nombreBuscado);
      setAsesores(response.data);
      setTotalPaginas(response.pagina);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAsesores(pagina, nombre);
  }, [pagina, nombre, isReloading]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPagina(value);
  };

  const nombreMesActual = new Date(anoActual, mesActual).toLocaleString(
    "es-ES",
    { month: "long" }
  );
  const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
  const anoMesAnterior = mesActual === 0 ? anoActual - 1 : anoActual;
  const nombreMesAnterior = new Date(
    anoMesAnterior,
    mesAnterior
  ).toLocaleString("es-ES", { month: "long" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            🧾 Registro de dias Laborales
          </h1>
          <p className="text-gray-600 mb-2">
            Período comercial:
            <span className="font-semibold text-gray-800 capitalize">
               {nombreMesAnterior}
            </span>
            -
            <span className="font-semibold text-gray-800 capitalize">
              {nombreMesActual}
            </span>
            {anoActual}
          </p>
          <p className="text-sm text-gray-500">
            Selecciona el rango de fechas haciendo clic en el día de inicio y
            luego en el día final
          </p>
          <input
            type="text"
            placeholder="Buscar asesor"
            onChange={(e) => {
              setNombre(e.target.value);
              setPagina(1); // Reinicia la página al buscar
            }}
            className="mt-10 w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </header>

        {/* Grid de trabajadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {asesores.map((t) => (
            <TrabajadorCard
              key={t._id}
              jornada={t.jornada}
              asesor={t._id}
              nombre={t.nombre}
              ano={anoActual}
              mesActual={mesActual}
              color="#06B6D4"
            />
          ))}
        </div>

        {/* Paginador de Material UI */}
        <Stack spacing={2} className="mt-8 items-center">
          <Pagination
            count={totalPaginas}
            page={pagina}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
}
