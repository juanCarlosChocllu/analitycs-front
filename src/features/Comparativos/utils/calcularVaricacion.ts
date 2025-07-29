 export const calculateVariation = (current:number, previous:number) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    };


 export const variacion = (actual:number, anterior:number) => {
        if (actual === 0) return 0;
        return ((actual - anterior) / anterior) * 100;
    };