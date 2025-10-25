import type { ventaAsesor, ventaAsesorI } from "../interface/RendimientoDiario";

export function ventasPordiaAsesor(venta:ventaAsesor[] | ventaAsesorI [] , metaTicket:number):number{
   if(metaTicket <= 0){
    return 0
   }
   let totalDias = 0
   for (const v of venta) {
      
        totalDias += v.dias
   }
   if(totalDias <= 0){
    return 0
   }
   
   
   return Number((metaTicket/  totalDias).toFixed(2))
}



export function cumplimientoMetaAsesor(total:number, metaAsesor:number){
    
    if (total > 0 && metaAsesor > 0){
         return ((  total/ metaAsesor ) * 100).toFixed(2)
    }
    return 0
   
}


export function metasFaltantes(metaAsesor:number, total:number){

    if(metaAsesor > total) {
        return 0
    }
    return    total-metaAsesor
}
