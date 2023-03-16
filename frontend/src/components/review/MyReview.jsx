import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from "./myreview.module.css";
import Api from "../../API/Api";

export const MyReview = ({pluginId, handleSend}) => {
    const defaultReview = useCallback(() => { return {mark:1, text:""}}, [])

    const [review, setReview] = useState(defaultReview());

    const send = useCallback(() => {
        if(!pluginId) return;
        Api.sendReview(review, pluginId).then(() => {
                setReview(defaultReview())
                handleSend()
            }
        );
    }, [review, setReview])

    return (
        <div className={classes.my__div}>

            <hr className={classes.my__line}/>

            <textarea
                className={classes.my__textarea}
                name="text"
                placeholder={"Type review"}
                value={review.text}
                onChange={(e) => setReview(prevState => ({...prevState, text: e.target.value}))}
            />

            <div className={classes.my__mark}>
                <div className={classes.my__rating}>
                    <input type="radio" id="star-5" name="rating" value="5" checked={review.mark === 5} onChange={() => setReview(prevState => ({...prevState, mark: 5}))}/>
                    <label htmlFor="star-5"></label>
                    <input type="radio" id="star-4" name="rating" value="4" checked={review.mark === 4} onChange={() => setReview(prevState => ({...prevState, mark: 4}))}/>
                    <label htmlFor="star-4"></label>
                    <input type="radio" id="star-3" name="rating" value="3" checked={review.mark === 3} onChange={() => setReview(prevState => ({...prevState, mark: 3}))}/>
                    <label htmlFor="star-3"></label>
                    <input type="radio" id="star-2" name="rating" value="2" checked={review.mark === 2} onChange={() => setReview(prevState => ({...prevState, mark: 2}))}/>
                    <label htmlFor="star-2"></label>
                    <input type="radio" id="star-1" name="rating" value="1" checked={review.mark === 1} onChange={() => setReview(prevState => ({...prevState, mark: 1}))}/>
                    <label htmlFor="star-1"></label>
                </div>

            <input
                className={classes.my__button}
                type="submit" value="Send"
                onClick={send}
            />
            </div>
        </div>
    );
};