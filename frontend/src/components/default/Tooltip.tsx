import React, {FC, useCallback, useMemo, useRef, useState} from "react";
import {Styled as S} from "./Tooltip.styled";

export type Placement = "left" | "right" | "top" | "bottom"

interface IToolTip{
    label: string;
    children: JSX.Element | string;
    placement?: Placement;
    offset?: number;
    disable?: boolean;
}

function getTopMiddle(element: HTMLElement) : number{
    const bounds = element.getBoundingClientRect()
    return bounds.top + bounds.height / 2
}

function getBottomMiddle(element: HTMLElement) : number{
    const bounds = element.getBoundingClientRect()
    return window.innerHeight - getTopMiddle(element)
}

function getLeftMiddle(element: HTMLElement) : number{
    const bounds = element.getBoundingClientRect()
    return bounds.left + bounds.width / 2
}

function getRightMiddle(element: HTMLElement) : number{
    const bounds = element.getBoundingClientRect()
    // 15px due to permanent scrollbar
    return window.innerWidth - 15 - getLeftMiddle(element)
}

function getHalfWidth(element: HTMLElement) : number{
    const bounds = element.getBoundingClientRect()
    return bounds.width / 2
}

function getHalfHeight(element: HTMLElement) : number{
    const bounds = element.getBoundingClientRect()
    return bounds.height / 2
}

export const Tooltip : FC<IToolTip> = ({children, label, placement = "bottom", offset = 3, disable=false}) => {
    const ref = useRef(null)
    const [opened, setOpened] = useState<boolean>(false)

    const tooltip = useCallback(() => {
        if(! ref.current) return
        if(placement === "bottom") return <S.Tooltip $top={getTopMiddle(ref.current) + getHalfHeight(ref.current) + offset} $left={getLeftMiddle(ref.current)} $transform={"translateX(-50%)"}>{label}</S.Tooltip>
        if(placement === "top") return <S.Tooltip $bottom={getBottomMiddle(ref.current) + getHalfHeight(ref.current) + offset} $left={getLeftMiddle(ref.current)} $transform={"translateX(-50%)"}>{label}</S.Tooltip>
        if(placement === "left") return <S.Tooltip $top={getTopMiddle(ref.current)} $right={getRightMiddle(ref.current) + getHalfWidth(ref.current) + offset} $transform={"translateY(-50%)"}>{label}</S.Tooltip>
        if(placement === "right") return <S.Tooltip $top={getTopMiddle(ref.current)} $left={getLeftMiddle(ref.current) + getHalfWidth(ref.current) + offset} $transform={"translateY(-50%)"}>{label}</S.Tooltip>
    }, [placement, ref, label])

    return(
        disable?
            <>children</>
            : <>
                <span ref={ref}
                      onMouseEnter={() => setOpened(true)}
                      onMouseLeave={() => setOpened(false)}
                >
                    {children}
                </span>
                {opened && tooltip()}
            </>
    )
}