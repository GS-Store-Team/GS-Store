import React, {useContext, useEffect, useState} from 'react';
import Api from "../../API/Api";
import classes from "./login.module.css";
import {BareHeader} from "../../components/header/BareHeader";
import {Link} from "react-router-dom";
import {LoginFooter} from "../../components/footer/LoginFooter";
import * as Utils from "../../utils/Utils";
import {AuthContext} from "../../App";

export const Login = () => {

    const [request, setRequest] = useState({
            username:"",
            password:"",
        });

    const {setAuth} = useContext(AuthContext);

    const [badEmail, setBadEmail] = useState(false);
    const [emailDoNotExists, setEmailDoNotExists] = useState(false);
    const [emailList, setEmailList] = useState([]);
    const [badPassword, setBadPassword] = useState(false);
    const [passwordList, setPasswordList] = useState([])
    const [invalidPassword, setInvalidPassword] = useState(false);


    useEffect(() => {
        if(passwordList.includes(request.password)) setInvalidPassword(true);
        else setInvalidPassword(false);

        if(emailList.includes(request.username)) setEmailDoNotExists(true);
        else setEmailDoNotExists(false);

        if((request.password.length < 8 && request.password.length !== 0) || request.password.length > 32) setBadPassword(true)
        else setBadPassword(false);

        if(request.username.length !== 0 && !Utils.validateEmail(request.username)) setBadEmail(true)
        else setBadEmail(false);

    }, [request, emailList, passwordList])

    useEffect(() => {
        setPasswordList([]);
        setInvalidPassword(false)
    }, [request.username])

    const tryLogin = (e) => {
        e.preventDefault();

        if(!badEmail &&
            !badPassword &&
            !passwordList.includes(request.password) &&
            !emailList.includes(request.username) &&
            request.password.length>0 &&
            request.username.length>0) {
            login();
        }
    }

    const login = () => {
        Api.login(request).then((response)=>{
            if(response.status === 200) {
                sessionStorage.setItem('token', response.data.token);
                setAuth(true);
            }
            if(response.status === 204){
                setEmailDoNotExists(true);
                setEmailList([...emailList, request.username])
            }
        }).catch(() => {
            setInvalidPassword(true);
            setPasswordList([...passwordList, request.password])
        });
    }

    return (
        <div>
            <BareHeader />
            <div className={classes.my__form}>
                <div className={classes.my_login__form}>
                   <div className={classes.my__title}>Login</div>
                    <label className={classes.my__label1}
                           htmlFor={"email"}>Email</label>
                    <input id={"email"}
                           className={badEmail?classes.my__input__bad :classes.my__input}
                           type={"text"}
                           value={request.username}
                           onChange={event => {setRequest({...request, username: event.target.value})}}
                    />
                    {request.username.length === 0 ?<div className={classes.my__alert__message}>Email cannot be empty</div>:null}
                    {badEmail?<div className={classes.my__alert__message}>Bad email</div>:null}
                    {emailDoNotExists?<div className={classes.my__alert__message}>User with such email do not exists!</div>:null}
                    <label className={classes.my__label2}
                           htmlFor={"password"}>Password</label>
                    <input id={"password"}
                           className={badPassword? classes.my__input__bad:classes.my__input}
                           type={"password"}
                           value={request.password}
                           onChange={event => {setRequest({...request, password: event.target.value})}}
                    />
                    {invalidPassword?<div className={classes.my__alert__message}>Invalid password for current username!</div>:null}
                    {request.password.length < 8?<div className={classes.my__alert__message}>Password length at least 8 characters</div>:null}
                    {request.password.length > 32?<div className={classes.my__alert__message}>Password length can not be more than 32 chars</div>:null}
                    <div className={classes.my__div}>
                    <button className={classes.my__button}
                            onClick={(e) => tryLogin(e)}>Sign in</button>
                    <Link   to={"/signup"}
                            style={{textDecoration: "none"}}
                            className={classes.my__button1}>
                            Sign up</Link>
                    </div>
                </div>
            </div>
            <LoginFooter />
        </div>
    );
};