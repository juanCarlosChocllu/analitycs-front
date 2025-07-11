import api from "./api";

export const ultimaDescarga = async (): Promise<string> => {
    try {
        const response = await api.get("log/venta/descarga");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
