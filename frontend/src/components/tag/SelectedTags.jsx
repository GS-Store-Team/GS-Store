import React from 'react';
import classes from "./tags.module.css";
import {SelectedTag} from "./SelectedTag";
import image from "../../UI/img/trash-bin.png";

export const SelectedTags = ({list, remove, removeAll}) => {
    return (
        list.length >0?
             <div className={classes.tags__area}>
                <div className={classes.selected__tags__area}>
                    {list.map((e, index) => <SelectedTag key={index} tag={e} remove={remove}/>)}
                </div>
               <div className={classes.remove__all__tags} onClick={removeAll}>
                   <img
                       className={classes.remove__all__tags}
                       src={image}  alt={":("}/>
               </div>
            </div>
            :<></>
    );
};