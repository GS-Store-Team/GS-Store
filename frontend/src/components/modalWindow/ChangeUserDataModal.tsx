import React, {CSSProperties, useCallback, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import Api from "../../API/Api";
import {UserData} from "../../Types";
import {Input, TextArea} from "../default/Form";
import * as Utils from "../../utils/Utils";

interface IChangeUserDataModal {
    userData: UserData;
    onChangeUserData: (updatedUserData : UserData) => void;
    opened: boolean;
    setOpened: (state : boolean) => void;
}

export const ChangeUserDataModal : React.FC<IChangeUserDataModal> = ({userData, onChangeUserData, opened, setOpened}) => {

    const [data, setData] = useState<UserData>(userData)
    const [textAreaCSS,] = useState<CSSProperties>(() => {return {height: "130px", resize: "none"}})

    const nickNameInvalid = data.nickName.length < 4 || data.nickName.length > 64

    const phoneNumberInvalid = data.phoneNumber.length > 20

    const emailInvalid = data.email.length > 256 || !Utils.validateEmail(data.email)

    const descriptionInvalid = data.description.length > 2048

    const handleCloseModal = useCallback(() => {
        setOpened(false)
    }, [setOpened])

    const handleAcceptModal = useCallback(() =>{
        Api.changeUserData(data)
            .then((response) => {
                onChangeUserData(response.data as UserData)
            })
        setOpened(false);
    }, [userData, setOpened, onChangeUserData, data])

    return (
        <Modal
            $height={"900px"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}
            disableAccept={nickNameInvalid || phoneNumberInvalid || emailInvalid || descriptionInvalid}
        >
            <S.Title>CHANGE PROFILE</S.Title>
            <S.Body>
                <S.Row>Nick:</S.Row>
                <Input type={"text"} invalid={nickNameInvalid} value={data.nickName} onChange={(e) => {setData({... data, nickName: e.target.value})}}/>
                <S.Row>Email:</S.Row>
                <Input type={"text"} invalid={emailInvalid} value={data.email} onChange={(e) => {setData({... data, email: e.target.value})}}/>
                <S.Row>Telephone:</S.Row>
                <Input type={"text"} invalid={phoneNumberInvalid} value={data.phoneNumber} onChange={(e) => {setData({... data, phoneNumber: e.target.value})}}/>
                <S.Row>Description:</S.Row>
                <TextArea style={textAreaCSS} invalid={descriptionInvalid} type={"text"} value={data.description} onChange={(e) => {setData({... data, description: e.target.value})}}/>
            </S.Body>
        </Modal>
    )
}