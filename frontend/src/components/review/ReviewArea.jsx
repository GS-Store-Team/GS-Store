import React, {useEffect, useState} from 'react';
import classes from "../../pages/pluginview/pluginpage.module.css";
import {ReviewList} from "./ReviewList";
import Api from "../../API/Api";
import {MyReview} from "./MyReview";

export const ReviewArea = ({pluginId}) => {
    const [reviews, setReviews] = useState([])
    const [fetch, setFetch] = useState(false)
    const [, setCurrentPage] = useState(null)

    useEffect(() => {
        if(!pluginId) return;

        Api.getReviews(pluginId).then((response) => {
            setCurrentPage(response.data)
            setReviews(response.data.content)
        })
    }, [pluginId, fetch])

    return (
        <div className={classes.wrapper}>
            <div className={classes.my__review__title}>Reviews</div>
                <ReviewList reviews={reviews}/>
            <MyReview pluginId={pluginId} handleSend={() => setFetch(!fetch)}/>
        </div>
    );
};