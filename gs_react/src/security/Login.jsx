import React, {useContext} from 'react';
import {AuthContext} from "../context/context";

const Login = () => {

    const {isAuth, setAuth} = useContext(AuthContext);
    const login = (e) => {
        e.preventDefault();
        setAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
           <h1>Login form</h1>
            <input type={"text"} placeholder={"login"}/>
            <input type={"text"} placeholder={"password"}/>
            <button onClick={login}>go</button>
        </div>
    );
};

export default Login;