import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {ReviewList} from "./ReviewList";
import Api from "../../API/Api";
import {NewReview} from "./NewReview";
import {Comment} from "../../types/Types";
import {Styled as S} from "./Review.styled"
import {FlexRow} from "../default/Flex.styled";
import filter from "../../UI/img/filter.png";
import {DropDownMenu, IDropDownMenuElement} from "../default/DropDownMenu";

interface IReviewArea{
    pluginId: number;
}
export const ReviewArea : FC<IReviewArea> = ({pluginId}) => {
    const [reviews, setReviews] = useState([])
    const [fetch, setFetch] = useState<boolean>(false)
    const [, setCurrentPage] = useState(null)
    const ref = useRef(null)

    useEffect(() => {
        Api.getReviews(pluginId).then((response) => {
            setCurrentPage(response.data)
            setReviews(response.data.content)
        })
    }, [fetch])

    const handleUploadComment = useCallback((comment : Partial<Comment>) => {
        Api.sendReview(comment, pluginId).then(r => {
            setFetch(prevState => (!prevState))
        })
    },[setFetch])

    const filterIcon = useCallback(() => {
        return(
            <S.Filters>
                <img style={{width: "22px", height: "22px", margin: "auto"}} src={filter} alt={".."}/>
            </S.Filters>
        )
    }, [])

    const deleteComment = useCallback((comment: Comment) => {
        Api.deleteComment(comment).then(() => setFetch(prevState => (!prevState)))
    }, [setFetch])

    const options = useCallback(() => {
        const arr : IDropDownMenuElement[] = []

        arr.push({title:"Increase rate",action:() =>{console.log(1)}})
        arr.push({title:"Descending rate",action:() =>{console.log(2)}})
        arr.push({title:"Recent first",action:() =>{console.log(3)}})
        arr.push({title:"Natural order",action:() =>{console.log(4)}})
        arr.push({title:"My first",action:() =>{console.log(5)}})

        return arr
    }, [])

    return (
        <S.Area>
            <S.Title>
                <FlexRow justifyContent={"space-between"}>
                    Reviews
                    {reviews.length > 1 &&
                        <>
                            <S.Filters >
                                <img ref={ref} style={{width: "22px", height: "22px"}} src={filter} alt={".."}/>
                            </S.Filters>
                            <DropDownMenu  renderElementRef={ref} menuElements={options()} right={true}/>
                        </>
                    }
                </FlexRow>
            </S.Title>
            <ReviewList comments={reviews} deleteComment={deleteComment}/>
            <NewReview uploadComment={handleUploadComment}/>
        </S.Area>
    );
};