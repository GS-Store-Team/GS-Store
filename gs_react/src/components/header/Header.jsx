import React from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'

const Header = () => {
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
                </div>
            </div>
        </header>
    );
};

export default Header;