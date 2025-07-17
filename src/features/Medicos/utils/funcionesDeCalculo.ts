import type { MedicoVenta, MedicoVentaProcessed, SucursalVenta, VentasArray } from "../interfaces/Medicos";

export const consolidarMedicoData = (data: MedicoVenta[]): MedicoVenta[] => {
    return data.reduce((acc: MedicoVenta[], medico: MedicoVenta) => {
      const existingMedico = acc.find(
        (m) => m.nombre === medico.nombre
      );
      
      if (existingMedico) {
        existingMedico.ventasLenteLc += medico.ventasLenteLc;
        existingMedico.cantidad += medico.cantidad;
        existingMedico.importe += medico.importe;
      } else {
        acc.push({
          ...medico,
          ventasLenteLc: medico.ventasLenteLc,
          cantidad: medico.cantidad,
          importe: medico.importe,
        });
      }
      return acc;
    }, []);
  };
  
  export const encontrarMedicoAnterior = (
    nombreMedico: string,
    sucursalNombre: string,
    dataAnterior: VentasArray
  ): Partial<MedicoVenta> => {
    const sucursalAnterior = dataAnterior.find(
      (sucursal) => sucursal.sucursal === sucursalNombre
    );
    
    return sucursalAnterior?.data.find((m) => m.nombre === nombreMedico) || {};
  };
  
  export const calcularVariaciones = (
    medicoActual: MedicoVenta,
    medicoAnterior: Partial<MedicoVenta>,
    calcularVariacionPorcentual: (actual: number, anterior: number) => string
  ) => {
    return {
      unidad: parseFloat(calcularVariacionPorcentual(
        medicoActual.cantidad || 0,
        medicoAnterior.cantidad || 0
      )),
      importe: parseFloat(calcularVariacionPorcentual(
        medicoActual.importe || 0,
        medicoAnterior.importe || 0
      )),
      lenteLc: parseFloat(calcularVariacionPorcentual(
        medicoActual.ventasLenteLc || 0,
        medicoAnterior.ventasLenteLc || 0
      ))
    };
  };
  
  export const combinarYFiltrarMedicos = (
    dataActualConsolidada: MedicoVenta[],
    dataAnteriorSucursal: MedicoVenta[]
  ): MedicoVenta[] => {
    return dataActualConsolidada
      .concat(dataAnteriorSucursal)
      .filter(
        (medico, index, self) =>
          index === self.findIndex((m) => m.nombre === medico.nombre)
      );
  };
  
  export const procesarMedicosData = (
    sucursalActual: SucursalVenta,
    dataAnterior: VentasArray,
    calcularVariacionPorcentual: (actual: number, anterior: number) => string
  ): MedicoVentaProcessed[] => {
    const dataActualConsolidada = consolidarMedicoData(sucursalActual.data);
    
    const sucursalAnterior = dataAnterior.find(
      (sucursal) => sucursal.sucursal === sucursalActual.sucursal
    );
    
    const medicosCombinados = combinarYFiltrarMedicos(
      dataActualConsolidada,
      sucursalAnterior?.data || []
    );
  
    return medicosCombinados.map((medico) => {
      const medicoAnterior = encontrarMedicoAnterior(
        medico.nombre,
        sucursalActual.sucursal,
        dataAnterior
      );
  
      const variaciones = calcularVariaciones(
        medico,
        medicoAnterior,
        calcularVariacionPorcentual
      );
  
      return {
        ...medico,
        cantidadActual: medico.cantidad,
        importeActual: medico.importe,
        ventasLenteLcActual: medico.ventasLenteLc,
        variaciones,
        medicoAnterior
      };
    });
  };
  
  export const calcularTotalesSucursal = (
    data: MedicoVenta[]
  ): {
    totalVentasLenteLc: number;
    totalCantidad: number;
    totalImporte: number;
  } => {
    return data.reduce((acc, medico) => ({
      totalVentasLenteLc: acc.totalVentasLenteLc + medico.ventasLenteLc,
      totalCantidad: acc.totalCantidad + medico.cantidad,
      totalImporte: acc.totalImporte + medico.importe
    }), { totalVentasLenteLc: 0, totalCantidad: 0, totalImporte: 0 });
  };
  
  export const formatearImporte = (importe: number, sucursal: string): string => {
    if (importe <= 0) return "0";
    
    const formatted = parseFloat(importe.toString()).toLocaleString("en-US");
    const currency = sucursal === "OPTICENTRO PARAGUAY" ? " Gs" : " Bs";
    
    return `${formatted}${currency}`;
  };
  
  export const obtenerColorChip = (variacion: number): 'success' | 'error' | 'default' => {
    if (variacion > 0) return 'success';
    if (variacion < 0) return 'error';
    return 'default';
  };
  
  export const obtenerColorEspecialidad = (especialidad: "OPTOMETRA" | "OFTALMOLOGO"): string => {
    return especialidad === "OPTOMETRA" ? "#1976d2" : "#2e7d32";
  };
  


export function porcentaje(cantidad:number, total:number):number{        
    
    if((cantidad == undefined  || cantidad <= 0) || (total == undefined  || total <= 0)){
        return 0
    }
     const  porce= ((cantidad / total) * 100)

    
    return Math.round(porce)
}

