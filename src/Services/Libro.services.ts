import { API_CONFIG } from "../Config/API_CONFIG";
import type { ApiResponse } from "../Interfaces/Auth/Auth.Interfaces";
import type { LibroRequest,UpdatePrecioRequest } from "../Interfaces/Libros/Libros.Interfaces";
import api from "./Api";
import axios from "axios";

function handleError(error: unknown): ApiResponse {
    if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiResponse;
    }
    return { status: 500, message: 'Error de conexión', data: null };
}
export const LibroServices={
    create: async (libro: LibroRequest): Promise<ApiResponse> => {
        try {
            const res = await api.post<ApiResponse>(API_CONFIG.ENDPOINTS.LIBRO.CREATE, libro);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    deshabilitar: async (id: number): Promise<ApiResponse> => {
        try {
            const res = await api.put<ApiResponse>(`${API_CONFIG.ENDPOINTS.LIBRO.DESHABILITAR}/${id}`);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    actualizarPrecio: async (payload: UpdatePrecioRequest): Promise<ApiResponse> => {
        try {
            const res = await api.put<ApiResponse>(
                `${API_CONFIG.ENDPOINTS.LIBRO.ACTUALIZAR_PRECIO}/${payload.id}`,
                { precio: payload.precio }
            );
            return res.data;
        } catch (e) { return handleError(e); }
    },
    obtener: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.LIBRO.OBTENER);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    recientes: async (): Promise<ApiResponse> => {
        try {
            const res = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.LIBRO.RECIENTES);
            return res.data;
        } catch (e) { return handleError(e); }
    },
    aumentarCopia: async (id: number): Promise<ApiResponse> => {
        try {
            const res = await api.post<ApiResponse>(`${API_CONFIG.ENDPOINTS.LIBRO.AUMENTAR_COPIA}/${id}`);
            return res.data;
        } catch (e) { return handleError(e); }
    }
}