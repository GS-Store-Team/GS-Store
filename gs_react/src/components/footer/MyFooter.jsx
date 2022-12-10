import React from 'react';
import classes from "./footer.module.css";

export const MyFooter = () => {
    return (
        <div className={classes.my_footer}>
            <div className={"container"}>
                <div>
                        <p className={classes.footer_text}>Home</p>
                        <p className={classes.footer_text} style={{marginLeft: "20px"}}>Contacts</p>
                        <p className={classes.footer_text} style={{marginLeft: "20px"}}>Profile</p>
                    <hr style={{width:"50%", marginLeft:"25%"}}/>
                    <p style={{textAlign:"center"}}>(c) 2022 GS-Store Inc.</p>
                </div>
            </div>
        </div>
    );
};

