import { API_CONFIG } from "../Config/API_CONFIG";
import type { ApiResponse } from "../Interfaces/Auth/Auth.Interfaces";
import api from "./Api";
import axios from "axios";

function handleError(error: unknown): ApiResponse {
    if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiResponse;
    }
    return { status: 500, message: 'Error de conexión', data: null };
}
export const TrabajadorServices = {
    bibliotecarias: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.AUTH.BIBLIOTECARIAS);
            return res.data;
        } catch (e) { return handleError(e); }
    },
};