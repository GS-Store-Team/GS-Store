import React from 'react';
import {Styled as S} from "./Modal.styled";
import {Btn} from "./Btn";
import {Property} from "csstype";
import cross from "../../UI/img/cross.png"

interface IModal{
    onAccept: () => void;
    onDecline: () => void;
    onClose?: () => void;
    disableAccept?: boolean;
    children?: React.ReactNode
    $width?: Property.Width;
    $height?: Property.Height;
}

export const Modal : React.FC<IModal> = ({onAccept, onClose, onDecline, children, $width, $height, disableAccept= false}) => {
    return (
        <S.ModalBackground>
            <S.Modal $height={$height} $width={$width}>
                {children}
                {onClose && <S.Cross onClick={onClose}><img style={{width: "15px", height: "15px", margin: "auto"}} src={cross} alt={".."}/></S.Cross>}
                <S.Buttons>
                    <Btn secondary onClick={onDecline} style={{width: "90px"}}>DECLINE</Btn>
                    <Btn primary disabled={disableAccept} style={{width: "90px"}} onClick={onAccept}>ACCEPT</Btn>
                </S.Buttons>
            </S.Modal>
        </S.ModalBackground>
    )
}