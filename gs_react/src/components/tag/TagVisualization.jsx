import React from 'react';
import classes from "./tags.module.css";

export const TagVisualization = ({title, add, selected}) => {
    return (
        <div className={selected? classes.tag__viz__selected : classes.tag__viz}
             onClick={() => add(title)}
        >
            #{title}
        </div>
    );
};