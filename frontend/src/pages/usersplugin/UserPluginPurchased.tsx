import React, {useCallback, useState} from 'react';
import {MyFooter} from "../../components/footer/MyFooter";
import {useNavigate} from "react-router-dom";
import {Column, FlexRow} from "../../components/default/Flex.styled";
import {Styled as S} from "./UserPluginPage.styled";
import {UploadPluginModal} from "../../components/modalWindow/UploadPluginModal";
import {Styled as Sp} from "../Pages.styled";
import {Container} from "react-bootstrap";
import PluginList from "../../components/pluginList/PluginList";
import {Header, useHeader} from "../../components/header/Header";
import {Icon} from "../../components/default/Icon";
import {UserMenu} from "../../components/user/UserProfileData";
import {filtersEquals} from "../../utils/Utils";
import {defaultFilter} from "../../DefaultObjects";

const defaultUserData = {nickName: '', email: '', phoneNumber: '', description: '', images: [], userId: 0}

export const UserPluginPurchased = () => {
    const navigate = useNavigate()
    const [pluginDataModal, setPluginDataModal] = useState(false);
    const {
        filter,
        setFilter,
        plugins,
        resetFilter,
        loading,
        noContent,
    } = useHeader("MY_PLUGINS_PURCHASED_FILTER", {...defaultFilter, bought:true})

    const handleOpenModal = useCallback(() => setPluginDataModal(true), [setPluginDataModal])
    const handleClickUploaded = useCallback(() => navigate("/user/plugins/uploaded"),[])

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
                                <h2 style={{padding: " 10px 0 0 40px", whiteSpace: "nowrap"}}>Your purchased plugins</h2>
                                <FlexRow justifyContent={"center"}>
                                    <S.MenuBtn onClick={handleClickUploaded}>uploaded</S.MenuBtn>
                                    <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"}>purchased</S.MenuBtn>
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