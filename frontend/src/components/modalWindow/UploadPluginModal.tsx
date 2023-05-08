import React, {useCallback, useEffect, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import {Input, TextArea} from "../default/Form";
import {Categories} from "../header/category/Categories";
import {FlexColumn, FlexRow} from "../default/Flex.styled";
import {defaultPlugin} from "../../DefaultObjects";
import {useOutsideClick} from "../../hooks/Hooks";
import {ImageWrapper, Plugin, Tag} from "../../Types";
import {SelectedTags, TagsCloud} from "../header/tags/TagsCloud";
import {Btn} from "../default/Btn";
import Api from "../../API/Api";
import {UploadImages} from "../image/uploadImage/UploadImages";

interface IUploadPluginModal {
    opened: boolean;
    setOpened: (state : boolean) => void;
}

const initialText = {
    name: "My plugin",
    shortDescription: "Provide a brief description that will be visible on initial viewing.",
    fullDescription: "In a full description, tell about the strengths of your software and describe the purpose."
}

function checkFile(fileName : string): boolean {
    const words = fileName.toLowerCase().split(".")
    return "dll" !== words[words.length - 1]
}

export const UploadPluginModal : React.FC<IUploadPluginModal> = ({setOpened}) => {
    const [plugin, setPlugin] = useState<Plugin>({...defaultPlugin, ...initialText});
    const [tagsCloud, setTagsCloud] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [file, setFile] = useState<File>()
    const [invalidFile, setInvalidFile] = useState<boolean>(true)
    const [images, setImages] = useState<ImageWrapper[]>([])

    const ref = React.createRef<HTMLDivElement>()
    const handleCloseTagsCloud = useCallback(() => setTagsCloud(false), [setTagsCloud])

    useOutsideClick(ref, handleCloseTagsCloud, tagsCloud)
    useEffect(() => {if(!file) setInvalidFile(true)},[file])

    const handleCloseModal = useCallback(() => setOpened(false), [setOpened])
    const handleAddTag = useCallback((tag : Tag) => setSelectedTags(prevState => [...prevState, tag]), [setSelectedTags])
    const handleRemoveTag = useCallback((tag: Tag) => setSelectedTags(prevState => [...prevState.filter(t => t.id !== tag.id)]), [setSelectedTags])

    const handleAcceptModal = useCallback(() =>{
        plugin.tags = selectedTags.map(t => ({tagId: t.id, pluginId:0 }))

        if(!file) return
        const formData = new FormData();
        formData.append("file", file)
        Api.validateFile(formData)
            .then(response => {
                if(!response.data.isPlugin){
                    setInvalidFile(true)
                }
                Api.sendNewPlugin(plugin)
                    .then(response => {
                        Api.uploadPluginFile(response.data, formData).then(() => setOpened(false))
                    })
            })
    }, [plugin, setOpened, selectedTags, file])

    const handleSetCategory = useCallback((categoryId: number) => setPlugin(prevState => ({...prevState, categories: [{categoryId, pluginId:0}]})), [])

    const nameInvalid = plugin.name.length < 4 || plugin.name.length > 64;
    const shortDescInvalid = plugin.shortDescription.length < 20 || plugin.shortDescription.length > 512;
    const fullDescInvalid = plugin.fullDescription.length < 20 || plugin.fullDescription.length > 8192;
    const priceInvalid = plugin.price > 10000;

    const handleSetPrice = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        let price = Number(e.currentTarget.value);
        if(!price) price = 0
        setPlugin(prevState => ({...prevState, price}))
    }, [setPlugin])

    const handleFileChange = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
        if (!file) return;
        setInvalidFile(checkFile(file.name))
        setFile(file)
    }, [])

    return (
        <Modal
            $height={"920px"}
            $width={"1200px"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}
            disableAccept={priceInvalid || fullDescInvalid || shortDescInvalid || nameInvalid || invalidFile}
        >
            <S.Title>UPLOAD NEW PLUGIN</S.Title>
            <S.Body>
                <FlexRow>
                    <FlexColumn style={{width: "50%", gap: "5px"}}>
                        <span>
                            <S.Text>Title:</S.Text>
                            <Input
                                invalid={nameInvalid}
                                value={plugin.name}
                                onChange={(e) => setPlugin({... plugin, name: e.target.value})}/>
                        </span>
                        <span>
                            <S.Row>Price:</S.Row>
                            <Input
                                invalid={priceInvalid}
                                value={plugin.price}
                                onChange={handleSetPrice}/>
                        </span>
                        <span>
                            <S.Text>Short description:</S.Text>
                            <TextArea
                                style={{height: "150px", resize: "none"}}
                                invalid={shortDescInvalid}
                                value={plugin.shortDescription}
                                onChange={(e) => setPlugin({... plugin, shortDescription: e.target.value})}/>
                        </span>
                        <span>
                            <S.Text>Full description:</S.Text>
                            <TextArea
                                style={{height: "240px", resize: "none"}}
                                invalid={fullDescInvalid}
                                value={plugin.fullDescription}
                                onChange={(e) => setPlugin({... plugin, fullDescription: e.target.value})}/>
                        </span>
                    </FlexColumn>
                    <FlexColumn style={{width: "50%", gap: "30px", padding: "20px 0 0 40px"}}>

                        <FlexColumn style={{gap:"3px"}}>
                            <FlexRow justifyContent={"space-between"}>
                                <span style={{fontSize: "18px"}}>Attach software</span>
                                <span>Appropriate format: dll</span>
                            </FlexRow>
                            <span style={invalidFile ? {border: "2px solid red", padding: "10px 20px", borderRadius: "5px"}:{border: "2px solid green", padding: "10px 20px", borderRadius: "5px"}}>
                                <Input type={"file"} invalid={invalidFile} id="pluginFile" onChange={handleFileChange}/>
                            </span>
                        </FlexColumn>

                        <FlexRow style={{alignItems:"center"}} gap={"40px"}>
                            Category:
                            <Categories setCategory={handleSetCategory} category={-1}/>
                        </FlexRow>

                        {tagsCloud && <TagsCloud ref={ref} selected={selectedTags} addTag={handleAddTag} removeTag={handleRemoveTag}/>}
                        <FlexColumn>
                            <SelectedTags selected={selectedTags} onRemove={handleRemoveTag} onRemoveAll={() => setSelectedTags([])}/>
                            <Btn style={{width: "100px"}} onClick={() => setTagsCloud(true)} disabled={tagsCloud} secondary>Apply tags</Btn>
                        </FlexColumn>

                        <UploadImages images={images} setImages={setImages}/>
                    </FlexColumn>
                </FlexRow>
            </S.Body>
        </Modal>
    )
}