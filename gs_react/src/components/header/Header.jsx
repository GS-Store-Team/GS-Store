import React, {useContext} from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'
import {AuthContext} from "../../context/context";
import {Link} from "react-router-dom";
import {Search} from "../search/Search";
import {Profiletab} from "../profiletab/Profiletab";
import {Category} from "../category/Category";

export const Header = ({setFilter, setCurrentCat}) => {
    return (
        <header
            className={classes.my__header}>
            <div className="container" style={{height: "100%"}}>
                <div className={classes.my__container}>

                    <Link to={"/main"}
                          style={{textDecoration: "none"}}
                          className={[classes.my__logo, "col-6"].join(' ')}>
                        <img
                            className={classes.my__img}
                            src={image}  alt={":("}/>
                        <div className={[classes.my__title, "flex-column justify-content-center"].join(' ')}>GS-Store</div>
                    </Link>

                    <Category setCurrentCat={setCurrentCat}/>

                    <Search className={["col-6"].join(' ')}
                            setFilterFunc={setFilter}/>

                    <div className={classes.my__tags}>
                        #tags
                    </div>

                    <Profiletab />
                </div>
            </div>
        </header>
    );
};