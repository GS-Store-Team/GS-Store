import React, {useCallback, useState} from 'react';
import {Styled as S} from "./../default/Modal.styled";
import {Modal} from "../default/Modal";
import Api from "../../API/Api";
import {Input, TextArea} from "../default/Form";
import {Categories} from "../header/category/Categories";
import {Column, FlexRow} from "../default/Flex.styled";
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
        console.log(pluginData);
        Api.sendNewPlugin(pluginData)
            .then((response) => {console.log(response)})
            .catch((response) => {console.log(response)});
        setOpened(false);
    }, [pluginData, setOpened])

    const handleSetCategory = (categoryId: number) => {
        //setPluginData({... pluginData, categories: categoryId});
    }

    return (
        <Modal
            $height={"900px"}
            $width={"1000px"}
            onAccept={handleAcceptModal}
            onDecline={handleCloseModal}
            onClose={handleCloseModal}
        >
            <S.Title>UPLOAD NEW PLUGIN</S.Title>
            <S.Body>
                <FlexRow>
                    <Column style={{width:"400px"}}>
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
                    </Column>
                    <Column>
                        <Categories setCategory={handleSetCategory} category={-1}/>
                        <input type={"file"}/>
                    </Column>
                </FlexRow>
            </S.Body>
        </Modal>
    )
}