import { Navigate } from "react-router";
import { authService } from "../api/auth.service";

export const ProtectedRoute: any = ({ element }: any) => {
    return authService.isAuthenticated() ? element : <Navigate to="/login" />;
};

export const UnProtectedRoute: any = ({ element }: any) => {
    return !authService.isAuthenticated() ? element : <Navigate to="/home" />;
};

export const DefaultRoute: any = ({ element }: any) => {
    return authService.isAuthenticated() ? (
        <ProtectedRoute element={element} />
    ) : (
        <UnProtectedRoute element={element} />
    );
};
