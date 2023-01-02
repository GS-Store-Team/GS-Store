import React from 'react';
import classes from "./tags.module.css";
import cross from './../../UI/img/cross.png'

export const SelectedTag = ({name, remove}) => {
    return (
        <div className={classes.selected__tag}>
            <div className={classes.text}>#{name}</div>
            <img className={classes.cross}
                 src={cross}
                 alt={".."}
                 onClick={() => remove(name)}
            />
        </div>
    );
};