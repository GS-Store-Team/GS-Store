import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import Api from "../../API/Api";
import {ImgComponent} from "../default/ImgComponent";
import {Styled as S} from "./ImgBlock.styled"
import {Icon} from "../default/Icon";
import {FlexRow} from "../default/Flex.styled";

interface IImgBlock{
    pluginId: number
}

export const ImgBlock : FC<IImgBlock> = ({pluginId}) => {

    const [images, setImages] = useState<JSX.Element[]>([])

    const ref = useRef(null)

    useEffect(() => {
        if(!pluginId) return
        Api.imageListByPluginId(pluginId).then((response) =>{
            if(response.status === 200)
                setImages(response.data.map((e: any, index: number) => {return <ImgComponent func={Api.getImageById(e as number)}/>}));
        })
    }, [pluginId])

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
                        <S.Arrow><Icon img={"arrow"} onClick={handleLeftClick}/></S.Arrow>
                        <S.Arrow><Icon img={"arrow"} onClick={handleRightClick} style={{transform: "rotate(180deg)"}}/></S.Arrow>
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