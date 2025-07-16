import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (value: string[]) => void;
    placeholder: string;
    options: string[];
}

export const SelectField = ({ label, value, onChange, placeholder, options }: SelectFieldProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          >
            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
              {value || placeholder}
            </span>
            <ChevronDown className={`w-4 h-4 absolute right-2 top-2.5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`} />
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              <button
                onClick={() => {
                  onChange(["TODAS"]);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
              >
                TODAS
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange([option]);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };