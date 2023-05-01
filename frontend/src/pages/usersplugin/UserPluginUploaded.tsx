import React, {useCallback, useContext, useEffect, useState} from 'react';
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../Types";
import {Column, FlexRow} from "../../components/default/Flex.styled";
import {Styled as S} from "./UserPluginPage.styled";
import {UploadPluginModal} from "../../components/modalWindow/UploadPluginModal";
import {Styled as Sp} from "../Pages.styled";
import {Container} from "react-bootstrap";
import PluginList from "../../components/pluginList/PluginList";
import {Header, useHeader} from "../../components/header/Header";
import {defaultFilter} from "../main/MainPage";
import {Filter} from "../../Types";
import {AuthContext} from "../../App";
import {Icon} from "../../components/default/Icon";
import {UserMenu} from "../../components/user/UserProfileData";
import {filtersEquals} from "../../utils/Utils";

export const UserPluginUploaded = () => {
    const navigate = useNavigate()
    const [pluginDataModal, setPluginDataModal] = useState(false);
    const {
        filter,
        setFilter,
        plugins,
        resetFilter,
        loading,
        noContent,
    } = useHeader("MY_PLUGINS_UPLOADED_FILTER", {...defaultFilter, my:true})

    const handleOpenModal = useCallback(() => setPluginDataModal(true), [setPluginDataModal])
    const handleClickPurchased = useCallback(() => navigate("/user/plugins/purchased"),[])

    return (
        <Sp.Wrapper>
            <Header filter={filter} onChangeFilter={setFilter} enableSearch resetFilter={!filtersEquals(filter, defaultFilter) ? resetFilter : undefined}/>
            <Sp.Main>
                <Container fluid={"xxl"}>
                    <FlexRow style={{marginTop: "20px"}}>
                        <UserMenu chosen={1}/>
                        <Column>
                            <FlexRow justifyContent={"flex-end"}>
                                <Icon img={"plus"} onClick={handleOpenModal} tooltip={{label:"Upload new plugin"}}></Icon>
                            </FlexRow>
                            <FlexRow justifyContent={"space-between"} style={{alignItems: "center"}}>
                                <h2 style={{padding: " 10px 0 0 40px", whiteSpace: "nowrap"}}>Your uploaded software</h2>
                                <FlexRow justifyContent={"center"}>
                                    <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"}>uploaded</S.MenuBtn>
                                    <S.MenuBtn onClick={handleClickPurchased}>purchased</S.MenuBtn>
                                </FlexRow>
                            </FlexRow>
                            <hr style={{margin:"5px 0 0 40px"}}/>
                            {noContent ? <span style={{padding:"20px 40px"}}>No content</span>:<PluginList list={plugins} perLine={3}/>}
                        </Column>
                    </FlexRow>
                </Container>
            </Sp.Main>
            {pluginDataModal ?
                <UploadPluginModal
                    opened={pluginDataModal}
                    setOpened={setPluginDataModal}
                /> : <></>
            }
            <MyFooter/>
        </Sp.Wrapper>
    );
};