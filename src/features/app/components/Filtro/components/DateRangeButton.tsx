export const DateRangeButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
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

