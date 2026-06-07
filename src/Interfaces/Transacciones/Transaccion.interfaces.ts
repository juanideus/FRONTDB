export interface TransaccionRequest {
    Trabajadorid: number;
    Usuarioid: number;
    Copia_libroid: number[];
    es_venta: boolean;
    es_prestamo: boolean;
}