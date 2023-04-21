import React, {useCallback, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import Api from "../../API/Api";
import {Input, TextArea} from "../default/Form";

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

    const handleCloseModal = useCallback(() => {
        setOpened(false)
    }, [setOpened])

    const handleAcceptModal = useCallback(() =>{
/*        const array = pluginData.hashtags.map((tag) => tag.id);
        setPluginData({...pluginData, hashtags: array});

        pluginData.hashtags = array;*/
        console.log(pluginData);

        Api.sendNewPlugin(pluginData)
            .then((response) => {console.log(response)})
            .catch((response) => {console.log(response)});
        setOpened(false);
    }, [pluginData, setOpened])

    return (
        <Modal
            $height={"700px"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}
        >
            <S.Title>UPLOAD NEW PLUGIN</S.Title>
            <S.Body>
                <S.Row>Name:</S.Row>
                <Input type={"text"} value={pluginData.name}
                       onChange={(e) => {setPluginData({... pluginData, name: e.target.value})}}/>
                <S.Row>Short description:</S.Row>
                <Input type={"text"} value={pluginData.shortDescription}
                       onChange={(e) => {setPluginData({... pluginData, shortDescription: e.target.value})}}/>
                <S.Row>Full description:</S.Row>
                <Input type={"text"} value={pluginData.fullDescription}
                       onChange={(e) => {setPluginData({... pluginData, fullDescription: e.target.value})}}/>
                <S.Row>Price:</S.Row>
                <TextArea type={"text"} value={pluginData.price}
                          onChange={(e) => {setPluginData({... pluginData, price: e.target.value})}}/>
            </S.Body>
        </Modal>
    )
}