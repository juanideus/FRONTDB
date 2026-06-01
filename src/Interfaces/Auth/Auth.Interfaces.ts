export interface loginRequest{
    correo: string;
    contrasenia: string;
}

export interface loginResponse{
    status: number;
    message: string;
    data: {
        id: number;
        correo: string;
        contrasenia: string;
        token: string;
    } | null;
}

export interface registerRequest{
    nombre: string;
    correo: string;
    contrasenia: string;
    bono:number;
    rut:string;
    sueldo:number;

}
export interface registerResponse{
    status: number;
    message: string;
    data: {
        id: number;
        nombre: string;
        correo: string;
        contrasenia: string;
        bono:number;
        rut:string;
        sueldo:number;
    } | null;
}
//No tocar
export interface DecodedToken {
    //
    role?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
    [key: string]: unknown;
}

export interface RoleProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

export interface ApiResponse<T = unknown> {
    status: number;
    message: string;
    data: T | null;
}
 