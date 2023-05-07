import React, {Dispatch, FC, SetStateAction, useCallback, useRef, useState} from "react";
import {Btn} from "../default/Btn";
import {Styled as S} from "./UploadImages.styled"
import {Icon} from "../default/Icon";
import {FlexRow} from "../default/Flex.styled";
import {useOutsideClick} from "../../hooks/Hooks";

interface IUploadImages{
    images: File[]
    setImages: Dispatch<SetStateAction<File[]>>
    imageCount?: number
}

export const UploadImages : FC<IUploadImages> = ({images, setImages, imageCount = 4}) => {

    const handleClick = useCallback(() => {
        const inputElem = document.getElementById("imageUploadHiddenInput")
        if(!inputElem) return
        inputElem.click()
    },[])

    const handleUpload = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return;
        const files = e.currentTarget.files
        setImages(prevState => [...prevState, files[0]])

    }, [setImages, imageCount, images])

    const handleRemoveImage = useCallback((file: File) => {
        setImages(prevState => prevState.filter(f => f !== file))
    }, [])

    return(
        <S.Area>
            <input type="file" id="imageUploadHiddenInput" style={{display:"none"}} onChange={handleUpload}/>
            <Btn theme={"orange"} onClick={handleClick} disabled={images.length >= imageCount}><FlexRow style={{alignItems: "center"}} justifyContent={"center"} gap={"5px"}><Icon size={17} img={"clip"} nonClickable/>Attach image</FlexRow></Btn>
            {images.filter(f => !!f).map(img => <Image file={img} onRemove={handleRemoveImage}></Image>)}
            {images.length < imageCount && <S.Empty></S.Empty>}
        </S.Area>
    )
}

interface IImage{
    file: File
    onRemove: (file:File) => void
}
const Image : FC<IImage> = ({file, onRemove}) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [value, setValue] = useState<string>(file.name)
    const ref = useRef<HTMLInputElement>(null)

    const closeEdit = useCallback(() => setEdit(false), [setEdit])

    useOutsideClick(ref, closeEdit, edit)

    return(
        <S.Image>
            {!edit &&
                <FlexRow gap={"10px"} style={{alignItems: "center"}}>
                    <S.Title>{file.name}</S.Title>
                    <Icon size={18} img={"pencil"} onClick={() => setEdit(true)}/>
                    <span style={{opacity: .8}}>{Math.round(file.size / 1000)} KB</span>
                </FlexRow>
            }
            {edit && <input ref={ref} maxLength={20} type="text" value={value} onChange={e => setValue(e.currentTarget.value)}/>}
            <Icon img={"cross"} onClick={() => onRemove(file)}/>
        </S.Image>
    )
}