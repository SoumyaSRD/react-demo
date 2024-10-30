import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute, UnProtectedRoute } from "../guards/AuthGuard";


import Home from "../modules/auth/Components/Home";
import Login from "../modules/auth/Components/Login";

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
    element: <ProtectedRoute element={<Home />}></ProtectedRoute>,
  },
]);
