import React, {useContext} from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'
import {AuthContext} from "../../context/context";
import {Link} from "react-router-dom";

export const Header = () => {
    const {isAuth, setAuth} = useContext(AuthContext);

    const logout = (e) => {
        e.preventDefault();
        setAuth(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
    }

    return (
        <header
            className={classes.my__header}>
            <div className="container">
                <div className={"row"}>
                    <Link to={"/main"}
                          className={[classes.my__logo, "col-1"].join(' ')}>
                        <img
                            className={classes.my__img}
                            src={image}  alt={":("}/>
                        <div className={[classes.my__title, "flex-column justify-content-center"].join(' ')}>GS-Store</div>
                    </Link>
                </div>
                <button className={classes.my__button}
                        onClick={logout}>Logout</button>
            </div>
        </header>
    );
};