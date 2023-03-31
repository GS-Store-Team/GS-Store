import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import classes from "./profiletab.module.css";
import {AuthContext} from "../../context/context";
import man from "../../UI/img/man.png";
import exit from "../../UI/img/exit.png";
import line from "../../UI/img/line.png";
import {useUserCredentials} from "../../hooks/Hooks";
import Api from "../../API/Api";

export const ProfileTab = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        active: true,
        description: '',
        email: '',
        id: 1,
        image: '',
        nickName: '',
        phoneNumber: ''
    })


    useEffect(() => {
        Api.getCurrentUser().then((response) => {
            setUserData(response.data)
        })
    }, [])

    const {setAuth} = useContext(AuthContext);
    const logout = (e) => {
        e.preventDefault();
        setAuth(false);
        sessionStorage.removeItem('token');
    }


    const myProfile = useCallback( () =>{
        navigate('/user/' + userData.id);
    },[navigate])

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
