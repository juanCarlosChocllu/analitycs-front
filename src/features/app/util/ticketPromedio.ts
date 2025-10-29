export function ticketPromedio(ticket:number, montoTotal:number){
    if(ticket <= 0){
        return 0
    }
    const resultado = montoTotal /ticket 
    return resultado.toFixed(2) 
}

export function tasaDeConversion(ticket:number, atenciones:number){
    if(atenciones < 1 ){
        return 0
    }
    const resultado =  (ticket / atenciones)  * 100
    return resultado.toFixed(2) 
}

export function division(dividendo:number, divisor:number):number{
    if(divisor < 1 ){
        return 0
    }
    const resultado =  (dividendo / divisor) 
    return resultado
}