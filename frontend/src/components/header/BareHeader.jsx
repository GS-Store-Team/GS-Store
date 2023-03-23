import React, {useContext} from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'
import {AuthContext} from "../../context/context";

export const BareHeader = () => {

    return (
        <header
            className={classes.my__header}>
            <div className="container" style={{height: "100%"}}>
                <div className={classes.my__container}>
                    <div style={{textDecoration: "none"}}
                         className={[classes.my__logo, "col-6"].join(' ')}>
                        <img
                            className={classes.my__img}
                            src={image}  alt={":("}/>
                        <div className={[classes.my__title, "flex-column justify-content-center"].join(' ')}>GS-Store</div>
                    </div>
                </div>
            </div>
        </header>
    );
};