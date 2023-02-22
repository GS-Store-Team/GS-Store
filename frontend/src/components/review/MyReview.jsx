import React from 'react';
import classes from "./myreview.module.css";

export const MyReview = () => {
    /*     const [review, setReview] = useState("");
       const send = (e) => {
            Api.sendReview(review);
            console.log("review sended");
            console.log();
        }*/

    return (
        <div className={classes.my__div}>
            <textarea
                className={classes.my__textarea}
                name="text" placeholder={"Type review"}/>

            <div className={classes.my__mark}>
                <div className={classes.my__rating}>
                    <input type="radio" id="star-5" name="rating" value="5"/>
                    <label htmlFor="star-5"></label>
                    <input type="radio" id="star-4" name="rating" value="4"/>
                    <label htmlFor="star-4"></label>
                    <input type="radio" id="star-3" name="rating" value="3"/>
                    <label htmlFor="star-3"></label>
                    <input type="radio" id="star-2" name="rating" value="2"/>
                    <label htmlFor="star-2"></label>
                    <input type="radio" id="star-1" name="rating" value="1"/>
                    <label htmlFor="star-1"></label>
                </div>

            <input
                className={classes.my__button}
                type="submit" value="Send"
                /*onClick={send}*/
            />
            </div>
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