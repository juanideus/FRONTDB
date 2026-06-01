import { API_CONFIG } from "../Config/API_CONFIG";
import type { ApiResponse } from "../Interfaces/Auth/Auth.Interfaces";
import type { TransaccionRequest } from "../Interfaces/Transacciones/Transaccion.interfaces";
import api from "./Api";
import axios from "axios";

function handleError(error: unknown): ApiResponse {
    if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiResponse;
    }
    return { status: 500, message: 'Error de conexión', data: null };
}



export const TransaccionServices = {
    create: async (transaccion: TransaccionRequest): Promise<ApiResponse> => {
        try {
            const res = await api.post<ApiResponse>(API_CONFIG.ENDPOINTS.TRANSACCION.CREATE, transaccion);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    topFiccion: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.TRANSACCION.TOP_FICCION);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    ventasAnio: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.TRANSACCION.VENTAS_ANIO);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    comedia: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.TRANSACCION.COMEDIA);
            return res.data;
        } catch (e) { return handleError(e); }
    },
};
 