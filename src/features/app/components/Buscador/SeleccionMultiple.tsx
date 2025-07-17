import { ChevronDown, X } from "lucide-react";
import {  useState } from "react";
import type { dataBuscador } from "../../interfaces/BuscadorI";


export const SeleccionMultiple = ({
  label,
  value,
  onChange,
  placeholder,
  options
}: {
  label: string;
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label)
    .join(', ');

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      >
        <span className={value.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
          {selectedLabels || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 absolute right-3 top-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option.value)}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};





interface MultiSelectProps {
  label: string;
  value: string[]; 
  onChange: (value: string[]) => void;
  placeholder: string;
  options: dataBuscador[];
  setValue: (value: string[]) => void;
}

const colors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-red-100 text-red-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
];

export default function MultiSelectBuscador({
  label,
  value,
  onChange,
  placeholder,
  options,
  setValue,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddOption = (id: string) => {
    if (!value.includes(id)) {
      onChange([...value, id]);
    }
    setIsOpen(false);
  };

  const handleRemoveOption = (id: string) => {
    setValue(value.filter((v) => v !== id));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm min-h-[38px]"
        >
          <div className="flex flex-wrap gap-1">
            {value.length > 0 ? (
              value.map((id, index) => {
                const option = options.find((opt) => opt._id === id);
                if (!option) return null;
                return (
                  <span
                    key={id}
                    className={`${colors[index % colors.length]} px-2 py-1 rounded-md text-xs font-medium inline-flex items-center gap-1`}
                  >
                    {option.nombre}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOption(id);
                      }}
                      className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 absolute right-2 top-2.5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {options.filter((opt) => !value.includes(opt._id)).length > 0 ? (
              options
                .filter((opt) => !value.includes(opt._id))
                .map((opt) => (
                  <button
                    key={opt._id}
                    onClick={() => handleAddOption(opt._id)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
                  >
                    {opt.nombre}
                  </button>
                ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No hay más opciones disponibles
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



