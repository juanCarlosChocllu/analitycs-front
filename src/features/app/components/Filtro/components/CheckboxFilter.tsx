import { Check } from "lucide-react";

export const CheckboxFilter = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) => (
  <label className="flex items-center space-x-2 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
          checked
            ? 'bg-blue-600 border-blue-600 shadow-md'
            : 'bg-white border-gray-300 group-hover:border-gray-400'
        }`}
      >
        {checked && (
          <Check className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />
        )}
      </div>
    </div>
    <span className={`text-sm transition-colors ${
      checked ? 'text-blue-700 font-medium' : 'text-gray-700'
    }`}>
      {label}
    </span>
  </label>
);
