import React, {FC, PropsWithChildren, useRef} from "react";
import {Styled as S} from "../default/Modal.styled"
import {Btn} from "../default/Btn";
import {Property} from "csstype";
import {Icon} from "../default/Icon";
import {useOutsideClick} from "../../hooks/Hooks";

interface IInfoModal{
    title:string
    message?:string
    onOk:()=>void
    $width?: Property.Width;
    $height?: Property.Height;
}
export const InfoModal : FC<PropsWithChildren<IInfoModal>> = ({children, title, message, onOk, $width, $height}) =>{
    const ref = useRef<HTMLDivElement>(null)

    useOutsideClick(ref, onOk)

    return(
        <S.ModalBackground>
            <S.Modal ref={ref} $height={$height} $width={$width}>
                <S.Cross onClick={onOk}><Icon size={15} img={"cross"} /></S.Cross>
                <S.Title>{title}</S.Title>
                <S.Body>
                    {message && <S.Text>{message}</S.Text>}
                    {children}
                </S.Body>
                <S.Buttons>
                    <Btn style={{width: "90px"}} onClick={onOk} primary>OK</Btn>
                </S.Buttons>
            </S.Modal>
        </S.ModalBackground>
    )
}