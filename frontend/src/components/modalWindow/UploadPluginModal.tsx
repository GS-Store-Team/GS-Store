import React, {useCallback, useEffect, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import Api from "../../API/Api";
import {Input, TextArea} from "../default/Form";
import classes from "./modalwindow.module.css";
import {Categories} from "../header/category/Categories";
import {SelectedTags} from "../tag/SelectedTags";
import {TagsCloud} from "../tag/TagsCloud";
import {Button} from "react-bootstrap";
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
        categories: -1,
        hashtags: [],
    });

    const [filter, setFilter] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsWindowVisible, setTagsWindowVisible] = useState(false);

    useEffect(() => {
        Api.getTags().then((response) => {
            if(response.status === 200)
                setTags(response.data)
        })
    }, [])

    const handleCloseModal = useCallback(() => {
        setOpened(false)
    }, [setOpened])

    const handleAcceptModal = useCallback(() =>{
        console.log(pluginData);
        console.log(selectedTags);
        Api.sendNewPlugin(pluginData)
            .then((response) => {console.log(response)})
            .catch((response) => {console.log(response)});
        setOpened(false);
    }, [pluginData, setOpened])

    const handleSetCategory = (categoryId: number) => {
        setPluginData({... pluginData, categories: categoryId});
    }

    const removeSelectedTag = useCallback((tag: never) =>{
        setSelectedTags(selectedTags.filter(t => t !== tag))
    },[setSelectedTags, selectedTags])

    const selectedTag = useCallback((tag: never) =>{
        if(selectedTags.includes(tag)) removeSelectedTag(tag)
        else setSelectedTags([...selectedTags, tag])
    },[selectedTags, removeSelectedTag, setSelectedTags])

    const removeAllTags = useCallback(() => {
        setSelectedTags([])
    },[selectedTags])

    return (
        <Modal
            $height={"1000px"}
            $width={"900px"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}>

            <S.Title>UPLOAD NEW PLUGIN</S.Title>
            <S.Body>
                <div className={classes.my__label}>Name:</div>
                <Input type={"text"} value={pluginData.name}
                       onChange={(e) => {setPluginData({... pluginData, name: e.target.value})}}/>
                <div className={classes.my__label}>Short description:</div>
                <TextArea type={"text"} value={pluginData.shortDescription}
                       onChange={(e) => {setPluginData({... pluginData, shortDescription: e.target.value})}}/>
                <div className={classes.my__label}>Full description:</div>
                <TextArea type={"text"} value={pluginData.fullDescription}
                       onChange={(e) => {setPluginData({... pluginData, fullDescription: e.target.value})}}/>
                <div className={classes.my__label}>Price:</div>
                <Input style={{marginBottom: "20px"}} type={"text"} value={pluginData.price}
                          onChange={(e) => {setPluginData({... pluginData, price: e.target.value})}}/>

                {tagsWindowVisible?
                    <TagsCloud list={tags} selectedTags={selectedTags} add={selectedTag} setVisible={setTagsWindowVisible}/>
                    :<div />
                }
                <SelectedTags list={selectedTags} remove={removeSelectedTag} removeAll={removeAllTags}/>

                <Button onClick={() => setTagsWindowVisible(true)}> Select tags</Button>
                <Categories setCategory={handleSetCategory} category={pluginData.categories}/>
                {/*                <div className={classes.my__tags}
                     onClick={() => setTagsWindowVisible(true)}>
                    Select tags
                </div>*/}

                <input className={classes.my__fileLoader}
                       type={"file"}/>
            </S.Body>
        </Modal>
    )
}