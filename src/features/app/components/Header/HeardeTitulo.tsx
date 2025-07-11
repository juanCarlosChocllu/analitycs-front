interface HeaderTituloProps {
    titulo: string;
    subtitulo: string;
    icono?: React.ReactNode;
}

export const HeardeTitulo = ({ titulo, subtitulo, icono }: HeaderTituloProps) => {
  return (
    <div className="mb-6 text-center">
      <div className="flex items-center justify-center space-x-3 mb-2">
        {icono}
        <h1 className="text-2xl font-bold text-gray-900">
          {titulo}
        </h1>
      </div>
      <p className="text-gray-600 text-sm">
        {subtitulo}
      </p>
    </div>
  );
};
