import React, {useContext} from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'
import {AuthContext} from "../../context/context";

const Header = () => {
    const {isAuth, setAuth} = useContext(AuthContext);

    const logout = (e) => {
        e.preventDefault();
        setAuth(false);
        localStorage.removeItem('auth');
    }

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
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;