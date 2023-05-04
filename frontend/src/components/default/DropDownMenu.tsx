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
    selected?:string;
    right?: boolean;
}

export const DropDownMenu : FC<IDropDownMenu> = ({renderElementRef, menuElements, selected, right = false}) => {
    const [opened, setOpened] = useState<boolean>(false)
    const ref = useRef(null)
    const [coords, setCoords] = useState({top:0, left:0, right:0})
    const handleClose = useCallback(() => {setOpened(false)}, [])
    useOutsideClick(ref, handleClose, opened)
    const clickHandler = useCallback(() => {setOpened(prevState => (!prevState))}, [])

    const processCoords = useCallback((element : HTMLElement) => {
        const boundary = element.getBoundingClientRect();
        setCoords({top: boundary.bottom, left: boundary.left, right: document.body.clientWidth - boundary.right})
    }, [setCoords])

    const onRefElementClick = useCallback((e : MouseEvent) => {
        if(!renderElementRef.current) return
        if(renderElementRef.current.contains(e.target)) {
            clickHandler()

            const target : HTMLElement = renderElementRef.current as HTMLElement
            let scopeElem : HTMLElement | null = e.target as HTMLElement

            while(scopeElem !== target && scopeElem) scopeElem = scopeElem.parentElement

            if(scopeElem) processCoords(scopeElem as HTMLElement)
        }
    },[processCoords, clickHandler, renderElementRef])

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
                {menuElements.map((e, index) =>
                    selected && selected === e.title ?
                        <S.Selected key={index} onClick={() => handleClick(e.action)}>{e.title}</S.Selected >
                        :<S.Elem key={index} onClick={() => handleClick(e.action)}>{e.title}</S.Elem>)}
            </S.Menu> : <></>
    );
}