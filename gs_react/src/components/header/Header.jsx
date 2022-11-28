import React from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'

const Header = () => {
    return (
        <header
                className={classes.my__header}>
            <div >
                <img
                     className={[classes.my__img].join(' ')}
                     src={image}  alt={":("}/>
            </div>
        </header>
    );
};

export default Header;