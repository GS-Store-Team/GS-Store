import React, {useCallback, useContext} from 'react';
import {useNavigate} from "react-router-dom"
import classes from "./profiletab.module.css";
import man from "../../UI/img/man.png";
import exit from "../../UI/img/exit.png";
import line from "../../UI/img/line.png";
import {AuthContext} from "../../App";

export const ProfileTab = () => {
    const navigate = useNavigate();
    const { setAuth, user } = useContext(AuthContext);

    const logout = useCallback(() => {
        setAuth(false);
    }, [])

    const myProfile = useCallback( () =>{
        navigate('/user/' + user.id);
    },[navigate])

    return (
        <div className={classes.my__logo}>
            <img
                onClick={myProfile}
                className={classes.my__img1}
                src={man}  alt={":("}/>
            <div className={classes.my__name} onClick={myProfile}>
                {user.nickName}
            </div>
            <img
                className={classes.my__img3}
                src={line}  alt={":("}/>
            <img onClick={logout}
                 className={classes.my__img2}
                 src={exit}  alt={":("}/>
        </div>
    );
};
