import React, {CSSProperties, FC, Ref, useCallback, useEffect, useRef, useState} from "react";
import {Styled as S} from "./DropDownMenu.styled";
import {useOutsideClick} from "../../hooks/Hooks";
import {Property} from "csstype";

export interface IDropDownMenuElement{
    title: string;
    action: ()=>void;
}

interface IDropDownMenu{
    renderElementRef : React.RefObject<any>;
    menuElements: IDropDownMenuElement[];
    right?: boolean;
}

export const DropDownMenu : FC<IDropDownMenu> = ({renderElementRef, menuElements, right = false}) => {
    const [opened, setOpened] = useState<boolean>(false)
    const ref = useRef(null)
    const [coords, setCoords] = useState({top:0, left:0, right:0})
    const handleClose = useCallback(() => {setOpened(false)}, [])
    useOutsideClick(ref, handleClose, opened)
    const clickHandler = useCallback(() => {setOpened(prevState => (!prevState))}, [])

    const processCoords = useCallback((mouseEvent : MouseEvent) => {
        const boundary = (mouseEvent.target as HTMLElement).getBoundingClientRect();
        setCoords({top: boundary.bottom, left: boundary.left, right: document.body.clientWidth - boundary.right})
    }, [setCoords])

    const onRefElementClick = useCallback((e : MouseEvent) => {
        if(e.target === renderElementRef.current) {
            clickHandler()
            processCoords(e)
        }
    },[processCoords, clickHandler])

    useEffect(() => {
        if(!renderElementRef || !renderElementRef.current) return

        document.addEventListener("mousedown", onRefElementClick)
        window.addEventListener("resize", handleClose);

        return () => {
            document.removeEventListener("mousedown", onRefElementClick)
            document.removeEventListener("resize", handleClose)
        }
    }, [renderElementRef])

    const handleClick = useCallback((func : ()=>void) => {
        handleClose()
        func()
    }, [handleClose])

    return(
        opened ?
            <S.Menu ref={ref} $top={coords.top as Property.Top} $left={!right ? `${coords.left}px` as Property.Left: "unset"} $right={right ? `${coords.right}px` as Property.Right: "unset"}>
                {menuElements.map((e, index) => <S.Elem key={index} onClick={() => handleClick(e.action)}>{e.title}</S.Elem>)}
            </S.Menu> : <></>
    );
}