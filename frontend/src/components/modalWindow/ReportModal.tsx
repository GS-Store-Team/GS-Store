import React, {CSSProperties, useCallback, useEffect, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import Api from "../../API/Api";
import {UserData} from "../../types/Types";
import {Input, TextArea} from "../default/Form";
import classes from "./modalwindow.module.css";
import * as Utils from "../../utils/Utils";

interface IFieldStyle {
    header: CSSProperties,
    description: CSSProperties,
}

interface IChangeUserDataModal {
    opened: boolean;
    setOpened: (state : boolean) => void;
}

export const ReportModal : React.FC<IChangeUserDataModal> = ({opened, setOpened}) => {
    const [textAreaCSS,] = useState<CSSProperties>(() => {return {height: "130px", resize: "none"}})
    const [reportData, setReportData] = useState({
        name: "",
        description: "",
    });

    const [fieldStyle, setFieldStyle] = useState<IFieldStyle>(() => {
        return {
            header: {},
            description: textAreaCSS,
        }
    })

    const handleCloseModal = useCallback(() => {
        setOpened(false)
    }, [setOpened])

    const handleAcceptModal = useCallback(() =>{
        setOpened(false);
    }, [])

    return (
        <Modal
            $height={"700px"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}
        >
            <S.Title>BUG REPORT</S.Title>
            <S.Body>
                <div style={{marginTop: 0}} className={classes.my__label}>Problem:</div>
                <Input style={fieldStyle.header} type={"text"} value={reportData.name} onChange={(e) => {setReportData({... reportData, name: e.target.value})}}/>
                <div className={classes.my__label}>Description:</div>
                <TextArea style={fieldStyle.description} type={"text"} value={reportData.description} onChange={(e) => {setReportData({... reportData, description: e.target.value})}}/>
            </S.Body>
        </Modal>
    )
}