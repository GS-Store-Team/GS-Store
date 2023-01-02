import React, {useState} from 'react';
import Api from "../../API/Api";
import {BareHeader} from "../../components/header/BareHeader";
import classes from "./signup.module.css";
import {Link, useNavigate} from "react-router-dom";
import {LoginFooter} from "../../components/footer/LoginFooter";

export const SignUp = () => {

    const [request, setRequest] = useState({
        username:"",
        password:"",
        confirmPassword:""
    });

    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();

        if(request.password === request.confirmPassword) {
            Api.signUp({username:request.username, password:request.password}).then((response) => {
                if (response.status === 200) {
                    navigate("/login");
                }
            });
        }
    }

    return (
        <div>
            <BareHeader />
            <div className={classes.my_login__form}>
                <div className={classes.my__title}>Sign Up</div>
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
                <label className={classes.my__label3}
                       htmlFor={"confirm_password"}>Confirm pass</label>
                <input id={"confirm_password"}
                       className={classes.my__input}
                       type={"password"}
                       value={request.confirmPassword}
                       onChange={event => {setRequest({...request, confirmPassword: event.target.value})}}
                />
                <div className={classes.my__div}>
                    <button className={classes.my__button}
                            onClick={(e) => signUp(e)}>Sign up</button>
                    <Link to={"/login"}
                          style={{textDecoration: "none"}}
                          className={classes.my__button1}>
                            Sign in</Link>
                </div>
            </div>
            <LoginFooter />
        </div>
    );
};