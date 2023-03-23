import React, {useEffect, useState} from 'react';
import {Review} from "./Review";
import Api from "../../API/Api";
import classes from "../../pages/pluginview/pluginpage.module.css";
export const ReviewList = ({reviews}) => {
    return (
        <div className={classes.review__area}>
            {reviews.map((c, index) => <Review review={c.text} username={c.reviewer} mark={c.mark} key={index}/>)}
        </div>
    );
};