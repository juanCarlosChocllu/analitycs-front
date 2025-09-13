import type { SucursalVenta, MedicoVenta } from "../interfaces/Medicos";

interface PermutarMedicos {
    datosActuales: SucursalVenta[];
    datosAnteriores: SucursalVenta[];
}

/**
 * Sincroniza los datos de médicos entre dos conjuntos de datos de sucursales.
 * Asegura que ambos conjuntos de datos contengan todos los médicos únicos de ambos estados,
 * rellenando con valores predeterminados cuando sea necesario.
 * 
 * @param datosActuales - Datos actuales de las sucursales
 * @param datosAnteriores - Datos anteriores de las sucursales
 * @returns Objeto con los datos actualizados de ambas listas
 */
const sincronizarDatosMedicos = (
    datosActuales: SucursalVenta[],
    datosAnteriores: SucursalVenta[]
): PermutarMedicos => {
    const idsMedicosActuales = datosActuales.flatMap(sucursal => 
        sucursal.data.map(medico => medico.medico)
    );
    
    const idsMedicosAnteriores = datosAnteriores.flatMap(sucursal => 
        sucursal.data.map(medico => medico.medico)
    );

    const crearMedicoDefault = (
        idMedico: string, 
        medicoReferencia?: Partial<MedicoVenta>,
        sucursalId: string = ''
    ): MedicoVenta => ({
        cantidad: 0,
        medico: idMedico,
        e: (medicoReferencia?.e as "OPTOMETRA" | "OFTALMOLOGO") || "OPTOMETRA",
        importe: 0,
        nombre: medicoReferencia?.nombre || "",
        ventasLenteLc: 0,
        sucursal: medicoReferencia?.sucursal || sucursalId
    });

    const procesarSucursales = (
        sucursales: SucursalVenta[], 
        idsMedicosFaltantes: string[], 
        buscarEnDatos: SucursalVenta[]
    ): SucursalVenta[] => {
        return sucursales.map(sucursal => ({
            ...sucursal,
            data: [
                ...sucursal.data,
                ...idsMedicosFaltantes
                    .filter(idMedico => !sucursal.data.some(m => m.medico === idMedico))
                    .map(idMedico => {
                        const medicoEncontrado = buscarEnDatos
                            .flatMap(s => s.data)
                            .find(m => m.medico === idMedico);
                        return crearMedicoDefault(idMedico, medicoEncontrado, sucursal.idScursal);
                    })
            ]
        }));
    };

    const datosActualizados = procesarSucursales(
        datosActuales,
        idsMedicosAnteriores.filter(id => !idsMedicosActuales.includes(id)),
        datosAnteriores
    );

    const datosAnterioresActualizados = procesarSucursales(
        datosAnteriores,
        idsMedicosActuales.filter(id => !idsMedicosAnteriores.includes(id)),
        datosActuales
    );

    return {
        datosActuales: datosActualizados,
        datosAnteriores: datosAnterioresActualizados,
    };
};

export default sincronizarDatosMedicos;
