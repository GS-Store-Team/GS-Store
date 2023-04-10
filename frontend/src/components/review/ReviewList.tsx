import React, {FC, useCallback, useContext, useRef, useState} from 'react';
import man from './../../UI/img/reviewPic.png'
import star from './../../UI/img/star.png'
import menu from './../../UI/img/menu.png'
import {FlexRow} from "../default/Flex.styled";
import {useNavigate} from "react-router-dom";
import {Comment} from "../../types/Types";
import {Styled as S} from "./Review.styled";
import {dateFormat} from "../../utils/Utils";
import {AuthContext} from "../../App";
import {DropDownMenu, IDropDownMenuElement} from "../default/DropDownMenu";
import {Modal} from "../default/Modal";
import {Styled as M} from "./../default/Modal.styled";

interface IReview{
    comment: Comment;
    deleteComment: (comment: Comment) => void;
    handleEdit: (comment: Comment) => void;
}

function calculateOpacity(mark: number, total: number): number{
    return 0.1 + Math.pow(mark,2) / Math.pow(total,2);
}
export const Review : FC<IReview>= ({comment, deleteComment, handleEdit}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const ref = useRef(null)
    const [modal, setModal] = useState<boolean>(false)

    const navigateProfile = useCallback( () =>{
        navigate('/user/' + comment.reviewer);
    },[navigate])

    const options = useCallback(() => {
        const arr : IDropDownMenuElement[] = []

        arr.push({title: "Delete", action: () => setModal(true)})
        arr.push({title: "Edit", action: () => handleEdit(comment)})

        return arr
    }, [comment])

    const modalJSX = useCallback(() => {
        const handleAccept = () => {
            deleteComment(comment)
            setModal(false)
        }

        return (
            <Modal onAccept={handleAccept}
                   onDecline={() => setModal(false)}
                   onClose={() => setModal(false)}
                   $height={"450"}
            >
                <M.Title>CONFIRM ACTION</M.Title>
                <M.Body>
                    <M.Text>Are you sure you want to delete the comment?</M.Text>
                    <M.ScrollSection $height={"150"}>
                        <div style={{position: "absolute", backgroundColor:"transparent", height:"150px", width:"505px", zIndex:1, cursor:"not-allowed"}}></div>
                        <Review comment={comment} deleteComment={() =>{}} handleEdit={handleEdit}/>
                    </M.ScrollSection>
                </M.Body>
            </Modal>
        )
    },[comment, handleEdit, setModal])

    return (
        <>
            <S.Review>
                <FlexRow  gap={"0"}>
                    <S.Avatar onClick={navigateProfile}><img style={{width:"24px", height: "24px"}} src={man} alt={".."}/></S.Avatar>
                    <FlexRow justifyContent={"space-between"} gap={"0"} style={{width : "100%"}}>
                        <S.Nickname onClick={navigateProfile}>{comment.nickName}</S.Nickname>
                        <S.Rate>{comment.mark}<span style={{fontSize: "10px", fontWeight: "normal"}}>/5</span></S.Rate>
                    </FlexRow>
                    <img style={{width: "15px", height: "15px", transform: "translateY(4px)", opacity: calculateOpacity(comment.mark, 5)}}
                         src={star}
                         alt={".."}/>
                    { user.id === comment.reviewer &&
                        <>
                            <S.Menu><img ref={ref} src={menu} alt={".."}/></S.Menu>
                            <DropDownMenu renderElementRef={ref} menuElements={options()} right={true}></DropDownMenu>
                        </>
                    }
                </FlexRow>
                <S.Body>
                    {comment.text}
                    <S.Date>
                        {dateFormat(comment.creationTime)}
                        {comment.lastChange && <S.Edited>(edited)</S.Edited>}
                    </S.Date>
                </S.Body>
            </S.Review>
            {modal && modalJSX()}
        </>
    );
};

interface IReviewList{
    comments: Comment[];
    deleteComment: (comment: Comment) => void;
    handleEdit: (comment: Comment) => void;
}
export const ReviewList : FC<IReviewList>= ({comments, deleteComment, handleEdit}) => {
    return (
        comments.length === 0?
          <S.NoComments>No reviews yet</S.NoComments>
        : <S.Reviews>{comments.map((c) =>
                <Review comment={c}
                        key={c.id}
                        deleteComment={deleteComment}
                        handleEdit={handleEdit}
                />
            )}</S.Reviews>
    );
};