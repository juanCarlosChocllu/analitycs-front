import type { FooterColumnConfig } from "../../app/interfaces/FooterColumnConfig";

export const opticentroFooterColumns: FooterColumnConfig[] = [
    { key: 'tickets', type: 'sum' },
    { key: 'lentes', type: 'sum' },
    { key: 'antireflejo', type: 'sum' },
    { 
        key: 'porcentajeAntireflejo', 
        type: 'percentage', 
        numeratorKey: 'antireflejo', 
        denominatorKey: 'lentes',
        decimals: 1
    },
    { key: 'fotosensibles', type: 'sum' },
    { 
        key: 'porcentajeFotosensibles', 
        type: 'percentage', 
        numeratorKey: 'fotosensibles', 
        denominatorKey: 'lentes',
        decimals: 1
    },
    { key: 'ocupacional', type: 'sum' },
    { 
        key: 'porcentajeOcupacional', 
        type: 'percentage', 
        numeratorKey: 'ocupacional', 
        denominatorKey: 'lentes',
        decimals: 1
    },
    { key: 'progresivos', type: 'sum' },
    { 
        key: 'porcentajeProgresivos', 
        type: 'percentage', 
        numeratorKey: 'progresivos', 
        denominatorKey: 'lentes',
        decimals: 1
    },
    { key: 'progresivosOcupacionales', type: 'sum' },
    { 
        key: 'porcentajeProgresivosOcupacionales', 
        type: 'percentage', 
        numeratorKey: 'progresivosOcupacionales', 
        denominatorKey: 'lentes',
        decimals: 1
    }
];