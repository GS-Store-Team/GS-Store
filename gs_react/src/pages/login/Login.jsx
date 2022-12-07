import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/context";
import Api from "../../API/Api";
import classes from "./login.module.css";
import {BareHeader} from "../../components/header/BareHeader";

const Login = () => {

    const [request, setRequest] = useState({
            username:"",
            password:"",
        });

    const {isAuth, setAuth} = useContext(AuthContext);

    const login = (e) => {
        e.preventDefault();

        Api.login(request).then((response)=>{
            if(response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setAuth(true);
                localStorage.setItem('auth', 'true');
            }
        });
    }

    return (
        <div>
            <BareHeader />
            <div className={classes.my_login__form}>
               <div className={classes.my__title}>Login</div>
                <label className={classes.my__label1}
                       htmlFor={"email"}>Email</label>
                <input id={"email"}
                       className={classes.my__input}
                       type={"text"}
                       value={request.username}
                       onChange={event => {setRequest({...request, username: event.target.value})}}
                />
                <label className={classes.my__label2}
                       htmlFor={"password"}>Password</label>
                <input id={"password"}
                       className={classes.my__input}
                       type={"password"}
                       value={request.password}
                       onChange={event => {setRequest({...request, password: event.target.value})}}
                />
                <button className={classes.my__button}
                        onClick={login}>Sign in</button>
            </div>
        </div>
    );
};

export default Login;