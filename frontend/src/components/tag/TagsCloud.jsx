import React, {useRef} from 'react';
import classes from "./tags.module.css";
import {TagVisualization} from "./TagVisualization";
import {useOutsideClick} from "../../hooks/Hooks";

export const TagsCloud = ({list, selectedTags, add, setVisible}) => {
    const ref = useRef(null)

    useOutsideClick(ref, () => setVisible(false))

    return (
        <div
            ref={ref}
            className={classes.tag__cloud}
            onClick={(e) => e.stopPropagation()}
        >
            {list.map((tag) => <TagVisualization id={tag.id} tag={tag} add={add} selected={selectedTags.includes(tag)}/>)}
        </div>
    );
};