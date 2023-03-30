import React, {CSSProperties, useCallback, useEffect, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import Api from "../../API/Api";
import {UserData} from "../../types/Types";
import {Input, TextArea} from "../default/Form";
import classes from "./modalwindow.module.css";
import * as Utils from "../../utils/Utils";

interface IFieldStyle {
    nickName: CSSProperties,
    email: CSSProperties,
    phoneNumber: CSSProperties,
    description: CSSProperties,
}

interface IChangeUserDataModal {
    userData: UserData;
    onChangeUserData: (updatedUserData : UserData) => void;
    opened: boolean;
    setOpened: (state : boolean) => void;
}

export const ChangeUserDataModal : React.FC<IChangeUserDataModal> = ({userData, onChangeUserData, opened, setOpened}) => {

    const [data, setData] = useState<UserData>(userData)
    const [wrongForm, setWrongForm] = useState<boolean>(false)
    const [badInputCSS,] = useState<CSSProperties>(() => {return {borderColor: "red", backgroundColor: "rgba(255, 0, 0, 0.1)"}})
    const [textAreaCSS,] = useState<CSSProperties>(() => {return {height: "130px", resize: "none"}})

    const [fieldStyle, setFieldStyle] = useState<IFieldStyle>(() => {
        console.log("STATE")
        return {
            nickName: {},
            email: {},
            phoneNumber: {},
            description: textAreaCSS,
        }
    })

    useEffect(() => {
        if (data.nickName.length < 4 || data.nickName.length > 64) {
            setWrongForm(true)
            setFieldStyle(prevState => ({...prevState, nickName: badInputCSS}))
        }
        else {
            setWrongForm(false)
            setFieldStyle(prevState => ({...prevState, nickName: {}}));
        }
    }, [data.nickName])

    useEffect(() => {
        if(data.description.length > 2048) {
            setWrongForm(true)
            setFieldStyle(prevState => ({...prevState, description: {...badInputCSS, ...textAreaCSS}}))
        }
        else {
            setWrongForm(false)
            setFieldStyle(prevState => ({...prevState, description: textAreaCSS}))
        }
    }, [data.description])

    useEffect(() => {
        if(data.phoneNumber.length > 20) {
            setWrongForm(true)
            setFieldStyle(prevState => ({...prevState, phoneNumber: badInputCSS}))
        }
        else {
            setWrongForm(false)
            setFieldStyle(prevState => ({...prevState, phoneNumber: {}}))
        }
    }, [data.phoneNumber])

    useEffect(() => {
        if(data.email.length > 256 || !Utils.validateEmail(data.email)) {
            setWrongForm(true)
            setFieldStyle(prevState => ({...prevState, email: badInputCSS}))
        }
        else {
            setWrongForm(false)
            setFieldStyle(prevState => ({...prevState, email: {}}))
        }
    }, [data.email])

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
            $height={"700"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}
            disableAccept={wrongForm}
        >
            <S.Title>CHANGE PROFILE</S.Title>
            <S.Body>
                <div className={classes.my__label}>Nick:</div>
                <Input style={fieldStyle.nickName} type={"text"} value={data.nickName} onChange={(e) => {setData({... data, nickName: e.target.value})}}/>
                <div className={classes.my__label}>Email:</div>
                <Input style={fieldStyle.email} type={"text"} value={data.email} onChange={(e) => {setData({... data, email: e.target.value})}}/>
                <div className={classes.my__label}>Telephone:</div>
                <Input style={fieldStyle.phoneNumber} type={"text"} value={data.phoneNumber} onChange={(e) => {setData({... data, phoneNumber: e.target.value})}}/>
                <div className={classes.my__label}>Description:</div>
                <TextArea style={fieldStyle.description} type={"text"} value={data.description} onChange={(e) => {setData({... data, description: e.target.value})}}/>
            </S.Body>
        </Modal>
    )
}