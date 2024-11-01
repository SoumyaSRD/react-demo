import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../api/auth.service";

const Login = () => {
    const navigate = useNavigate();
    const [loginState, useLoginState] = useState({
        email: "",
        // phone: "",
        password: "",
        // rememberMe: false,
    });
    const onFormSubmitHandler = (event: any) => {
        event.preventDefault();
        loginAPi();
    };

    const loginAPi = async () => {
        try {
            const response = await authService.login(loginState);
            console.log(response);
            let { token, expires } = response.data
            if (token) {

                authService.setItem("token", token);
                authService.setItem("expires", expires);
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
        <div className="card">
            <h1>Login</h1>

            <form onSubmit={onFormSubmitHandler} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={loginState.email}
                        onChange={(e: any) => OnChange(e.target.value, "email")}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Phone
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="text"
                        value={loginState.email}
                        onChange={(e: any) => OnChange(e.target.value, "email")}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div> */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={loginState.password}
                        onChange={(e: any) => OnChange(e.target.value, "password")}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={(e: any) => OnChange(e.target.checked, "rememberMe")}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
