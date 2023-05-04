import {CSSProperties, FC, useMemo} from "react";
import React from "react";
import {Placement, Tooltip} from "./Tooltip";
import {Styled as S} from "./DropDownMenu.styled"
import man from "../../UI/img/man.png";
import exit from "../../UI/img/exit.png";
import bug from "../../UI/img/bug.png";
import cross from "../../UI/img/cross.png";
import filter from "../../UI/img/filter.png";
import line from "../../UI/img/line.png";
import logo from "../../UI/img/logo.png";
import menu from "../../UI/img/menu.png";
import plus from "../../UI/img/plus.png";
import reviewPic from "../../UI/img/reviewPic.png";
import settings from "../../UI/img/settings.png";
import shovel from "../../UI/img/shovel.png";
import star from "../../UI/img/star.png";
import trashBin from "../../UI/img/trash-bin.png";
import fullScreen from "../../UI/img/full-screen.png"
import arrow from "../../UI/img/arrow.png"
import resetFilter from "../../UI/img/reset-filter.png"
import notAuth from "../../UI/img/no-auth.png"
import auth from "../../UI/img/auth.png"
import blocked from "../../UI/img/blocked.png"
import moderation from "../../UI/img/moderation.png"
import ok from "../../UI/img/ok.png"

export type IconType =
    "man" | "exit" | "bug" | "cross" | "filter" | "line" | "logo" |
    "menu" | "plus" | "reviewPic" | "settings" | "shovel" | "star" |
    "trash-bin" | "full-screen" | "arrow" | "reset-filter" | "not-auth" |
    "auth" | "blocked" | "moderation" | "ok"


function getPng(title : IconType){
    switch (title){
        case "man": return man
        case "exit": return exit
        case "bug": return bug
        case "cross": return cross
        case "filter": return filter
        case "line": return line
        case "logo": return logo
        case "menu": return menu
        case "plus": return plus
        case "reviewPic": return reviewPic
        case "settings": return settings
        case "shovel": return shovel
        case "star": return star
        case "trash-bin": return trashBin
        case "full-screen": return fullScreen
        case "arrow": return arrow
        case "reset-filter": return resetFilter
        case "auth": return auth
        case "not-auth": return notAuth
        case "blocked": return blocked
        case "moderation": return moderation
        case "ok": return ok
    }
}

interface IIconTooltip{
    label: string
    placement?: Placement
    offset?: number
    disable?: boolean
}

interface IIcon{
    img: IconType
    tooltip?: IIconTooltip
    style?: CSSProperties
    onClick?: () => void
    nonClickable?: boolean
    size?: number
}

export const Icon : FC<IIcon> = ({img, tooltip, style, onClick, nonClickable=false, size = 22}) => {
    const icon = useMemo(() => {
        return(
            <S.Icon style={{width: `${size}px`, height: `${size}px`, cursor: `${!nonClickable ? "pointer" : "auto"}`, ...style}} onClick={onClick}>
                <img style={{width: "100%", height: "100%"}} draggable={false} src={getPng(img)} alt={":("}/>
            </S.Icon>
        )
    }, [img, style, onClick])

    return(
        tooltip?
            <Tooltip label={tooltip.label} disable={tooltip.disable} offset={tooltip.offset} placement={tooltip.placement}>
                {icon}
            </Tooltip>
            : icon
    )
}