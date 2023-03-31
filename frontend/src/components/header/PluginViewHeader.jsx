import React from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'
import {useNavigate} from "react-router-dom";
import {ProfileTab} from "../profiletab/ProfileTab";

export const PluginViewHeader = () => {
    const navigate = useNavigate();
    const myNavigate = () =>{
        navigate('/main');
    }

    return (
        <header
            className={classes.my__header}>
            <div className="container" style={{height: "100%"}}>
                <div className={classes.my__container}>

                    <div onClick={myNavigate}
                         style={{textDecoration: "none"}}
                         className={[classes.my__logo, "col-6"].join(' ')}>
                        <img
                            className={classes.my__img}
                            src={image}  alt={":("}/>
                        <div className={[classes.my__title, "flex-column justify-content-center"].join(' ')}>GS-Store</div>
                    </div>

                    <ProfileTab/>
                </div>
            </div>
        </header>
    );
};