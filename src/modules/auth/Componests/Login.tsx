import { useState } from "react";
import { authService } from "../../../api/auth.service";

const Login = () => {
    const [loginState, useLoginState] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const onFormSubmitHandler = (event: any) => {
        event.preventDefault()
        console.log(loginState);
        authService.login(loginState)
    }

    const OnChange = (value: any, name: any) => {
        useLoginState((data: any) => {
            return {
                ...data,
                [name]: value
            }
        })

    }

    return (
        <div>
            <h1>
                Login
            </h1>

            <form onSubmit={onFormSubmitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={loginState.email} onChange={(e: any) => OnChange(e.target.value, 'email')} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={loginState.password} onChange={(e: any) => OnChange(e.target.value, 'password')} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e: any) => OnChange(e.target.checked, 'rememberMe')} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login