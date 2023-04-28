import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import Api from "../../API/Api";
import {ImgComponent} from "../default/ImgComponent";
import {Styled as S} from "./ImgBlock.styled"
import {Icon} from "../default/Icon";
import {FlexRow} from "../default/Flex.styled";
import {Tooltip} from "../default/Tooltip";
import {Plugin} from "../../Types";

interface IImgBlock{
    plugin: Plugin
}

export const ImgBlock : FC<IImgBlock> = ({plugin}) => {

    const [images, setImages] = useState<JSX.Element[]>([])

    const ref = useRef(null)

    useEffect(() => {
        console.log(plugin)
        if(!plugin.id) return

        setImages(plugin.images.map((img: { imageId : number }, index: number) => {return <ImgComponent key={index} func={Api.getImageById(img.imageId)}/>}));

    }, [plugin])

    const handleLeftClick = useCallback(() => {
        setImages([...images.slice(1), images[0]])
    }, [images, setImages])

    const handleRightClick = useCallback(() => {
        setImages([images[images.length-1], ...images.slice(0, images.length-1)])
    }, [images, setImages])

    return(
        <S.Block ref={ref}>
            <S.Main>
                {images.length === 0? <ImgComponent func={new Promise<any>(() =>{})}/> : images[0]}
            </S.Main>
            {images.length > 1 &&
                <>
                    <FlexRow justifyContent={"space-between"} style={{padding: "5px 0 "}}>
                        <Tooltip label={"Left"}>
                            <S.Arrow><Icon img={"arrow"} onClick={handleLeftClick}/></S.Arrow>
                        </Tooltip>
                        <Tooltip label={"Right"}>
                            <S.Arrow><Icon img={"arrow"} onClick={handleRightClick} style={{transform: "rotate(180deg)"}}/></S.Arrow>
                        </Tooltip>
                    </FlexRow>
                    <S.Others>
                    {images.slice(1).map((e, index) =>
                        <S.Supportive key={index}>{e}</S.Supportive>)}
                    </S.Others>
                </>
            }
        </S.Block>
    )
}