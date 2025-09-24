export function porcentaje(cantidad:number, total:number):string{        
    
    if((cantidad == undefined  || cantidad <= 0) || (total == undefined  || total <= 0)){
        return "0"
    }
     const  porce= ((cantidad / total)* 100)

    
    return  porce.toFixed(2);
}

export function porcentaje2(cantidad:number, total:number):number{        
    
    if((cantidad == undefined  || cantidad <= 0) || (total == undefined  || total <= 0)){
        return 0
    }
     const  porce= ((cantidad / total)* 100)

    
    return  porce;
}