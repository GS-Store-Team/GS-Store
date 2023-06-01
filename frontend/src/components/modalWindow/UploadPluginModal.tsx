import React, {useCallback, useEffect, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import {Input, TextArea} from "../default/Form";
import {FlexColumn, FlexRow} from "../default/Flex.styled";
import {useOutsideClick} from "../../hooks/Hooks";
import {Category, ImageWrapper, Plugin, Tag} from "../../Types";
import {SelectedTags, TagsCloud} from "../header/tags/TagsCloud";
import {Btn} from "../default/Btn";
import Api from "../../API/Api";
import {UploadImages} from "../image/uploadImage/UploadImages";
import cross from "../../UI/img/cross.png";
import {useNavigate} from "react-router-dom";
import {useSessionState} from "../../hooks/UseSessionState";
import Select, {OnChangeValue} from 'react-select';

interface IUploadPluginModal {
    initialPlugin: Plugin;
    onClose: () => void;
}

const initialText = {
    name: "My plugin",
    shortDescription: "Provide a brief description that will be visible on initial viewing.",
    fullDescription: "In a full description, tell about the strengths of your software and describe the purpose."
}

function checkFile(fileName : string): boolean {
    const words = fileName.toLowerCase().split(".")
    return "zip" !== words[words.length - 1]
}

function mapToTags(refs: {tagId: number, pluginId:number }[]): Tag[]{
    const tagsStr = sessionStorage.getItem("TAGS_SET")
    if(!tagsStr) return []
    const tags : Tag[] = JSON.parse(tagsStr)
    return refs.map(r => tags.find(t => t.id === r.tagId)).filter((e): e is Tag => !!e)
}
export interface StateOption {
    readonly value: number;
    readonly label: string;
}

export const UploadPluginModal : React.FC<IUploadPluginModal> = ({onClose, initialPlugin}) => {
    const [plugin, setPlugin] = useState<Plugin>(() => {
        if(initialPlugin.id !== null) {
            return {...initialPlugin}
        }
        return {...initialPlugin, ...initialText}
    });

    const navigate = useNavigate()
    const [tagsCloud, setTagsCloud] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(mapToTags(plugin.tags))
    const [categoryList, setCategoryList] = useSessionState<Category[]>("CATEGORIES",[], Api.getCategories());
    const [file, setFile] = useState<File>()
    const [invalidFile, setInvalidFile] = useState<boolean>(true)
    const [images, setImages] = useState<ImageWrapper[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>()

    const ref = React.createRef<HTMLDivElement>()
    const handleCloseTagsCloud = useCallback(() => setTagsCloud(false), [setTagsCloud])

    useOutsideClick(ref, handleCloseTagsCloud, tagsCloud)
    useEffect(() => {if(!file) setInvalidFile(true)},[file])

    const handleAddTag = useCallback((tag : Tag) => setSelectedTags(prevState => [...prevState, tag]), [setSelectedTags])
    const handleRemoveTag = useCallback((tag: Tag) => setSelectedTags(prevState => [...prevState.filter(t => t.id !== tag.id)]), [setSelectedTags])
    const handleDeleteWarn = useCallback(() => setDeleteModal(true), [])
    const handleCloseDeleteWarn = useCallback(() => setDeleteModal(false), [])
    const handleDeletePlugin = useCallback(() => Api.deletePlugin(plugin.id).then(() => navigate("/user/plugins/uploaded")), [navigate, plugin.id])

    const handleAcceptModal = useCallback(() =>{
        plugin.tags = selectedTags.map(t => ({tagId: t.id, pluginId:0 }))

        if(!file) return
        const formData = new FormData();
        formData.append("file", file)
        Api.validateFile(formData)
            .then(response => {
                if(!response.data.isPlugin){
                    setInvalidFile(true)
                    return
                }
                Api.sendPlugin(plugin)
                    .then(({data}) => {
                        Api.uploadPluginFile(data, formData)
                            .then(onClose)

                        images.reduce((prev, img) => {
                                const formData = new FormData()
                                formData.append("image", img.file)
                                return prev.then(() => Api.uploadImageForPlugin(data,formData, img.title)) as Promise<any>
                            }, Promise.resolve())
                    })
        console.log(plugin)
            })
    }, [plugin, onClose, selectedTags, file, images])

    const nameInvalid = plugin.name.length < 4 || plugin.name.length > 64;
    const shortDescInvalid = plugin.shortDescription.length < 20 || plugin.shortDescription.length > 512;
    const fullDescInvalid = plugin.fullDescription.length < 20 || plugin.fullDescription.length > 8192;
    const priceInvalid = plugin.price > 10000;

    const handleSetPrice = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        let price = Number(e.currentTarget.value);
        if(!price) price = 0
        setPlugin(prevState => ({...prevState, price}))
    }, [])

    const handleFileChange = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
        if (!file) return;
        setInvalidFile(checkFile(file.name))
        setFile(file)
    }, [])

    const transformedCategories : readonly StateOption[] = categoryList.map((c, index)=>({value: c.id, label: c.title}))

    const handleSelectionChangeCategory = (category: OnChangeValue<StateOption, true>) => {
        if (category) {
            setPlugin({...plugin, categories: (category as StateOption[]).map((value: StateOption) => ({categoryId: value.value, pluginId: 0}))})
        }
    }

    return (
        <Modal
            $height={"910px"}
            $width={"1200px"}
            onAccept={handleAcceptModal}
            onDecline={onClose}
            onClose={onClose}
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
                                onChange={(e) => setPlugin({...plugin, name: e.target.value})}/>
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
                                onChange={(e) => setPlugin({...plugin, shortDescription: e.target.value})}/>
                        </span>
                        <span>
                            <S.Text>Full description:</S.Text>
                            <TextArea
                                style={{height: "240px", resize: "none"}}
                                invalid={fullDescInvalid}
                                value={plugin.fullDescription}
                                onChange={(e) => setPlugin({...plugin, fullDescription: e.target.value})}/>
                        </span>
                    </FlexColumn>
                    <FlexColumn style={{width: "50%", gap: "30px", padding: "20px 0 0 40px"}}>
                        { plugin.id !== null &&
                            <FlexRow justifyContent={"flex-end"}>
                                <Btn danger onClick={handleDeleteWarn} style={{width: "150px"}}>DELETE PLUGIN</Btn>
                            </FlexRow>
                        }
                        <FlexColumn style={{gap:"3px"}}>
                            <FlexRow justifyContent={"space-between"}>
                                <span style={{fontSize: "18px"}}>Attach software</span>
                                <span>Appropriate format: .zip</span>
                            </FlexRow>
                            <span style={invalidFile ? {border: "2px solid red", padding: "10px 20px", borderRadius: "5px"}:{border: "2px solid green", padding: "10px 20px", borderRadius: "5px"}}>
                                <Input type={"file"} invalid={invalidFile} id="pluginFile" onChange={handleFileChange}/>
                            </span>
                        </FlexColumn>

                        <FlexRow style={{alignItems:"center"}} gap={"40px"}>
                            <Select

                                isMulti
                                name="categories"
                                options={transformedCategories}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectionChangeCategory}
                            />
                        </FlexRow>

                        {tagsCloud && <TagsCloud ref={ref} selected={selectedTags} addTag={handleAddTag} removeTag={handleRemoveTag}/>}
                        <FlexColumn>
                            <SelectedTags selected={selectedTags} onRemove={handleRemoveTag} onRemoveAll={() => setSelectedTags([])}/>
                            <Btn style={{width: "100px"}} onClick={() => setTagsCloud(true)} disabled={tagsCloud} secondary>Apply tags</Btn>
                        </FlexColumn>

                        <UploadImages images={images} setImages={setImages}/>

                        {deleteModal &&
                            <S.ModalBackground>
                                <S.Modal $height={"400px"}>
                                    <S.Title>Delete plugin completely?</S.Title>
                                    <S.Body>
                                        <S.Row>Be careful, the action <strong>cannot be measured</strong>, the software will be <strong>completely removed</strong>.</S.Row>
                                        <S.Row>Users who already purchased a license will be able to use the software. Other users will no longer see the plugin.</S.Row>
                                    </S.Body>
                                    <S.Cross onClick={handleCloseDeleteWarn}><img style={{width: "15px", height: "15px", margin: "auto"}} src={cross} alt={".."}/></S.Cross>
                                    <S.Buttons>
                                        <Btn primary onClick={handleCloseDeleteWarn} style={{width: "140px"}}>NO</Btn>
                                        <Btn danger onClick={handleDeletePlugin} style={{width: "80px"}} >DELETE</Btn>
                                    </S.Buttons>
                                </S.Modal>
                            </S.ModalBackground>
                        }
                    </FlexColumn>
                </FlexRow>
            </S.Body>
        </Modal>
    )
}