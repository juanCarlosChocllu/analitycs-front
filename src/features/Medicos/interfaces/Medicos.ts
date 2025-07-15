// Interfaz para cada médico/profesional en el array de data
export interface MedicoVenta {
    cantidad: number;
    medico: string; // ID del médico
    e: "OPTOMETRA" | "OFTALMOLOGO"; // Especialidad
    importe: number;
    nombre: string;
    ventasLenteLc: number;
    sucursal: string;
  }
  
  // Interfaz para cada sucursal
  export interface SucursalVenta {
    ventaLenteLc: number;
    sucursal: string;
    totalRecetas: number;
    importe: number;
    idScursal: string; // ID de la sucursal
    data: MedicoVenta[];
  }
  
  // Interfaz principal para el array completo
  export interface VentasData {
    sucursales: SucursalVenta[];
  }
  
  // Tipo para la especialidad médica
  export type EspecialidadMedica = "OPTOMETRA" | "OFTALMOLOGO";
  
  // Interfaz alternativa si prefieres trabajar directamente con el array
  export type VentasArray = SucursalVenta[];
  
  // Ejemplo de uso:
  /*
  const ventasData: VentasArray = [
    {
      ventaLenteLc: 2607,
      sucursal: "SUCRE CENTRAL",
      totalRecetas: 2546,
      importe: 2778154,
      idScursal: "679e440036cf4976b7d5a104",
      data: [
        {
          cantidad: 2,
          medico: "67d5d7d562c3c1c789f92c5f",
          e: "OPTOMETRA",
          importe: 2900,
          nombre: "OLKER (MEDICION INTERNA) ZAMORA VALDEZ",
          ventasLenteLc: 2
        }
        // ... más datos
      ]
    }
  ];
  */

  export interface MedicoVentaProcessed extends MedicoVenta {
    cantidadActual?: number;
    importeActual?: number;
    ventasLenteLcActual?: number;
    variaciones: {
      unidad: number;
      importe: number;
      lenteLc: number;
    };
    medicoAnterior: Partial<MedicoVenta>;
  }
  