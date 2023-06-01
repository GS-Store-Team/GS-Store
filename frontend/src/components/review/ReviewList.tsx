import React, {FC, useCallback, useContext, useRef, useState} from 'react';
import {FlexRow} from "../default/Flex.styled";
import {useNavigate} from "react-router-dom";
import {Comment} from "../../Types";
import {Styled as S} from "./Review.styled";
import {dateFormat} from "../../utils/Utils";
import {AuthContext} from "../../App";
import {DropDownMenu, IDropDownMenuElement} from "../default/DropDownMenu";
import {Modal} from "../default/Modal";
import {Styled as M} from "./../default/Modal.styled";
import {Tooltip} from "../default/Tooltip";
import {Icon} from "../default/Icon";

interface IReview{
    comment: Comment;
    deleteComment: (comment: Comment) => void;
    handleEdit: (comment: Comment) => void;
    developerId: number
}

function calculateOpacity(mark: number, total: number): number{
    return 0.1 + Math.pow(mark,2) / Math.pow(total,2);
}
export const Review : FC<IReview>= ({comment, deleteComment, handleEdit, developerId}) => {
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
                   $height={"450px"}
            >
                <M.Title>CONFIRM ACTION</M.Title>
                <M.Body>
                    <M.Text>Are you sure you want to delete the comment?</M.Text>
                    <M.ScrollSection $height={"150"}>
                        <div style={{position: "absolute", backgroundColor:"transparent", height:"150px", width:"505px", zIndex:1, cursor:"not-allowed"}}></div>
                        <Review comment={comment} deleteComment={() =>{}} handleEdit={handleEdit} developerId={developerId}/>
                    </M.ScrollSection>
                </M.Body>
            </Modal>
        )
    },[comment, handleEdit, setModal])

    return (
        <>
            <S.Review>
                <FlexRow  gap={"0"}>
                    <S.Avatar onClick={navigateProfile}>
                        <Icon img={developerId === comment.reviewer? "author": "reviewPic"} style={{width:"24px", height: "24px"}}/>
                    </S.Avatar>
                    <FlexRow justifyContent={"space-between"} gap={"0"} style={{width : "100%"}}>
                        <Tooltip label={"View user"}>
                            <S.Nickname onClick={navigateProfile}>
                                {comment.nickName}
                            </S.Nickname>
                        </Tooltip>
                        <S.Rate>{comment.mark}<span style={{fontSize: "10px", fontWeight: "normal"}}>/5</span></S.Rate>
                    </FlexRow>
                    <Icon img={"star"} style={{width: "17px", height: "15px", transform: "translateY(4px)", opacity: calculateOpacity(comment.mark, 5)}} nonClickable></Icon>
                    { user.userId === comment.reviewer &&
                        <>
                            <Tooltip label={"Menu"} placement={"top"}>
                                <S.Menu>
                                    <span ref={ref}>
                                        <Icon img={"menu"} style={{padding: 0}}/>
                                    </span>
                                </S.Menu>
                            </Tooltip>
                            <DropDownMenu renderElementRef={ref} menuElements={options()} right={true}></DropDownMenu>
                        </>
                    }
                </FlexRow>
                <S.Body>
                    {comment.text}
                    <S.Date>
                        {dateFormat(comment.creationTime)}
                        {
                            comment.lastChange &&
                            <Tooltip label={`Last change was at ${dateFormat(comment.lastChange)}`}>
                                <S.Edited>(edited)</S.Edited>
                            </Tooltip>
                        }
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
    developerId: number
}
export const ReviewList : FC<IReviewList>= ({comments, deleteComment, handleEdit, developerId}) => {
    return (
        comments.length === 0?
          <S.NoComments>No reviews yet</S.NoComments>
        : <S.Reviews>{comments.map((c) =>
                <Review comment={c}
                        key={c.id}
                        deleteComment={deleteComment}
                        handleEdit={handleEdit}
                        developerId={developerId}
                />
            )}</S.Reviews>
    );
};