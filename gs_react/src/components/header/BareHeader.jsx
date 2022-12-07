import React, {useContext} from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'
import {AuthContext} from "../../context/context";

export const BareHeader = () => {
    const {isAuth, setAuth} = useContext(AuthContext);

    return (
        <header
                className={classes.my__header}>
            <div className="container">
                <div className={"row"}>
                    <div
                        className={[classes.my__logo, "col-1"].join(' ')}>
                        <img
                             className={classes.my__img}
                             src={image}  alt={":("}/>
                        <div className={[classes.my__title, "flex-column justify-content-center"].join(' ')}>GS-Store</div>
                    </div>
                    <div
                        className={["col-1"].join(' ')}>
                    </div>
                </div>
            </div>
        </header>
    );
};