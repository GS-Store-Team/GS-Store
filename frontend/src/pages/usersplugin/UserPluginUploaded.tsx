import React, {useCallback, useMemo, useState} from 'react';
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
import {defaultFilter, defaultPlugin} from "../../DefaultObjects";

export const UserPluginUploaded = () => {
    const navigate = useNavigate()
    const [pluginDataModal, setPluginDataModal] = useState(false);
    const {
        filter,
        setFilter,
        plugins,
        resetFilter,
        noContent,
        renew,
    } = useHeader("MY_PLUGINS_UPLOADED_FILTER", {...defaultFilter, my:true})

    const handleOpenModal = useCallback(() => setPluginDataModal(true), [setPluginDataModal])
    const handleClickPurchased = useCallback(() => navigate("/user/plugins/purchased"),[navigate])

    const okPlugins = useMemo(() => plugins.filter(p => p.status === "OK"),[plugins])
    const moderatedPlugins = useMemo(() => plugins.filter(p => p.status === "MODERATION"),[plugins])
    const blockedPlugins = useMemo(() => plugins.filter(p => p.status === "BLOCKED"),[plugins])
    const handleCloseUpload = useCallback(() => {
        setPluginDataModal(false)
        renew()
    }, [renew])

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
                            {noContent ? <span style={{padding:"20px 40px"}}>No content</span>:
                                <>
                                    { blockedPlugins.length > 0 &&
                                        <>
                                            <S.Heading>Blocked<Icon img={"blocked"} nonClickable /></S.Heading>
                                            <PluginList list={blockedPlugins} perLine={3}/>
                                        </>
                                    }
                                    { moderatedPlugins.length > 0 &&
                                        <>
                                            <S.Heading>Moderation stage<Icon img={"moderation"} nonClickable /></S.Heading>
                                            <PluginList list={moderatedPlugins} perLine={3}/>
                                        </>
                                    }
                                    { okPlugins.length > 0 &&
                                        <>
                                            <S.Heading>Successfully uploaded<Icon img={"ok"} nonClickable /></S.Heading>
                                            <PluginList list={okPlugins} perLine={3}/>
                                        </>
                                    }
                                </>
                            }
                        </Column>
                    </FlexRow>
                </Container>
            </Sp.Main>
            {pluginDataModal && <UploadPluginModal initialPlugin={defaultPlugin} onClose={handleCloseUpload} />}
            <MyFooter/>
        </Sp.Wrapper>
    );
};