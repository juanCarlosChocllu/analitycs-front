import { Button } from "@mui/material";
import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import type { AxiosError } from "axios";
import { cargaMasivaFacing } from "../service/facingService";

export const CargarMasivaFacing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo primero");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await cargaMasivaFacing(formData);
      if (response.status == 201) {
        toast.success("Archivo cargado");
        setIsOpen(false);
        setFile(null);
      }
    } catch (error) {
      const e = error as AxiosError<any>;
      toast.error("ocurrio un error" + e.message);
    }
  };

  return (
    <>
      <Toaster />
      <Button onClick={() => setIsOpen(true)}>Carga Masiva</Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Subir archivo Excel
            </h2>

            {/* Área de arrastre */}
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
            >
              {file ? (
                <p className="text-gray-700">{file.name}</p>
              ) : (
                <>
                  <p className="text-gray-500 mb-2">Arrastra tu archivo aquí</p>
                  <p className="text-gray-400 text-sm">
                    o haz clic para seleccionar
                  </p>
                </>
              )}
              <input
                id="fileUpload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
