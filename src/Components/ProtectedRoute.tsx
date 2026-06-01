import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type {  RoleProtectedRouteProps } from '../Interfaces/Auth/Auth.Interfaces';

export default function RoleProtectedRoute({ children }: RoleProtectedRouteProps) {
    const token = Cookies.get('token');

    if (!token || token === 'undefined') {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}