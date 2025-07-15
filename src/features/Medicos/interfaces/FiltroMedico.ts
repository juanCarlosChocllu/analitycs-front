
export interface FiltroMedicoInterface {
    empresa: string[];
    sucursal: string[];
    tipoVenta: string[];
    flagVenta: string;
    comisiona: boolean;
    fechaInicio: string;
    fechaFin: string;
  }

  export interface ventaMedicoInterface extends FiltroMedicoInterface {
    especialidad: string;
    medico?: string;
  }
