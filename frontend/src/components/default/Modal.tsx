import React from 'react';
import {Styled as S} from "./Modal.styled";
import {Btn} from "./Btn";
import {Property} from "csstype";

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
                {onClose && <S.Cross onClick={onClose}>x</S.Cross>}
                <S.Buttons>
                    <Btn secondary onClick={onDecline}>DECLINE</Btn>
                    <Btn primary disabled={disableAccept} onClick={onAccept}>ACCEPT</Btn>
                </S.Buttons>
            </S.Modal>
        </S.ModalBackground>
    )
}