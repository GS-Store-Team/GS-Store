import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {ReviewArea} from "../../components/review/ReviewArea";
import {Column, FlexRow} from "../../components/default/Flex.styled";
import {ImgBlock} from "../../components/ImgBlock/ImgBlock";
import {Styled as S} from "./PluginPage.styled"
import {Icon} from "../../components/default/Icon";
import {Btn} from "../../components/default/Btn";
import {Styled as S1} from "./../Pages.styled"
import {Container} from "react-bootstrap";
import {Filter, Plugin} from "../../Types";
import {Header} from "../../components/header/Header";
import {defaultFilter} from "../main/Main";

const PluginPage = () => {

    const [filter, setFilter] = useState<Filter>(defaultFilter);

    const [plugin, setPlugin] = useState<Plugin>({
        id: 0,
        categories: [],
        checked: false,
        developer: 0,
        hashtags: [],
        images: [],
        name: 'none',
        shortDescription: 'none',
        fullDescription: '',
        deleted: false,
        mark: 5,
        price: 0
    });

    const params = useParams();

    useEffect(() =>{
        Api.getPluginById(params.id).then((response) => {
                if (response.status === 200) {
                    setPlugin(response.data as Plugin);
                }
            }
        )
    },[]);

    const handleViewOwner = useCallback(() => {

    }, [])

    return (
        <S1.Wrapper>
            <Header filter={filter} onChangeFilter={setFilter}/>
            <S1.Main>
                <Container>
                    <FlexRow style={{gap: 0}} justifyContent={"space-between"}>
                        <Column style={{minWidth: "200px", width: "300px", justifyContent:"space-between"}}>
                            <FlexRow style={{marginTop: "100px"}}>
                                <ImgBlock imageRefs={plugin.images} />
                            </FlexRow>
                            <Btn style={{marginBottom:"20px", width: "150px"}} primary>Purchase</Btn>
                        </Column>

                        <Column style={{width: "50%", padding: "100px 20px 50px 20px"}}>
                            <S.Header>
                                {plugin.name}
                                <FlexRow style={{gap: 0}}>
                                    <S.Rate><span style={{fontSize: "22px"}}>{plugin.mark}</span>/5</S.Rate>
                                    <S.Star><Icon img={"star"} nonClickable style={{opacity:1}}/></S.Star>
                                </FlexRow>
                            </S.Header>

                            <S.Items>
                                <Icon img={"man"} style={{width: "20px", height: "20px"}} tooltip={{label:"View owner", placement:"top"}} onClick={handleViewOwner}/>
                                <Icon img={"bug"} style={{width: "20px", height: "20px"}} tooltip={{label:"Leave bug report if some issues found", placement:"top"}}/>
                            </S.Items>

                            <S.Heading>Introduction</S.Heading>
                            <S.Text>{plugin.shortDescription}</S.Text>

                            <S.Heading>Description</S.Heading>
                            <S.Text>{plugin.fullDescription}</S.Text>
                        </Column>

                        <Column style={{width: "400px"}}>
                            { plugin.id && <ReviewArea pluginId={plugin.id}/> }
                        </Column>
                    </FlexRow>
                </Container>
            </S1.Main>
            <MyFooter />
        </S1.Wrapper>
    );
};

export default PluginPage;