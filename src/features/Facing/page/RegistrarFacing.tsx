import { useEffect, useState } from "react";
import { listarMarca } from "../../marca/service/marcarService";
import type { MarcaI } from "../../marca/interface/marcaInterface";
import {
  listarExhibicion,
  registrarExhibicion,
} from "../../Exhibicion/service/exhibicionService";
import type { ExhibicionI } from "../../Exhibicion/interface/exhibicion";
import { getEmpresas, getSucursalesPorEmpresa } from "../../app/service/appService";
import type { EmpresasI, SucursalI } from "../../app/interfaces/BuscadorI";
import { useEstadoReload } from "../../app/zustand/estadosZustand";
import type { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import type { facingI } from "../interface/facing";
import { registrarFacing } from "../service/facingService";

export function RegistrarFacing() {
  const [marcas, setMarcas] = useState<MarcaI[]>([]);
  const { isReloading, triggerReload } = useEstadoReload()
  const [ubicaciones, setUbicaciones] = useState<ExhibicionI[]>([]);

  const categorias = ["VIP", "INTERMEDIA", "ECONOMICA", "REPLICA"];
  const [empresas, setEmpresas] = useState<EmpresasI[]>([]);
  const [empresa, setEmpresa] = useState("");
  const [sucursales, setSucursales] = useState<SucursalI[]>([]);
  const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<string[]>([]);
  const [marcaSeleccionadas, setMarcaSeleccionadas] = useState<MarcaI[]>([]);
  const [marcaFilter, setMarcaFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [exhibicion, setExhibicion] = useState("");
  const [nuevaExhibicion, setNuevaExhibicion] = useState("");
  const [facing, setFacing] = useState(1);
  const [mostrarNuevaExhibicion, setMostrarNuevaExhibicion] = useState(false);

  const itemsPerPage = 15;
  const [page, setPage] = useState(1);
  const marcasFiltradas = marcas
    .filter((m) => m.nombre.toLowerCase().includes(marcaFilter.toLowerCase()))
    .filter((m) => (categoriaFilter ? m.categoria === categoriaFilter : true));
  const pageCount = Math.ceil(marcasFiltradas.length / itemsPerPage);
  const marcasPage = marcasFiltradas.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleSucursal = (sucursalId: string) => {
    setSucursalesSeleccionadas(prev =>
      prev.includes(sucursalId)
        ? prev.filter(id => id !== sucursalId)
        : [...prev, sucursalId]
    );
  };

  const toggleMarca = (m: MarcaI) => {
    const exists = marcaSeleccionadas.some((ms) => ms._id === m._id);

    if (exists) {
      setMarcaSeleccionadas(
        marcaSeleccionadas.filter((ms) => ms.nombre !== m.nombre)
      );
    } else {
      setMarcaSeleccionadas([...marcaSeleccionadas, m]);
    }
  };

  const agregarNuevaExhibicion = async () => {
    try {
      const response = await registrarExhibicion(nuevaExhibicion);
      if (response) {
        triggerReload()
        setNuevaExhibicion("");
        setMostrarNuevaExhibicion(false);
        toast.success("Registrado")
      }
    } catch (error) {
      const e = error as AxiosError<any>
      if (e.status == 409) {
        toast.error(e.response?.data.message)
      } else {
        toast.error(e.message)
      }
    }
  };

  const handleSubmit  =async () => {

    if(sucursalesSeleccionadas.length <= 0  ){
      toast.error('Seleccione una sucursal')
    }
     if(marcaSeleccionadas.length <= 0  ){
      toast.error('Seleccione las marcas ')
    }
    if(facing <= 0){
        toast.error('El facing debe ser maroy a 0')
    }
    if(!exhibicion){
       toast.error('Seleccione una exhibicion')
    }
    const data :facingI= {
      exhibicion:exhibicion,
      sucursal:sucursalesSeleccionadas,
      marca:marcaSeleccionadas.map((item)=> item._id),
      cantidad:facing
    }
    try {
      const response = await registrarFacing(data)
      if(response.status == 201){
        toast.success('registrado')
      }
      
    } catch (error) { 
      console.log(error);
      
      
    }

  };

  useEffect(() => {
    listarServicios();
  }, []);

  const listarServicios = async () => {
    try {
      const [marcarResponse, empresaResponse] = await Promise.all([
        listarMarca(),
        getEmpresas(),
      ]);

      setEmpresas(empresaResponse);
      setMarcas(marcarResponse);
    } catch (error) { }
  };

  useEffect(() => {
    (async () => {
      const response = await listarExhibicion();
      setUbicaciones(response);
    })();
  }, [isReloading]);

  useEffect(() => {
    (async () => {
      const response = await getSucursalesPorEmpresa(empresa);
      setSucursales(response);
      setSucursalesSeleccionadas([]); 
    })();
  }, [empresa]);

  return (
    <div className="min-h-screen from-purple-50 via-pink-50 to-blue-50 p-4 md:p-6">
      <Toaster/>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-purple-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
              📋 Registrar Exhibición y Facing
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🏢 Empresa <span className="text-red-400">*</span>
                </label>
                <select
                  className="w-full border-2 border-purple-200 bg-purple-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition"
                  value={empresa}
                  onChange={(e) => {
                    setEmpresa(e.target.value);
                  }}
                >
                  <option value="">Selecciona una empresa</option>
                  {empresas.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sucursales - Selección Múltiple */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🏪 Sucursales <span className="text-red-400">*</span>
                </label>

                {sucursalesSeleccionadas.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Seleccionadas: {sucursalesSeleccionadas.length}
                    </p>
                    <div className="flex flex-wrap gap-2  bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200 max-h-24 overflow-y-auto">
                      {sucursalesSeleccionadas.map((sucId) => {
                        const suc = sucursales.find(s => s._id === sucId);
                        return (
                          <div
                            key={sucId}
                            className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow-sm"
                          >
                            <span>{suc?.nombre}</span>
                            <button
                              type="button"
                              className="font-bold text-white hover:text-red-200 text-lg"
                              onClick={() => toggleSucursal(sucId)}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="border-2 border-green-200 bg-green-50 rounded-xl p-3 max-h-48 overflow-y-auto">
                  {!empresa ? (
                    <p className="text-gray-500 text-center py-4">
                      Selecciona una empresa primero
                    </p>
                  ) : sucursales.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No hay sucursales disponibles
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {sucursales.map((suc) => (
                        <label
                          key={suc._id}
                          className={`flex items-center gap-3  rounded-lg cursor-pointer transition hover:bg-green-100 ${sucursalesSeleccionadas.includes(suc._id)
                              ? "bg-green-100  border-green-400"
                              : "bg-white  border-transparent"
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={sucursalesSeleccionadas.includes(suc._id)}
                            onChange={() => toggleSucursal(suc._id)}
                            className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="font-medium text-gray-700">
                            {suc.nombre}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ubicación de Exhibición */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  📍 Ubicación de Exhibición{" "}
                  <span className="text-red-400">*</span>
                </label>
                <select
                  className="w-full border-2 border-yellow-200 bg-yellow-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  value={exhibicion}
                  onChange={(e) => setExhibicion(e.target.value)}
                >
                  <option value="">Selecciona ubicación</option>
                  {ubicaciones.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.nombre}
                    </option>
                  ))}
                </select>

                {/* Botón para mostrar formulario de nueva exhibición */}
                {!mostrarNuevaExhibicion && (
                  <button
                    type="button"
                    onClick={() => setMostrarNuevaExhibicion(true)}
                    className="mt-2 w-full bg-orange-100 text-orange-600 py-2 px-4 rounded-xl hover:bg-orange-200 transition font-medium flex items-center justify-center gap-2"
                  >
                    <span>+</span> Agregar nueva ubicación
                  </button>
                )}
              </div>

              {/* Formulario para nueva exhibición - Se muestra condicionalmente */}
              {mostrarNuevaExhibicion && (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-gray-700">
                      ✨ Añadir nueva ubicación
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setMostrarNuevaExhibicion(false);
                        setNuevaExhibicion("");
                      }}
                      className="text-gray-500 hover:text-red-500 font-bold text-xl"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 border-2 border-orange-200 bg-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                      value={nuevaExhibicion}
                      onChange={(e) => setNuevaExhibicion(e.target.value)}
                      placeholder="Ej: Pasillo central"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          agregarNuevaExhibicion();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={agregarNuevaExhibicion}
                      className="bg-orange-400 text-white px-4 py-2.5 rounded-xl hover:bg-orange-500 transition font-medium whitespace-nowrap"
                    >
                      + Agregar
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Presiona Enter o clic en "Agregar" para añadir la ubicación
                  </p>
                </div>
              )}

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔢 Número de Facing <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border-2 border-pink-200 bg-pink-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                  value={facing}
                  onChange={(e) => setFacing(Number(e.target.value))}
                  min={1}
                 
                 
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 px-6 rounded-xl hover:from-purple-500 transition font-bold mt-4 shadow-lg text-lg"
              >
                💾 Registrar
              </button>
            </div>
          </div>

          <div className="w-full lg:w-120 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-5 border border-blue-100 flex flex-col lg:sticky lg:top-6">
            <h3 className="text-xl font-bold mb-4 text-teal-600">
              🏷️ Selecciona Marcas <span className="text-red-400">*</span>
            </h3>

            <div className="mb-3">
              <label className="block mb-2 font-medium text-gray-700">
                📦 Categoría
              </label>
              <select
                className="w-full border-2 border-teal-200 bg-teal-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
                value={categoriaFilter}
                onChange={(e) => {
                  setCategoriaFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="🔍 Buscar marca..."
              className="border-2 border-blue-200 bg-blue-50 rounded-xl px-4 py-2.5 mb-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              value={marcaFilter}
              onChange={(e) => {
                setMarcaFilter(e.target.value);
                setPage(1);
              }}
            />
            {marcaSeleccionadas.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Seleccionadas: {marcaSeleccionadas.length}
                </p>
                <div className="flex flex-wrap gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 max-h-28 overflow-y-auto">
                  {marcaSeleccionadas.map((m) => (
                    <div
                      key={m._id}
                      className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-3 rounded-full flex items-center gap-2 text-sm shadow-sm"
                    >
                      <span>{m.nombre}</span>
                      <button
                        type="button"
                        className="font-bold text-white hover:text-red-200 text-lg"
                        onClick={() =>
                          setMarcaSeleccionadas(
                            marcaSeleccionadas.filter(
                              (item) => item._id !== m._id
                            )
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-hidden border-blue-200 rounded-xl">
              <div className="overflow-y-auto max-h-full">
                <table className="min-w-full divide-y divide-blue-100">
                  <thead className="bg-gradient-to-r from-blue-100 to-purple-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Marca
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Categoría
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-50">
                    {marcasPage.map((m) => {
                      const selected = marcaSeleccionadas.some(
                        (ms) => ms.nombre === m.nombre
                      );
                      return (
                        <tr
                          key={m._id}
                          className={`cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition ${selected
                              ? "bg-gradient-to-r from-blue-100 to-purple-100 font-semibold"
                              : ""
                            }`}
                          onClick={() => toggleMarca(m)}
                        >
                          <td className="px-4 py-2.5 text-sm text-gray-900">
                            {selected && <span className="mr-2">✓</span>}
                            {m.nombre}
                          </td>
                          <td className="px-4 py-2.5 text-sm text-gray-600">
                            {m.categoria}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-blue-200">
              <button
                type="button"
                disabled={page === 1}
                className="px-4 py-2 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 rounded-xl hover:from-purple-300 hover:to-pink-300 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-bold"
                onClick={() => setPage(page - 1)}
              >
                ← Anterior
              </button>
              <span className="text-sm text-gray-700 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                {page} / {pageCount}
              </span>
              <button
                type="button"
                disabled={page === pageCount}
                className="px-4 py-2 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 rounded-xl hover:from-purple-300 hover:to-pink-300 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-bold"
                onClick={() => setPage(page + 1)}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}