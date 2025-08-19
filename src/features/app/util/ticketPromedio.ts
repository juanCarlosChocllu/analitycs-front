export function ticketPromedio(ticket:number, montoTotal:number){
    const resultado = montoTotal /ticket 
    return resultado.toFixed(2) 
}

export function tasaDeConversion(ticket:number, atenciones:number){
    const resultado =  ticket /atenciones  * 100
    return resultado.toFixed(2) 
}