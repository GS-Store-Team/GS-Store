import React, {useEffect, useState} from 'react';
import Api from "../../API/Api";
import classes from "./signup.module.css";
import {Link, useNavigate} from "react-router-dom";
import {LoginFooter} from "../../components/footer/LoginFooter";
import * as Utils from "../../utils/Utils";
import {Styled as S} from "../Pages.styled"
import {Header} from "../../components/header/Header";

export const SignUp = () => {

    const [request, setRequest] = useState({
        username:"",
        password:"",
        confirmPassword:""
    });

    const [badConfirm, setBadConfirm] = useState(false);
    const [badEmail, setBadEmail] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [emailList, setEmailList] = useState([]);
    const navigate = useNavigate();

    const signUp = () => {
        Api.signUp({username:request.username, password:request.password}).then((response) => {
            if (response.status === 200) {
                navigate("/login");
            }
        }).catch((error) => {
            if(error.response.status === 409){
                setEmailExists(true);
                setEmailList([...emailList,request.username]);
            }
        });
    }

    useEffect(() => {

        if(emailList.includes(request.username)) setEmailExists(true);
        else setEmailExists(false);

        if(request.username.length !== 0 && !Utils.validateEmail(request.username))setBadEmail(true)
        else setBadEmail(false);

        if(request.password !== request.confirmPassword ||
            (request.password.length < 8 && request.password.length !== 0) ||
            request.password.length > 32) setBadConfirm(true)
        else setBadConfirm(false);
    }, [request])

    const trySingUp = (e) => {
        e.preventDefault();

        if(!(badEmail || badConfirm || emailExists) && request.password.length >0 && request.username.length>0)
            signUp();
    }

    return (
        <S.Wrapper>
            <Header disableProfile/>
            <S.Main style={{display: "flex"}}>
                <div className={classes.my_login__form}>
                    <div className={classes.my__title}>Sign Up</div>
                    <label className={classes.my__label1}
                           htmlFor={"email"}>Email</label>
                    <input id={"email"}
                           className={badEmail?classes.my__input__bad:classes.my__input}
                           type={"text"}
                           value={request.username}
                           onChange={event => {setRequest({...request, username: event.target.value})}}
                    />
                    {emailExists?<div className={classes.my__alert__message}>User with such Email already exists!</div>:null}
                    {badEmail?<div className={classes.my__alert__message}>Bad email</div>:null}
                    {request.username.length === 0?<div className={classes.my__alert__message}>Email cannot be empty</div>:null}
                    <label className={classes.my__label2}
                           htmlFor={"password"}>Password</label>
                    <input id={"password"}
                           className={badConfirm? classes.my__input__bad:classes.my__input}
                           type={"password"}
                           value={request.password}
                           onChange={event => {setRequest({...request, password: event.target.value})}}
                    />
                    {request.password.length < 8?<div className={classes.my__alert__message}>Password length at least 8 characters</div>:null}
                    {request.password.length > 32?<div className={classes.my__alert__message}>Password length can not be more than 32 chars</div>:null}
                    <label className={classes.my__label3}
                           htmlFor={"confirm_password"}>Confirm pass</label>
                    <input id={"confirm_password"}
                           className={badConfirm? classes.my__input__bad:classes.my__input}
                           type={"password"}
                           value={request.confirmPassword}
                           onChange={event => {setRequest({...request, confirmPassword: event.target.value})}}
                    />
                    {badConfirm?<div className={classes.my__alert__message}>Password and confirmation do not match</div>:null}
                    <div className={classes.my__div}>
                        <button className={classes.my__button}
                                onClick={(e) => trySingUp(e)}>Sign up</button>
                        <Link to={"/login"}
                              style={{textDecoration: "none"}}
                              className={classes.my__button1}>
                                Sign in</Link>
                    </div>
                </div>
            </S.Main>
            <LoginFooter />
        </S.Wrapper>
    );
};