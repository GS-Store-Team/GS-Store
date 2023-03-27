import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import classes from "./profiletab.module.css";
import {AuthContext} from "../../context/context";
import man from "../../UI/img/man.png";
import exit from "../../UI/img/exit.png";
import line from "../../UI/img/line.png";
import Api from "../../API/Api";

export const Profiletab = () => {

    const {isAuth, setAuth} = useContext(AuthContext);

    const logout = (e) => {
        e.preventDefault();
        setAuth(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
    }

    const [userData, setUserData] = useState({
        active: true,
        description: '',
        email: '',
        id: 1,
        image: 'abab',
        nickName: 'name1',
        phoneNumber: ''
    });

    useEffect(() => {
        Api.getUser().then((response) => {setUserData(response.data)});
    }, []);

    const navigate = useNavigate();
    const myProfile = () =>{
        navigate('/user/' + userData.id);
    }

    return (
        <div className={classes.my__logo}>
            <img
                onClick={myProfile}
                className={classes.my__img1}
                src={man}  alt={":("}/>

            <div className={classes.my__name} onClick={myProfile}>
                {userData.nickName}
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

