import type { MedicoVenta, SucursalVenta } from "../interfaces/Medicos";

interface TablaMedicoProps {
  dataActual: SucursalVenta[];
  dataAnterior: SucursalVenta[];
}

export function filtroMedicoEspecialidad({ dataActual, dataAnterior }: TablaMedicoProps, especialidad:string):[MedicoVenta[], MedicoVenta[]] {

  
    const dataActualMedico:MedicoVenta[] = []
    const dataAnteriorMedico:MedicoVenta[] = []
   for (const d of dataActual) {
        const data  = d.data.filter((item)=> item.e === especialidad)
        dataActualMedico.push(...data)
   }

   for (const d of dataAnterior) {
    const data =d.data.filter((item)=> item.e === especialidad)
    dataAnteriorMedico.push(...data)
    }
  
   
   
   return [dataActualMedico , dataAnteriorMedico]
}