import { API_CONFIG } from "../Config/API_CONFIG";
import type { ApiResponse } from "../Interfaces/Auth/Auth.Interfaces";
import type { UsuarioRequest } from "../Interfaces/Usuario/Usuario.interfaces";
import api from "./Api";
import axios from "axios";

function handleError(error: unknown): ApiResponse {
    if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiResponse;
    }
    return { status: 500, message: 'Error de conexión', data: null };
}


export const UsuarioServices = {
    create: async (usuario: UsuarioRequest): Promise<ApiResponse> => {
        try {
            const res = await api.post<ApiResponse>(API_CONFIG.ENDPOINTS.USUARIO.CREATE, usuario);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    deshabilitar: async (id: number): Promise<ApiResponse> => {
        try {
            const res = await api.put<ApiResponse>(`${API_CONFIG.ENDPOINTS.USUARIO.DESHABILITAR}/${id}`);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    obtener: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.USUARIO.OBTENER);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    conPrestamos: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.USUARIO.CON_PRESTAMOS);
            return res.data;
        } catch (e) { return handleError(e); }
    },
};