import { useEffect, useState } from "react";
import type { AsesorSeleccionadoI, AsesorSinUsuario } from "../interfaces/usuario.interface";
import { extraerApellido, extraerNombre, generarUsuaurio } from "../utils/usuarioUtil";
import { listarAsesorVentas } from "../services/serviceUsuario";

export const ListarAsesor = ({
  asesoresSeleccionados,
  setAsesoresSeleccionados,
  setAsesorData,
}: {
  asesoresSeleccionados: string;
  setAsesoresSeleccionados: (asesor: string) => void;
  setAsesorData?: (data: AsesorSeleccionadoI) => void;
}) => {
  const [asesores, setAsesores] = useState<AsesorSinUsuario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const asesoresPorPagina = 10;

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const response = await listarAsesorVentas();

      
      setAsesores(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Filtrado por nombre
  const asesoresFiltrados = asesores.filter((asesor) =>
    asesor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación
  const totalPaginas = Math.ceil(asesoresFiltrados.length / asesoresPorPagina);
  const indiceInicial = (paginaActual - 1) * asesoresPorPagina;
  const asesoresPaginados = asesoresFiltrados.slice(
    indiceInicial,
    indiceInicial + asesoresPorPagina
  );

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const toggleSeleccion = (id: string, nombre: string) => {
    const nombreAsesor = extraerNombre(nombre.trim());
    const apellidos = extraerApellido(nombre.trim());
    const usuario = generarUsuaurio(nombreAsesor, apellidos);
    if(setAsesorData){
    setAsesorData({
      nombres: nombreAsesor,
      apellidos: apellidos,
      usuario:usuario
    });
    }
   
      setAsesoresSeleccionados(id);
   
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Listado de Asesores
      </h2>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1); // Reinicia a la primera página al buscar
          }}
          className="border border-gray-300 px-3 py-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="py-2 px-4 border-b">Seleccionar</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Sucursal</th>
          </tr>
        </thead>
        <tbody>
          {asesoresPaginados.map((asesor) => (
            <tr key={asesor._id} className="hover:bg-blue-50">
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="checkbox"
                  checked={asesoresSeleccionados.includes(asesor._id)}
                  onChange={() => toggleSeleccion(asesor._id, asesor.nombre)}
                />
              </td>
              <td className="py-2 px-4 border-b">{asesor.nombre}</td>
              <td className="py-2 px-4 border-b">{asesor.sucursal}</td>
            </tr>
          ))}

          {asesoresPaginados.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No se encontraron asesores.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginador compacto */}
      <div className="mt-4 flex items-center justify-center gap-1 flex-wrap">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded disabled:opacity-50"
        >
          ◀
        </button>

        {Array.from({ length: totalPaginas }, (_, i) => i + 1)
          .filter(
            (num) =>
              Math.abs(num - paginaActual) <= 2 ||
              num === 1 ||
              num === totalPaginas
          )
          .map((num, index, array) => {
            const prev = array[index - 1];
            const isSkipped = prev && num - prev > 1;
            return (
              <span key={num}>
                {isSkipped && <span className="px-1">...</span>}
                <button
                  onClick={() => cambiarPagina(num)}
                  className={`px-3 py-1 rounded mx-0.5 ${
                    num === paginaActual
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {num}
                </button>
              </span>
            );
          })}

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded disabled:opacity-50"
        >
          ▶
        </button>
      </div>
    </div>
  );
};
