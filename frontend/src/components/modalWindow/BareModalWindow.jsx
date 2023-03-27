import React from 'react';

import classes from "./baremodalWindow.module.css";

const BareModalWindow = ({accept, decline}) => {
    return (
        <div className={classes.my__main}>
            <div onClick={decline} className={classes.my__modal}></div>
            <div className={classes.my__modalInput}>

                dddd
            </div>

        </div>
    )
}
export default BareModalWindow;