import React from 'react';
import classes from "./tags.module.css";
import {SelectedTag} from "./SelectedTag";

export const SelectedTags = ({list, remove}) => {
    return (
        list.length >0?
            <div className={classes.selected__tags__area}>
                {list.map((e) => <SelectedTag name={e} remove={remove}/>)}
            </div>
            :<div />
    );
};