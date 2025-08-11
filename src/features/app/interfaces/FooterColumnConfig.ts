export interface FooterColumnConfig {
    key: string;
    type: 'sum' | 'percentage';
    numeratorKey?: string; 
    denominatorKey?: string; 
    displaySuffix?: string;
    decimals?: number; 
}