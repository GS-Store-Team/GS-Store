import React, {useCallback, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import {Input, TextArea} from "../default/Form";
import {Categories} from "../header/category/Categories";
import {FlexColumn, FlexRow} from "../default/Flex.styled";
import {defaultPlugin} from "../../DefaultObjects";
import {useOutsideClick} from "../../hooks/Hooks";
import {Plugin, Tag} from "../../Types";
import {SelectedTags, TagsCloud} from "../header/tags/TagsCloud";
import {Btn} from "../default/Btn";
import Api from "../../API/Api";

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

    const ref = React.createRef<HTMLDivElement>()
    const handleCloseTagsCloud = useCallback(() => setTagsCloud(false), [setTagsCloud])

    useOutsideClick(ref, handleCloseTagsCloud, tagsCloud)

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
                                invalid={false}
                                value={plugin.name}
                                onChange={(e) => setPlugin({... plugin, name: e.target.value})}/>
                        </span>
                        <span>
                            <S.Row>Price:</S.Row>
                            <Input
                                invalid={false}
                                value={plugin.price}
                                onChange={handleSetPrice}/>
                        </span>
                        <span>
                            <S.Text>Short description:</S.Text>
                            <TextArea
                                style={{height: "150px", resize: "none"}}
                                invalid={false}
                                value={plugin.shortDescription}
                                onChange={(e) => setPlugin({... plugin, shortDescription: e.target.value})}/>
                        </span>
                        <span>
                            <S.Text>Full description:</S.Text>
                            <TextArea
                                style={{height: "250px", resize: "none"}}
                                invalid={false}
                                value={plugin.fullDescription}
                                onChange={(e) => setPlugin({... plugin, fullDescription: e.target.value})}/>
                        </span>
                    </FlexColumn>
                    <FlexColumn style={{width: "50%", gap: "30px"}}>
                        <FlexRow style={{alignItems: "center", padding:"100px 40px 20px 40px", gap: "50px"}} justifyContent={"center"}>
                            <span style={{fontWeight: "bold", transform:"translateY(-2px)"}}>Category:</span>
                            <Categories setCategory={handleSetCategory} category={-1}/>
                        </FlexRow>

                        {tagsCloud && <TagsCloud ref={ref} selected={selectedTags} addTag={handleAddTag} removeTag={handleRemoveTag}/>}
                        <div style={{padding: "40px"}}>
                            <FlexColumn style={{alignItems: "center"}}>
                                <SelectedTags selected={selectedTags} onRemove={handleRemoveTag} onRemoveAll={() => setSelectedTags([])}/>
                                <Btn style={{width: "60%"}} onClick={() => setTagsCloud(true)} disabled={tagsCloud} secondary>Apply tags</Btn>
                            </FlexColumn>
                        </div>

                        <FlexRow justifyContent={"center"} >
                            <span style={invalidFile ? {border: "1px solid red", padding: "10px 20px", borderRadius: "5px"}:{border: "1px solid green", padding: "10px 20px", borderRadius: "5px"}}>
                                <input type={"file"} id="pluginFile" onChange={handleFileChange}/>
                            </span>
                        </FlexRow>
                    </FlexColumn>
                </FlexRow>
            </S.Body>
        </Modal>
    )
}