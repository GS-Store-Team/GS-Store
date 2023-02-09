import React from 'react';
import classes from "./tags.module.css";

export const TagVisualization = ({tag, add, selected}) => {
    return (
        <div className={selected? classes.tag__viz__selected : classes.tag__viz}
             onClick={() => add(tag)}
        >
            #{tag.title}
        </div>
    );
};