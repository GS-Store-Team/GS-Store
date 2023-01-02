import React from 'react';
import classes from "./tags.module.css";
import {TagVisualization} from "./TagVisualization";

export const TagsCloud = ({list, selectedTags, add, close}) => {

    return (
        <div className={classes.full__area}
             onClick={() => close(false)}>
            <div className={classes.tag__cloud}
            onClick={(e) => e.stopPropagation()}>
                {list.map(e => <TagVisualization title={e} add={add} selected={selectedTags.includes(e)}/>)}
            </div>
        </div>
    );
};