import React from 'react';
import classes from "./tags.module.css";
import cross from './../../UI/img/cross.png'

export const SelectedTag = ({tag, remove}) => {
    return (
        <div className={classes.selected__tag}>
            <div className={classes.text}>#{tag.title}</div>
            <img className={classes.cross}
                 src={cross}
                 alt={".."}
                 onClick={() => remove(tag)}
            />
        </div>
    );
};