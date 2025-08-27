import type { AsesorSemanal, DatosAsesor, responseRendimiento, RespuestaProcesadaPorSemanas, SemanaDatos, Venta } from "../interface/RendimientoDiario";

export function procesarDatosPorSemanas(data: DatosAsesor[]): RespuestaProcesadaPorSemanas {
    // Para usar Day.js real, descomenta estas líneas:
    // import dayjs from 'dayjs';
    // import weekOfYear from 'dayjs/plugin/weekOfYear';
    // import isoWeek from 'dayjs/plugin/isoWeek';
    // dayjs.extend(weekOfYear);
    // dayjs.extend(isoWeek);
    
    // Simulación de Day.js para el ejemplo
    const dayjs = (date: string | Date) => {
      const d = new Date(date);
      return {
        isoWeek: () => getISOWeekNumber(d),
        year: () => d.getFullYear(),
        startOf: (unit: string) => {
          if (unit === 'isoWeek') {
            return dayjs(getStartOfISOWeek(d));
          }
          return dayjs(d);
        },
        endOf: (unit: string) => {
          if (unit === 'isoWeek') {
            return dayjs(getEndOfISOWeek(d));
          }
          return dayjs(d);
        },
        format: (format?: string) => {
          if (format === 'YYYY-MM-DD') {
            return d.toISOString().split('T')[0];
          }
          return d.toString();
        }
      };
    };
    
    // Agrupar por sucursal
    const sucursalesMap = new Map<string, Map<string, Map<string, Venta[]>>>();
    
    data.forEach((item: DatosAsesor) => {
      const sucursal: string = item.sucursal;
      
      if (!sucursalesMap.has(sucursal)) {
        sucursalesMap.set(sucursal, new Map());
      }
      
      const sucursalMap = sucursalesMap.get(sucursal)!;
      
      // Solo procesar asesores que tengan ventas
      if (item.ventas && item.ventas.length > 0) {
        const asesorKey = `${item.asesor}|${item.ventas[0]?.idAsesor || 'sin-id'}`;
        
        if (!sucursalMap.has(asesorKey)) {
          sucursalMap.set(asesorKey, new Map());
        }
        
        const asesorMap = sucursalMap.get(asesorKey)!;
        
        // Agrupar ventas por semana-año para evitar conflictos
        item.ventas.forEach((venta: Venta) => {
          const fechaVenta = dayjs(venta.fecha);
          const numeroSemana = fechaVenta.isoWeek();
          const año = fechaVenta.year();
          const claveSemanAño = `${año}-W${numeroSemana.toString().padStart(2, '0')}`;
          
          if (!asesorMap.has(claveSemanAño)) {
            asesorMap.set(claveSemanAño, []);
          }
          
          // Asegurar que idAsesor esté presente
          const ventaCompleta: Venta = {
            ...venta,
            idAsesor: venta.idAsesor || item.ventas.find(v => v.idAsesor)?.idAsesor || ''
          };
          
          asesorMap.get(claveSemanAño)!.push(ventaCompleta);
        });
      }
    });
    
    // Convertir a formato final
    const respuesta: RespuestaProcesadaPorSemanas = Array.from(sucursalesMap.entries()).map(([sucursal, sucursalMap]) => {
      const todasLasSemanas = new Map<string, SemanaDatos>();
      
      // Procesar cada asesor
      Array.from(sucursalMap.entries()).forEach(([asesorKey, asesorMap]) => {
        const [nombreAsesor] = asesorKey.split('|');
        
        Array.from(asesorMap.entries()).forEach(([claveSemanAño, ventas]) => {
          if (!todasLasSemanas.has(claveSemanAño)) {
            // Extraer número de semana de la clave
            const [_, semanaStr] = claveSemanAño.split('-W');
            const numeroSemana = parseInt(semanaStr, 10);
            
            // Calcular fechas de inicio y fin de la semana usando la primera venta como referencia
            const primeraFecha = dayjs(ventas[0].fecha);
            const inicioSemana = primeraFecha.startOf('isoWeek');
            const finSemana = primeraFecha.endOf('isoWeek');
            
            todasLasSemanas.set(claveSemanAño, {
              semana: numeroSemana,
              fechaInicio: inicioSemana.format('YYYY-MM-DD'),
              fechaFin: finSemana.format('YYYY-MM-DD'),
              asesores: []
            });
          }
          
          // Sumar totales de la semana para este asesor
          const totalesSemana = ventas.reduce((acc, venta: Venta) => {
            acc.antireflejoSemanal += venta.antireflejos;
            acc.atencionesSemanal += venta.atenciones;
            acc.cantidadLenteSemanal += venta.cantidadLente;
            acc.entregasSemanal += venta.entregas;
            acc.lcSemanal += venta.lc;
            acc.montoTotalVentasSemanal += venta.montoTotalVentas;
            acc.progresivosSemanal += venta.progresivos;
            acc.segundoParSemanal += venta.segundoPar;
            acc.ticketSemanal += venta.ticket;
            return acc;
          }, {
            antireflejoSemanal: 0,
            atencionesSemanal: 0,
            cantidadLenteSemanal: 0,
            entregasSemanal: 0,
            lcSemanal: 0,
            montoTotalVentasSemanal: 0,
            progresivosSemanal: 0,
            segundoParSemanal: 0,
            ticketSemanal: 0
          });
          
          const asesorSemanal: AsesorSemanal = {
            idAsesor: ventas[0].idAsesor || '',
            asesor: nombreAsesor,
            ...totalesSemana
          };
          
          todasLasSemanas.get(claveSemanAño)!.asesores.push(asesorSemanal);
        });
      });
      
      // Convertir a array y ordenar por semana
      const semanasArray = Array.from(todasLasSemanas.values()).sort((a, b) => {
        // Ordenar primero por año implícito en fechaInicio, luego por semana
        if (a.fechaInicio !== b.fechaInicio) {
          return a.fechaInicio.localeCompare(b.fechaInicio);
        }
        return a.semana - b.semana;
      });
      
      // Calcular fechas generales de la sucursal
      const fechaInicioGeneral = semanasArray.length > 0 ? semanasArray[0].fechaInicio : '';
      const fechaFinGeneral = semanasArray.length > 0 ? semanasArray[semanasArray.length - 1].fechaFin : '';
      
      return {
        sucursal: sucursal,
        fechaInicio: fechaInicioGeneral,
        fechaFin: fechaFinGeneral,
        semanas: semanasArray
      };
    });
    
    return respuesta;
  }
  
  // Funciones auxiliares para manejo de semanas ISO (simulando Day.js)
  function getISOWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
  
  function getStartOfISOWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }
  
  function getEndOfISOWeek(date: Date): Date {
    const start = getStartOfISOWeek(date);
    return new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
  }
  
  // Función auxiliar para crear respuesta paginada
  export function crearRespuestaPaginada<T>(
    data: T[], 
    paginaActual: number = 1, 
    itemsPorPagina: number = 10
  ): responseRendimiento<T> {
    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const dataPaginada = data.slice(inicio, fin);
    
    return {
      paginas: 1,
      data: dataPaginada,
      paginaActual: 1
    };
  }