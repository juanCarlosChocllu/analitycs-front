import { useState } from 'react';
import { Stethoscope} from 'lucide-react';
import { SelectField } from './components/SelectField';
import { SearchField } from './components/SearchField';
import { CheckboxFilter } from './components/CheckboxFilter';
import { DateRangeButton } from './components/DateRangeButton';

interface FilterState {
  cadena: string;
  sucursal: string;
  tipoVenta: string;
  fechaInicio: string;
  fechaFin: string;
  comisiona: boolean;
  noComisiona: boolean;
  optometristas: boolean;
  oftalmologos: boolean;
  realizadas: boolean;
  finalizadas: boolean;
  buscarMedico: string;
}

export const FiltroMedico = () => {
  const [filters, setFilters] = useState<FilterState>({
    cadena: '',
    sucursal: '',
    tipoVenta: '',
    fechaInicio: '2025-07-11',
    fechaFin: '2025-07-11',
    comisiona: false,
    noComisiona: false,
    optometristas: false,
    oftalmologos: false,
    realizadas: false,
    finalizadas: false,
    buscarMedico: '',
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
      optometristas: false,
      oftalmologos: false,
      realizadas: false,
      finalizadas: false,
      buscarMedico: '',
    });
    setActiveTimeRange('');
  };

  const applyFilters = () => {
    console.log('Filters applied:', filters);
    // Implementar la lógica para aplicar los filtros
  };

  const timeRangeButtons = [
    { label: 'D. ant', value: 'dia-ant' },
    { label: 'S. ant', value: 'sem-ant' },
    { label: 'Mes', value: 'mes' },
    { label: 'M. ant', value: 'mes-ant' },
    { label: 'Año', value: 'año' },
    { label: 'A. ant', value: 'año-ant' },
  ];

  const hasActiveFilters = Object.values(filters).some(value => 
    typeof value === 'boolean' ? value : value.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">

        {/* Filters Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {/* Main Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <SelectField
              label="Cadena:"
              value={filters.cadena}
              onChange={(value) => updateFilter('cadena', value)}
              placeholder="Seleccione una cadena"
              options={cadenaOptions}
            />
            
            <SearchField
              label="Sucursal:"
              value={filters.sucursal}
              onChange={(value) => updateFilter('sucursal', value)}
              placeholder="Buscar sucursal..."
            />
            
            <SearchField
              label="Tipo de venta:"
              value={filters.tipoVenta}
              onChange={(value) => updateFilter('tipoVenta', value)}
              placeholder="Buscar tipo de venta..."
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rango de Fechas:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={filters.fechaInicio}
                  onChange={(e) => updateFilter('fechaInicio', e.target.value)}
                  className="flex-1 px-2 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <span className="text-gray-500 text-sm">-</span>
                <input
                  type="date"
                  value={filters.fechaFin}
                  onChange={(e) => updateFilter('fechaFin', e.target.value)}
                  className="flex-1 px-2 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Checkboxes and Date Range Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
            {/* Left side - Checkboxes */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-4">
                <CheckboxFilter
                  label="Comisiona"
                  checked={filters.comisiona}
                  onChange={(checked) => updateFilter('comisiona', checked)}
                />
                <CheckboxFilter
                  label="No comisiona"
                  checked={filters.noComisiona}
                  onChange={(checked) => updateFilter('noComisiona', checked)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <CheckboxFilter
                  label="Optometristas"
                  checked={filters.optometristas}
                  onChange={(checked) => updateFilter('optometristas', checked)}
                />
                <CheckboxFilter
                  label="Oftalmólogos"
                  checked={filters.oftalmologos}
                  onChange={(checked) => updateFilter('oftalmologos', checked)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
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

            {/* Right side - Date Range Buttons */}
            <div className="flex items-center space-x-2">
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

          {/* Search Doctor Row */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <div className="max-w-md">
              <SearchField
                label="Buscar Médico:"
                value={filters.buscarMedico}
                onChange={(value) => updateFilter('buscarMedico', value)}
                placeholder="Ingrese el nombre del médico"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {hasActiveFilters && (
            <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Limpiar filtros
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200">
                Aplicar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
