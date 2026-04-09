import { Navigate } from "react-router-dom";
import { authService } from "@/features/auth/services/auth.service";

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
