import type { AvanceVentas, DatosVenta, SucursalTransformada } from "../interface/avanceVentas";

const ordenarPorFecha = (data: AvanceVentas[]): AvanceVentas[] => {
    data.forEach(sucursal => {
        sucursal.ventas.sort((a, b) => {
            const fechaA = new Date(a.feha);
            const fechaB = new Date(b.feha);
            return fechaA.getTime() - fechaB.getTime();
        });
    });
    return data;
};


const transformarDatos = (data: AvanceVentas[]):SucursalTransformada[] => {
    const datasArray:SucursalTransformada[] = [];
    data.forEach((sucursal) => {
        let totalVendidos = 0;
        let totalEntregadas = 0;
        let dias = 0;
        let metaAcumuladaVendida = sucursal.metaTicket;
        let metaAcumuladaEntregada = sucursal.metaTicket;
        let metaxdiaVenta = sucursal.metaTicket / sucursal.diasComerciales;
        let metaxdiaEntrega = sucursal.metaTicket / sucursal.diasComerciales;
        const arrayDatas:DatosVenta[] = [];
        sucursal.ventas.forEach((venta, index) => {
            totalVendidos += venta.vendidos;
            totalEntregadas += venta.entregadas;

            dias = sucursal.diasComerciales - index;
            if (index !== 0) {
                metaAcumuladaVendida -= sucursal.ventas[index - 1].vendidos;
                metaAcumuladaEntregada -= sucursal.ventas[index - 1].entregadas;
                metaxdiaVenta = metaAcumuladaVendida / dias;
                metaxdiaEntrega = metaAcumuladaEntregada / dias;
            }
            const datas = {
                    dias,
                    fecha: venta.feha,
                    atenciones: venta.atenciones,
                    presupuestos: venta.presupuestos,
                    vendidos: venta.vendidos,
                    metaxdiaVenta,
                    metaAcumuladaVendida,
                    entregadas: venta.entregadas,
                    metaxdiaEntrega,
                    metaAcumuladaEntregada,
                    totales: {
                        vendidosAcumulados: totalVendidos,
                        entregadasAcumuladas: totalEntregadas,
                    },
            };
            arrayDatas.push(datas);

        });
                    const sucurc= {
                sucursal: sucursal.sucursal,
                data:arrayDatas
            }
        datasArray.push(sucurc);
    });
    return datasArray;
};


self.onmessage = (e: MessageEvent<AvanceVentas[]>) => {
    if (e.data) {
        const rawData = e.data;
        const sortedData = ordenarPorFecha(rawData);
        const transformedData = transformarDatos(sortedData);
        self.postMessage(transformedData);
    }
};

export {};
