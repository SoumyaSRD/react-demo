import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/features/auth/services/auth.service";

const Login = () => {
    const navigate = useNavigate();
    const [loginState, useLoginState] = useState({
        username: "",
        password: "",
    });

    const onFormSubmitHandler = (event: any) => {
        event.preventDefault();
        loginAPi();
    };

    const loginAPi = async () => {
        try {
            const response = await authService.login({
                username: loginState.username || "emilys", // Default for demo if empty
                password: loginState.password || "emilyspass"
            });
            let { accessToken } = response.data;
            if (accessToken) {
                authService.setItem("token", accessToken);
                navigate("/home");
            }
        } catch (error) {
            authService.removeItem("token");
        }
    };

    const OnChange = (value: any, name: any) => {
        useLoginState((data: any) => {
            return {
                ...data,
                [name]: value,
            };
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">
            <div className="glass-card p-5 shadow-lg" style={{ maxWidth: '480px', width: '100%' }}>
                <div className="text-center mb-5">
                    <div className="glass-panel d-inline-flex p-3 rounded-4 mb-4">
                        <h2 className="m-0 fw-bold-custom text-main px-2">DemoApp</h2>
                    </div>
                    <h1 className="fw-bold-custom text-main mb-2">Welcome Back</h1>
                    <p className="text-muted-custom fw-medium">Sign in to continue to your dashboard</p>
                </div>
                
                <form onSubmit={onFormSubmitHandler}>
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted-custom ms-1">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control glass-input"
                            placeholder="Enter your username"
                            value={loginState.username}
                            onChange={(e: any) => OnChange(e.target.value, "username")}
                        />
                    </div>
                    
                    <div className="mb-5">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="form-label small fw-bold text-muted-custom ms-1 mb-0">
                                Password
                            </label>
                            <a href="#" className="small text-decoration-none icon-primary fw-bold">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            className="form-control glass-input"
                            placeholder="••••••••"
                            value={loginState.password}
                            onChange={(e: any) => OnChange(e.target.value, "password")}
                        />
                    </div>
                    
                    <button type="submit" className="btn-glass-primary w-100 py-3 shadow-sm mb-4">
                        Sign In
                    </button>
                    
                    <p className="text-center text-muted-custom small fw-medium mb-0">
                        Don't have an account? <a href="#" className="icon-primary text-decoration-none fw-bold">Contact Admin</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
