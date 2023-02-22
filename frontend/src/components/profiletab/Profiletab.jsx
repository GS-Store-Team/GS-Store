import React, {useContext} from 'react';
import classes from "./profiletab.module.css";
import {AuthContext} from "../../context/context";
import man from "../../UI/img/man.png";
import exit from "../../UI/img/exit.png";
import line from "../../UI/img/line.png";

export const Profiletab = () => {

    const {isAuth, setAuth} = useContext(AuthContext);

    const logout = (e) => {
        e.preventDefault();
        setAuth(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
    }
    return (
        <div className={classes.my__logo}>
            <img
                className={classes.my__img1}
                src={man}  alt={":("}/>

            <div className={classes.my__name}>
                Ivan Ivanov
            </div>

            <img
                className={classes.my__img3}
                src={line}  alt={":("}/>

            <img onClick={(e) => logout(e)}
                 className={classes.my__img2}
                 src={exit}  alt={":("}/>

        </div>
    );
};

