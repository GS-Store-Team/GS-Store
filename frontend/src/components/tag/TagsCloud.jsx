import React from 'react';
import classes from "./tags.module.css";
import {TagVisualization} from "./TagVisualization";

export const TagsCloud = ({list, selectedTags, add, close}) => {

    return (
        <div className={classes.full__area}
             onClick={() => close(false)}>
            <div className={classes.tag__cloud}
            onClick={(e) => e.stopPropagation()}>
                {list.map((tag) => <TagVisualization id={tag.id} tag={tag} add={add} selected={selectedTags.includes(tag)}/>)}
            </div>
        </div>
    );
};