import React, {FC, Ref, useCallback, useEffect, useRef, useState} from 'react';
import {ReviewList} from "./ReviewList";
import Api from "../../API/Api";
import {NewReview} from "./NewReview";
import {Comment} from "../../Types";
import {Styled as S} from "./Review.styled"
import {Styled as S1} from "./../default/Modal.styled"
import {FlexRow} from "../default/Flex.styled";
import {DropDownMenu, IDropDownMenuElement} from "../default/DropDownMenu";
import {Tooltip} from "../default/Tooltip";
import {Icon} from "../default/Icon";
import {useOutsideClick} from "../../hooks/Hooks";

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
    const [wideView, setWideView] = useState<boolean>(false)
    const handleCloseWideView = useCallback(() => setWideView(false), [setWideView])

    useEffect(() => {
        Api.getReviews(pluginId, 1, 100, sortType).then((response) => {
            setCurrentPage(response.data)
            setReviews(response.data.content)
        })
    }, [fetch, sortType])

    const handleUploadComment = useCallback((comment : Partial<Comment>) => {
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

    const handleOpenWideView = useCallback(() => setWideView(true), [setWideView])



    const area =
        <S.Area $height={wideView ? "100vh" : "calc(100vh - 170px)"}>
            <S.Title>
                <FlexRow justifyContent={"space-between"} style={{alignItems: "flex-start"}}>
                    Reviews
                    <FlexRow justifyContent={"left"} style={{gap: 0}}>
                        {!wideView &&
                            <Tooltip label={"View in full screen"} placement={"top"}>
                                <S.Tab>
                                    <Icon img={"full-screen"} style={{width:"18px", height:"18px", margin: "auto", transform:"translateY(1px)"}} onClick={handleOpenWideView}/>
                                </S.Tab>
                            </Tooltip>
                        }
                        {reviews.length > 1 &&
                            <>
                                <Tooltip label={"Filter"} placement={"top"}>
                                    <S.Tab ref={ref}>
                                        <Icon img={"filter"} style={{margin: "auto"}}/>
                                    </S.Tab>
                                </Tooltip>
                                <DropDownMenu
                                    renderElementRef={ref}
                                    menuElements={options()}
                                    right={true}
                                    selected={options()[sortType-1].title}
                                />
                            </>
                        }
                    </FlexRow>
                </FlexRow>
            </S.Title>
            <ReviewList comments={reviews} deleteComment={deleteComment} handleEdit={handleEdit}/>
            <FlexRow justifyContent={"flex-end"}>
                <NewReview uploadComment={handleUploadComment} currentComment={comment}/>
            </FlexRow>
        </S.Area>

    return (
        wideView ? <WideView child={area} onClose={handleCloseWideView}/> : area
    );
};

interface IWideView{
    child: JSX.Element
    onClose: () => void
}

const WideView :FC<IWideView> = ({child, onClose}) => {
    const ref = useRef(null)
    useOutsideClick(ref, onClose, true)
    return(
        <S1.Modal $height={"100%"} $width={"100%"}>
            <span ref={ref} style={{margin: "0 calc(100vw * 0.1)"}}>
                {child}
            </span>
        </S1.Modal>
    )
}