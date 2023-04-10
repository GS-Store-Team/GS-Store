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

const defaultComment = {id:undefined, mark:1, text:""}
export const ReviewArea : FC<IReviewArea> = ({pluginId}) => {
    const [reviews, setReviews] = useState([])
    const [fetch, setFetch] = useState<boolean>(false)
    const [, setCurrentPage] = useState(null)
    const ref = useRef(null)
    const [comment, setComment] = useState<Partial<Comment>>(defaultComment)
    const [sortType, setSortType] = useState<number>(2)

    useEffect(() => {
        Api.getReviews(pluginId, 1, 100, sortType).then((response) => {
            setCurrentPage(response.data)
            setReviews(response.data.content)
        })
    }, [fetch, sortType])

    const handleUploadComment = useCallback((comment : Partial<Comment>) => {
        console.log("HERE: ",comment)

        Api.sendReview(comment, pluginId).then(r => {
            setFetch(prevState => (!prevState))
        })
    },[setFetch])

    const deleteComment = useCallback((comment: Comment) => {
        Api.deleteComment(comment).then(() => setFetch(prevState => (!prevState)))
    }, [setFetch])

    const options = useCallback(() => {
        const arr : IDropDownMenuElement[] = []

        arr.push({title:"Recent first",   action:() => setSortType(1)})
        arr.push({title:"Natural order",  action:() => setSortType(2)})
        arr.push({title:"Ascending rate", action:() => setSortType(3)})
        arr.push({title:"Descending rate",action:() => setSortType(4)})
        arr.push({title:"My first",       action:() => setSortType(5)})
        return arr
    }, [])

    const handleEdit = useCallback((comment: Comment) => {
        setComment(comment)
    }, [setComment])

    return (
        <S.Area>
            <S.Title>
                <FlexRow justifyContent={"space-between"} style={{alignItems: "flex-start"}}>
                    Reviews
                    {reviews.length > 1 &&
                        <>
                            <S.Filters ref={ref}>
                                <img style={{width: "22px", height: "22px", margin: "auto"}} src={filter} alt={".."}/>
                            </S.Filters>
                            <DropDownMenu
                                renderElementRef={ref}
                                menuElements={options()}
                                right={true}
                                selected={options()[sortType-1].title}
                            />
                        </>
                    }
                </FlexRow>
            </S.Title>
            <ReviewList comments={reviews} deleteComment={deleteComment} handleEdit={handleEdit}/>
            <NewReview uploadComment={handleUploadComment} currentComment={comment}/>
        </S.Area>
    );
};