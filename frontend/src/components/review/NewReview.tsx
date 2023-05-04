import React, {CSSProperties, FC, useCallback, useEffect, useState} from 'react';
import classes from "./stars.module.css";
import {Comment} from "../../Types";
import {Styled as S} from "./Review.styled";
import {FlexRow} from "../default/Flex.styled";
import {Btn} from "../default/Btn";
import {TextArea} from "../default/Form";
import cross from './../../UI/img/cross.png'
import {Icon} from "../default/Icon";

interface INewReview{
    uploadComment: (comment : Partial<Comment>) => void;
    currentComment: Partial<Comment>;
}
export const NewReview : FC<INewReview>= ({uploadComment, currentComment}) => {
    const [badInputCSS,] = useState<CSSProperties>(() => {return {borderColor: "red", backgroundColor: "rgba(255, 0, 0, 0.1)"}})
    const [inputStyle, setInputStyle] = useState<CSSProperties>({height: "120px", resize: "none", backgroundColor: "#eaeaea"})
    const [comment, setComment] = useState<Partial<Comment>>(currentComment)

    useEffect(() => {
        setComment(currentComment)
    }, [currentComment])

    const resetComment = useCallback(() => {
       setComment(currentComment)
    }, [setComment])

     const handleClick = useCallback(() => {
        uploadComment(comment)
        resetComment()
     }, [comment, resetComment])

    useEffect(() => {
        if(comment.text && comment.text.length > 2048)
            setInputStyle(prevState => ({...prevState, ...badInputCSS}))
        else
            setInputStyle({height: "120px", resize: "none", backgroundColor: "#eaeaea"})
    }, [comment])

    const equalToPreviousComment = useCallback(() => { return comment.text === currentComment.text && comment.mark === currentComment.mark }, [comment, currentComment])

    return (
        <S.NewReview>
            <FlexRow justifyContent={"end"}>
                <Icon style={{width:"15px", height:"15px", margin: "5px"}} img={"cross"} tooltip={{label:"Clear review", placement:"bottom"}} onClick={resetComment}/>
            </FlexRow>
            <TextArea style={inputStyle}
                      placeholder={"Type review"}
                      value={comment.text}
                      onChange={e => setComment(prevState => ({...prevState, text: e.target.value}))}>
            </TextArea>
            <FlexRow justifyContent={"space-between"} style={{paddingTop:"10px"}}>
                <div className={classes.my__rating}>
                    <input type="radio" id="star-5" name="rating" value="5" checked={comment.mark === 5} onChange={() => setComment(prevState => ({...prevState, mark: 5}))}/>
                    <label htmlFor="star-5"></label>
                    <input type="radio" id="star-4" name="rating" value="4" checked={comment.mark === 4} onChange={() => setComment(prevState => ({...prevState, mark: 4}))}/>
                    <label htmlFor="star-4"></label>
                    <input type="radio" id="star-3" name="rating" value="3" checked={comment.mark === 3} onChange={() => setComment(prevState => ({...prevState, mark: 3}))}/>
                    <label htmlFor="star-3"></label>
                    <input type="radio" id="star-2" name="rating" value="2" checked={comment.mark === 2} onChange={() => setComment(prevState => ({...prevState, mark: 2}))}/>
                    <label htmlFor="star-2"></label>
                    <input type="radio" id="star-1" name="rating" value="1" checked={comment.mark === 1} onChange={() => setComment(prevState => ({...prevState, mark: 1}))}/>
                    <label htmlFor="star-1"></label>
                </div>
                <Btn style={{fontSize: "12px"}} disabled={(comment.text? comment.text.length === 0 || comment.text.length > 2048 : true) || equalToPreviousComment()} secondary onClick={handleClick}>Comment</Btn>
            </FlexRow>
        </S.NewReview>
    );
};