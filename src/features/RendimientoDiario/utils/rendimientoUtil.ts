import type { ventaAsesor } from "../interface/RendimientoDiario";

export function ventasPordiaAsesor(venta:ventaAsesor[] , metaTicket:number):number{
   
   let totalDias = 0
   for (const v of venta) {
      
        totalDias += v.dias
   }
   return Number((totalDias/  metaTicket).toFixed(2))
}


export function cumplimientoMetaAsesor(total:number, metaAsesor:number){
    if(total <= 0 ){
        return 0
    }
    return ((  metaAsesor/ total ) * 100).toFixed(2)
}


export function metasFaltantes(metaAsesor:number, total:number){
    if(metaAsesor > total) {
        return 0
    }
    return    total-metaAsesor
}
