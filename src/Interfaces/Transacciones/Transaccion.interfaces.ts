export interface TransaccionRequest {
    Trabajadorlid: number;
    Usuarioid: number;
    Copia_libroid: number[];
    es_venta: boolean;
    es_prestamo: boolean;
}