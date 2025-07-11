import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Filter, X, Check } from 'lucide-react';

interface FilterState {
  cadena: string;
  sucursal: string;
  tipoVenta: string;
  fechaInicio: string;
  fechaFin: string;
  comisiona: boolean;
  noComisiona: boolean;
  realizadas: boolean;
  finalizadas: boolean;
}

const DateRangeButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md transform scale-105'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
    }`}
  >
    {label}
  </button>
);

const CheckboxFilter = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) => (
  <label className="flex items-center space-x-2 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
          checked
            ? 'bg-green-600 border-green-600 shadow-md'
            : 'bg-white border-gray-300 group-hover:border-gray-400'
        }`}
      >
        {checked && (
          <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
        )}
      </div>
    </div>
    <span className={`text-sm font-medium transition-colors ${
      checked ? 'text-green-700' : 'text-gray-700'
    }`}>
      {label}
    </span>
  </label>
);

const SelectField = ({ label, value, onChange, placeholder, options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 absolute right-3 top-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
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

const SearchField = ({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
      />
      <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
    </div>
  </div>
);

export function Buscador() {
  const [filters, setFilters] = useState<FilterState>({
    cadena: '',
    sucursal: '',
    tipoVenta: '',
    fechaInicio: '2025-07-11',
    fechaFin: '2025-07-11',
    comisiona: false,
    noComisiona: false,
    realizadas: false,
    finalizadas: false,
  });

  const [activeTimeRange, setActiveTimeRange] = useState<string>('');

  const cadenaOptions = [
    'Cadena Principal',
    'Cadena Secundaria',
    'Cadena Premium',
    'Cadena Express'
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      cadena: '',
      sucursal: '',
      tipoVenta: '',
      fechaInicio: '',
      fechaFin: '',
      comisiona: false,
      noComisiona: false,
      realizadas: false,
      finalizadas: false,
    });
    setActiveTimeRange('');
  };

  const timeRangeButtons = [
    { label: 'Día anterior', value: 'dia-ant' },
    { label: 'Semana anterior', value: 'sem-ant' },
    { label: 'Este mes', value: 'mes' },
    { label: 'Mes anterior', value: 'mes-ant' },
    { label: 'Este año', value: 'año' },
    { label: 'Año anterior', value: 'año-ant' },
  ];

  const hasActiveFilters = Object.values(filters).some(value => 
    typeof value === 'boolean' ? value : value.length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-[95%] mx-auto">
        {/* Filters Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Filtros de Búsqueda
              </h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>

          {/* Main Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SelectField
              label="Cadena de Tienda"
              value={filters.cadena}
              onChange={(value) => updateFilter('cadena', value)}
              placeholder="Seleccione una cadena"
              options={cadenaOptions}
            />
            
            <SearchField
              label="Sucursal"
              value={filters.sucursal}
              onChange={(value) => updateFilter('sucursal', value)}
              placeholder="Buscar sucursal por nombre..."
            />
            
            <SearchField
              label="Tipo de Venta"
              value={filters.tipoVenta}
              onChange={(value) => updateFilter('tipoVenta', value)}
              placeholder="Buscar tipo de venta..."
            />
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rango de Fechas
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters.fechaInicio}
                  onChange={(e) => updateFilter('fechaInicio', e.target.value)}
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <input
                  type="date"
                  value={filters.fechaFin}
                  onChange={(e) => updateFilter('fechaFin', e.target.value)}
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Quick Date Range Buttons */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Rangos de Fecha Rápidos
            </h3>
            <div className="flex flex-wrap gap-2">
              {timeRangeButtons.map((button) => (
                <DateRangeButton
                  key={button.value}
                  label={button.label}
                  isActive={activeTimeRange === button.value}
                  onClick={() => setActiveTimeRange(button.value)}
                />
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Estado de las Ventas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <CheckboxFilter
                label="Con Comisión"
                checked={filters.comisiona}
                onChange={(checked) => updateFilter('comisiona', checked)}
              />
              <CheckboxFilter
                label="Sin Comisión"
                checked={filters.noComisiona}
                onChange={(checked) => updateFilter('noComisiona', checked)}
              />
              <CheckboxFilter
                label="Realizadas"
                checked={filters.realizadas}
                onChange={(checked) => updateFilter('realizadas', checked)}
              />
              <CheckboxFilter
                label="Finalizadas"
                checked={filters.finalizadas}
                onChange={(checked) => updateFilter('finalizadas', checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Cancelar
            </button>
            <button className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

