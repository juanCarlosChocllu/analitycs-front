import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI"
import type { DataDetalle, DetalleVenta } from "../../app/interfaces/DetalleVenta.interface"
import { instance } from "../../app/service/instaceAxios"
import type { MetaSucursalI } from "../interfaces/metaSucursal.interfaces"


export const crearMetaSucursal= async(data: any)=>{
try {
    const response = await instance.post('metas/sucursal',data)
    return response.data
} catch (error) {
    throw error
}

}

export const listarMetasScursal= async(parametros: any, limite: number, pagina: number)=>{
    const parmas:any ={
        limite,
        pagina
     }

    if (parametros.sucursal) {
        parmas.sucursal = parametros.sucursal;
      }
    
      if (parametros.fechaInicio) {
        parmas.fechaInicio = parametros.fechaInicio;
      }
    
      if (parametros.fechaFin) {
        parmas.fechaFin = parametros.fechaFin;
      }
      
      if (parametros.fechaMetaInicio) {
        parmas.fechaMetaInicio = parametros.fechaMetaInicio;
      }
    
      if (parametros.fechaMetaFin) {
        parmas.fechaMetaFin = parametros.fechaMetaFin;
      }
    
    try {
        const response = await instance.get('metas/sucursal', {
            params:{
                ...parmas
            }
            
        },
      
    )
        return response.data
    } catch (error) {
        throw error
    }
    
    }


export const borrarMetas= async(meta: string)=>{
    try {
        const response = await instance.delete(`metas/sucursal/${meta}`)
        return response.data
    } catch (error) {
        throw error
    }
}


export const  metasSucursalActual= async(data: filtroBuscadorI): Promise<MetaSucursalI[]>=>{
    console.log('Actual',data)
    try {
        const response = await instance.post('venta/meta/sucursal/actual', data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }


}



export const  metasSucursalAnterior= async(data: filtroBuscadorI): Promise<MetaSucursalI[]>=>{
    console.log('Anterior',data)
    
    const fechaInicio = new Date(data.fechaInicio || '');

    fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
    const fechaFin= new Date(data.fechaFin || '');
    fechaFin.setFullYear(fechaFin.getFullYear() - 1);

    
    const updatedData = {
        ...data,
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        fechaFin: fechaFin.toISOString().split('T')[0],     
    };

    
    try {
        const response = await instance.post('venta/meta/sucursal/anterior', updatedData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }


}

export const detalleVenta = async(data: DataDetalle): Promise<DetalleVenta[]>=>{
    try {
        const response = await instance.post(`venta/meta/sucursal/detalle/${data.sucursal}`, {
                fechaInicio: data.fechaInicio,
                fechaFin: data.fechaFin,
                flagVenta: data.flagVenta,
                tipoVenta: data.tipoVenta,
                comisiona: data.comisiona
        })
        return response.data
    } catch (error) {
        throw error
    }
}

