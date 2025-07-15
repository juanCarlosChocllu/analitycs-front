export function abreviarMoneda(sucursal:string){
    if(sucursal != 'OPTICENTRO PARAGUAY'){
         return 'Bs'
    }
    return 'Gs'

}


export function abreviarMonedaFoot(sucursales:string[]){
    if(sucursales && Array.isArray(sucursales)){
        for (const sucursal of sucursales) {
            if(sucursal != 'OPTICENTRO PARAGUAY'){
                return 'Bs'
           }
           return 'Gs'
            
           }
    }

}