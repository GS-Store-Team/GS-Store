import React from 'react';
import classes from "./review.module.css";

export const Review = (review) => {
    return (
        <div className={classes.my__div}>
            {review.review}
        </div>

        /*        <div className={classes.my__div}>
                    <input className={classes.my__input}
                           placeholder={"Type review"}
                           value={review}
                           onChange={(e) => setReview(e.target.value)}
                           type={"text"}/>
                    <button
                        className={classes.my__button}
                        onClick={e => send(e)}/>
                </div>*/
    );
};