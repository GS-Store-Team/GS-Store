import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {Btn} from "../../default/Btn";
import {Styled as S} from "./UploadImages.styled"
import {Icon} from "../../default/Icon";
import {FlexRow} from "../../default/Flex.styled";
import {useOutsideClick} from "../../../hooks/Hooks";
import {InfoModal} from "../../modalWindow/InfoModal";
import {ImageWrapper} from "../../../Types";

interface IUploadImages{
    images: ImageWrapper[]
    setImages: Dispatch<SetStateAction<ImageWrapper[]>>
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
        const file = e.currentTarget.files[0]
        setImages(prevState => [...prevState, {file, title: file.name, description:""}])

    }, [setImages, imageCount, images])

    const handleRemoveImage = useCallback((wrapper: ImageWrapper) => {
        setImages(prevState => prevState.filter(wr => wr.file !== wrapper.file))
    }, [])

    return(
        <S.Area>
            <input type="file" id="imageUploadHiddenInput" style={{display:"none"}} accept="image/*" onChange={handleUpload}/>
            {images.length < imageCount && <Btn theme={"orange"} onClick={handleClick}><FlexRow style={{alignItems: "center"}} justifyContent={"center"} gap={"5px"}><Icon size={17} img={"clip"} nonClickable/>Attach image</FlexRow></Btn>}
            {images.filter(f => !!f).map((wrapper, index) => <Image key={index} wrapper={wrapper} onRemove={handleRemoveImage} />)}
            {images.length < imageCount && <S.Empty></S.Empty>}
        </S.Area>
    )
}

interface IImage{
    wrapper: ImageWrapper
    onRemove: (file:ImageWrapper) => void
}
const Image : FC<IImage> = ({wrapper, onRemove}) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [value, setValue] = useState<string>(wrapper.title)
    const [viewImage, setViewImage] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement>(null)
    const [fileDataURL, setFileDataURL] = useState<string>()

    const closeEdit = useCallback(() => {
        setEdit(false)
        wrapper.title = value
    }, [setEdit, value, wrapper])
    const handleClick = useCallback(() => setViewImage(true), [])
    const handleClose = useCallback(() => setViewImage(false), [])
    const handleKeys = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {if(e.code === "Enter") closeEdit()}, [closeEdit])

    useOutsideClick(ref, closeEdit, edit)

    useEffect(() => {
        if(!viewImage) return

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            if (e.target && e.target.result) setFileDataURL(e.target.result as string)
        }
        fileReader.readAsDataURL(wrapper.file);
        return () => fileReader.abort();
    }, [viewImage])

    return(
        <>
            <S.Image>
                {!edit &&
                    <FlexRow gap={"10px"} style={{alignItems: "center"}}>
                        <S.Title onClick={handleClick}>{wrapper.title}</S.Title>
                        <Icon size={17} img={"pencil"} onClick={() => setEdit(true)}/>
                        <span style={{opacity: .8}}>{Math.round(wrapper.file.size / 1000)} KB</span>
                    </FlexRow>
                }
                {edit && <input ref={ref} autoFocus maxLength={20} type="text" value={value} onKeyDown={handleKeys} onChange={e => setValue(e.currentTarget.value)}/>}
                <Icon img={"cross"} onClick={() => onRemove(wrapper)}/>
            </S.Image>
            {viewImage &&
                <InfoModal title={wrapper.title} onOk={handleClose} $height={"600px"} $width={"800px"}>
                    <img style={{height:"400px", aspectRatio:"auto"}} src={fileDataURL} alt={".."}/>
                </InfoModal>
            }
        </>
    )
}