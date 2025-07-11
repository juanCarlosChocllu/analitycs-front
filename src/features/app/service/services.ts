import api from "./api";
import type { UltimaDescarga } from "../interfaces/UltimaDescarga";

export const ultimaDescarga = async (): Promise<UltimaDescarga> => {
    try {
        const response = await api.get("log/venta/descarga");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
