export const formatearMoneda = (valor: number) =>
    `Bs. ${new Intl.NumberFormat("es-BO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor)}`;

export const formatearPorcentaje = (valor: number) =>
    `${Math.round(valor)}%`;

export const getProgressPercentage = (actual: number, meta: number) =>
    Math.min((actual / meta) * 100, 100);
