import React, {useCallback, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import Api from "../../API/Api";
import {Input, TextArea} from "../default/Form";
import {Categories} from "../header/category/Categories";
import {Column, FlexRow} from "../default/Flex.styled";
import {useSessionState} from "../../hooks/UseSessionState";
import {Category, Tag} from "../../Types";
import {Button} from "react-bootstrap";
import {SelectedTags, TagsCloud} from "../header/tags/TagsCloud";
import {useHeader} from "../header/Header";
import {defaultFilter} from "../../DefaultObjects";
import {useOutsideClick} from "../../hooks/Hooks";
interface IUploadPluginModal {
    opened: boolean;
    setOpened: (state : boolean) => void;
}

export const UploadPluginModal : React.FC<IUploadPluginModal> = ({setOpened}) => {

    const [pluginData, setPluginData] = useState({
        name: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        categories: [],
        hashtags: [],
    });

    const {
        filter,
        setFilter,
    } = useHeader("MAIN_FILTER", defaultFilter)
    const handleAddTag = useCallback((tag: Tag) => setFilter(prevState => ({...prevState, selectedTags: [...prevState.selectedTags, tag]})), [setFilter])
    const handleRemoveTag = useCallback((tag: Tag) => setFilter(prevState => ({...prevState, selectedTags: [...prevState.selectedTags.filter(t => t.id !== tag.id)]})), [setFilter])
    const handleRemoveAllTags = useCallback(() => setFilter(prevState => ({...prevState, selectedTags:[]})),[setFilter])
    const [tagsCloud, setTagsCloud] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useSessionState<Category[]>("CATEGORIES",[], Api.getCategories());

    const ref = React.createRef<HTMLDivElement>()
    const handleCloseTagsCloud = useCallback(() => setTagsCloud(false), [setTagsCloud])
    useOutsideClick(ref, handleCloseTagsCloud, tagsCloud)

    const handleCloseModal = useCallback(() => {
        setOpened(false)
    }, [setOpened])

    const handleAcceptModal = useCallback(() =>{
        console.log(pluginData);
        Api.sendNewPlugin(pluginData)
            .then((response) => {console.log(response)})
            .catch((response) => {console.log(response)});
        setOpened(false);
    }, [pluginData, setOpened])

    const handleSetCategory = (categoryId: number) => {
        //setPluginData({... pluginData, categories: categoryId});
    }

    const nameInvalid = pluginData.name.length < 4 || pluginData.name.length > 64;

    const shortDescInvalid = pluginData.shortDescription.length < 128;

    const fullDescInvalid = pluginData.fullDescription.length < 256;

    const priceInvalid = isNaN(Number(pluginData.price));

    return (
        <Modal
            $height={"900px"}
            $width={"1000px"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}
            disableAccept={priceInvalid || fullDescInvalid || shortDescInvalid || nameInvalid}
        >
            <S.Title>UPLOAD NEW PLUGIN</S.Title>
            <S.Body>
                <FlexRow>
                    <Column style={{width:"400px", margin: "10px"}}>
                        <S.Row>Name:</S.Row>
                        <Input invalid={nameInvalid} type={"text"} value={pluginData.name}
                               onChange={(e) => {setPluginData({... pluginData, name: e.target.value})}}/>
                        <S.Row>Short description:</S.Row>
                        <Input invalid={shortDescInvalid} type={"text"} value={pluginData.shortDescription}
                               onChange={(e) => {setPluginData({... pluginData, shortDescription: e.target.value})}}/>
                        <S.Row>Full description:</S.Row>
                        <Input invalid={fullDescInvalid} type={"text"} value={pluginData.fullDescription}
                               onChange={(e) => {setPluginData({... pluginData, fullDescription: e.target.value})}}/>
                        <S.Row>Price:</S.Row>
                        <TextArea invalid={priceInvalid} style={{resize:"none"}} type={"text"} value={pluginData.price}
                                  onChange={(e) => {setPluginData({... pluginData, price: e.target.value})}}/>
                    </Column>
                    <Column style={{width:"400px", margin: "10px"}}>
                        <S.Row>Categories:</S.Row>
                        {/*<MultipleCategories category={-1} setCategories={handleSetCategory}>
                        </MultipleCategories>*/}
                        <Categories setCategory={handleSetCategory} category={-1}/>
                        <S.Row>Tags:</S.Row>

                        {tagsCloud && <TagsCloud ref={ref} selected={filter.selectedTags} addTag={handleAddTag} removeTag={handleRemoveTag}/>}
                        <SelectedTags selected={filter.selectedTags} onRemove={handleRemoveTag} onRemoveAll={handleRemoveAllTags}/>
                        {!tagsCloud &&
                            <Button style={{width: "70px", margin: "10px auto"}} disabled={false} onClick={() => setTagsCloud(true)}>show</Button>}
                        {tagsCloud &&
                            <Button style={{width: "70px", margin: "10px auto"}} disabled={true} onClick={() => setTagsCloud(true)}>close</Button>}

                        <input style={{margin: "10px"}} type={"file"}/>
                    </Column>
                </FlexRow>
            </S.Body>
        </Modal>
    )
}