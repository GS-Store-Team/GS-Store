import React from 'react';
import classes from "./footer.module.css";

export const MyFooter = () => {
    return (
        <div className={classes.my_footer}>
            <div className={"container"}>
                <div className={classes.my__container}>
                        <div className={classes.footer_text}>Home</div>
                        <div className={classes.footer_text} >Contacts</div>
                        <div className={classes.footer_text} >Profile</div>
                </div>
                <hr className={classes.my__hr}/>
                <p className={classes.my__footer__title}>(c) 2022 GS-Store Inc.</p>
            </div>
        </div>
    );
};

