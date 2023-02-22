import React from 'react';
import classes from "./review.module.css";
import man from './../../UI/img/reviewPic.png'
import star from './../../UI/img/star.png'

export const Review = (review) => {
    return (
        <div className={classes.my__review}>
            <div className={classes.my__title}>
                <img className={classes.my__img}
                     src={man}
                     alt={".."}/>
                <div className={classes.my__username}>
                    {review.username}
                </div>

               <div className={classes.my__mark}>
                    {review.mark} / 5
               </div>

                <img className={classes.my__star}
                     src={star}
                     alt={".."}/>
            </div>
            <div className={classes.my__text}>
                {review.review}
            </div>
        </div>
    );
};