export function porcentaje(cantidad:number, total:number){        
    
    if((cantidad == undefined  || cantidad <= 0) || (total == undefined  || total <= 0)){
        return 0
    }
     const  porce= ((cantidad / total)* 100)

    
    return Math.round(porce)
}