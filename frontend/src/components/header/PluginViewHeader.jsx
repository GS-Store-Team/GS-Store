import React from 'react';
import classes from './header.module.css'
import {useNavigate} from "react-router-dom";
import {LogoTab, ProfileTab} from "./Tabs";

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
                    <LogoTab onClick={myNavigate}/>
                    <ProfileTab />
                </div>
            </div>
        </header>
    );
};