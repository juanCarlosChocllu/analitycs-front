interface Material {
  nombre: string;
  cantidad: number;
  porcentaje: number;
}

export interface KpiMaterialI {
  sucursal: string;
  lentes: number;
  materiales: Material[];
}