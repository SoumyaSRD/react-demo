import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute, UnProtectedRoute } from "@/router/guards/AuthGuard";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/features/user/pages/User";
import Login from "@/features/auth/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='login' />
  },
  {
    path: "login",
    element: <UnProtectedRoute element={<Login />}></UnProtectedRoute>,
  },
  {
    path: "home",
    element: <ProtectedRoute element={<MainLayout><Home /></MainLayout>}></ProtectedRoute>,
  },
]);
