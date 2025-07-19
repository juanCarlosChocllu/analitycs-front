export function calcularVariacionPorcentual(totalActual:number, totalAnterior:number):number{  
    if((totalActual == undefined || totalActual <= 0 ) || (totalAnterior == undefined || totalAnterior <= 0 ) ){
        return 0
    }
    const variacion = ((totalActual - totalAnterior) / totalAnterior * 100).toFixed(0);
    return Number(variacion);
}