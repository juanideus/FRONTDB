export interface LibroRequest {
    Nombre: string;
    Genero: string;
    Autor: string;
    fecha_recepcion: string;
    cantidad_copias: number;
    edad_sugerida: number;
    editorial: string;
    precio: number;
    estado: number;
}
export interface UpdatePrecioRequest {
    id: number;
    precio: number;
}
 