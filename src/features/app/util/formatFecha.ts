export const formatFecha = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

