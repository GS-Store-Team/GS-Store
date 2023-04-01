import React from 'react';
import {Review} from "./Review";
import classes from "../../pages/pluginview/pluginpage.module.css";

export const ReviewList = ({reviews}) => {
    return (
        <div className={classes.review__area}>
            {reviews.map((c, index) => <Review comment={c} key={index}/>)}
        </div>
    );
};