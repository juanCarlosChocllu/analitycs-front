type DataItem = { [key: string]: any };

interface FooterColumnConfig {
    key: string;
    type: 'sum' | 'percentage';
    numeratorKey?: string; 
    denominatorKey?: string; 
    displaySuffix?: string;
    decimals?: number; 
}

const getNumericValue = (value: number | null | undefined): number => {
    return typeof value === 'number' ? value : 0;
};

const calculatePercentage = (numerator: number, denominator: number, decimals: number = 2): string => {
    if (denominator === 0) return '0';
    return ((numerator / denominator) * 100).toFixed(decimals);
};


export const calculateFooterTotals = <T extends DataItem>(
    data: T[], 
    columns: FooterColumnConfig[]
): { [key: string]: number | string } => {
    
    const totals: { [key: string]: number } = {};
    const results: { [key: string]: number | string } = {};

    columns.forEach(column => {
        if (column.type === 'sum') {
            totals[column.key] = 0;
        }
    });

    data.forEach((item: T) => {
        columns.forEach(column => {
            if (column.type === 'sum') {
                totals[column.key] += getNumericValue(item[column.key]);
            }
        });
    });

    columns.forEach(column => {
        if (column.type === 'sum') {
            results[column.key] = totals[column.key];
        } else if (column.type === 'percentage' && column.numeratorKey && column.denominatorKey) {
            const numerator = totals[column.numeratorKey] || 0;
            const denominator = totals[column.denominatorKey] || 0;
            const decimals = column.decimals || 2;
            results[column.key] = calculatePercentage(numerator, denominator, decimals);
        }
    });

    return results;
};

/**
 * Hook personalizado para usar en componentes React
 */
export const useFooterTotals = <T extends DataItem>(
    data: T[], 
    columns: FooterColumnConfig[]
) => {
    return calculateFooterTotals(data, columns);
};

export const getFooterValue = <T extends DataItem>(
    data: T[],
    key: string,
    type: 'sum' | 'percentage' = 'sum',
    numeratorKey?: string,
    denominatorKey?: string,
    decimals: number = 2
): number | string => {
    
    if (type === 'sum') {
        return data.reduce((acc, item) => acc + getNumericValue(item[key]), 0);
    } else if (type === 'percentage' && numeratorKey && denominatorKey) {
        const numerator = data.reduce((acc, item) => acc + getNumericValue(item[numeratorKey]), 0);
        const denominator = data.reduce((acc, item) => acc + getNumericValue(item[denominatorKey]), 0);
        return calculatePercentage(numerator, denominator, decimals);
    }
    
    return 0;
};