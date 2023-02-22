import React, {useEffect, useState} from 'react';
import {Review} from "./Review";
import Api from "../../API/Api";

export const ReviewList = (func) => {
    const [list, setList] = useState([
                {review:"The text string on which to search, for example: \"restaurant\" or \"123 Main Street\". This must a place name, address, or category of establishments. Any other types of input can generate errors and are not guaranteed to return valid results. The Google Places service will return candidate matches based on this string and order the results based on their perceived relevance.", mark:5, username:"JustUser"},
                {review:"My short review", mark:3, username:"Nick"},
                {review:"The Google Places service will return candidate matches based on this string and order the results based on their perceived relevance.", mark:4, username:"NameNick"}
    ])

/*    useEffect(() => {
        func.then((response) =>{
            if (response.status === 200)
                setList(response.data);
        }).catch(() => {
            setList([{review:"My first review"}, {review:"My second review"}, {review:"My third review"}])
        })
    }, [])*/
    return (
        <div>
            {list.map((c, index) => <Review review={c.review} username={c.username} mark={c.mark} key={index}/>)}
        </div>
    );
};