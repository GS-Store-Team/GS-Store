import React, {useCallback, useContext} from 'react';
import classes from "./review.module.css";
import man from './../../UI/img/reviewPic.png'
import star from './../../UI/img/star.png'
import {FlexColumn, FlexRow} from "../default/Flex.styled";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../App";

export const Review = ({comment}) => {
    const navigate = useNavigate();

    const profile = useCallback( () =>{
        navigate('/user/' + comment.reviewer);
    },[navigate])

    return (
        <div className={classes.my__review}>
            <FlexRow justifyContent={"flex-start"} gap={"0"}>
                <img className={classes.my__img}
                     src={man}
                     alt={".."}/>
                <div className={classes.my__username} onClick={profile}>
                    {comment.nickName}
                </div>
               <div className={classes.my__rate}>
                    {comment.mark}/5
               </div>
            </FlexRow>
            <div className={classes.my__text}>
                {comment.text}
            </div>
        </div>
    );
};