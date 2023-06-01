import {Header} from "../../components/header/Header";
import {defaultFilter} from "../../DefaultObjects";
import {Styled as S} from "../Pages.styled";
import {Container} from "react-bootstrap";
import {MyFooter} from "../../components/footer/MyFooter";
import React, {FC, useCallback, useEffect, useState} from "react";
import {UserMenu} from "../../components/user/UserProfileData";
import {Styled as S1} from "./PluginManagement.styled"
import {Column, FlexColumn, FlexRow} from "../../components/default/Flex.styled";
import {Filter, ManagementPluginFilterDTO, Plugin, PluginStatus, Verifier} from "../../Types";
import Api from "../../API/Api";
import {useNavigate} from "react-router-dom";
import {Btn} from "../../components/default/Btn";
import {InfoModal} from "../../components/modalWindow/InfoModal";
import {Styled as S2} from "../../components/default/Modal.styled";
import {Icon} from "../../components/default/Icon";

export const PluginManagementList = () => {
    const [filter, setFilter] = useState<Filter>(defaultFilter)
    const [plugins, setPlugins] = useState<Plugin[]>([])
    const [pFilter, setPFilter] = useState<ManagementPluginFilterDTO>({status: undefined})
    const [fetch, setFetch] = useState<boolean>()

    useEffect(() => {
        Api.getPluginsForModeration(pFilter).then(response => setPlugins(response.data))
    }, [pFilter, fetch])

    const handleChange = useCallback(() => setFetch(prevState => !prevState), [])

    return (
        <S.Wrapper>
            <Header onChangeFilter={setFilter} filter={filter}/>
            <S.Main>
                <Container style={{paddingTop: "20px"}}>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "150px", width: "150px"}}><UserMenu chosen={3}/></Column>
                        <Column style={{gap: "20px", padding: "20px", paddingBottom: "50px", minWidth: "600px"}}>
                            {plugins.map(p => <PluginManagement key={p.id} plugin={p} onChange={handleChange}/>)}
                        </Column>
                    </FlexRow>
                </Container>
            </S.Main>
            <MyFooter/>
        </S.Wrapper>
    );
}

interface IPluginManagement {
    plugin: Plugin
    onChange: () => void
}

const PluginManagement: FC<IPluginManagement> = ({plugin, onChange}) => {
    const navigate = useNavigate()
    const handleClick = useCallback(() => navigate(`/main/${plugin.id}`), [navigate, plugin.id])
    const [modal, setModal] = useState<Verifier>()
    const [errorModal, setErrorModal] = useState<string>()

    const handleCloseModal = useCallback(() => {
        setModal(undefined)
        setErrorModal(undefined)
    }, [])

    const handleClickInfo = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        Api.getVerificationResult(plugin.id)
            .then(response => setModal(response.data))
            .catch(e => setErrorModal(e.message))
    }, [plugin])

    const managePlugin = useCallback((status: PluginStatus) => {
        if(!status) return

        Api.managePlugin(plugin.id, status).then(onChange)
    }, [onChange, plugin.id])

    const handleBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        managePlugin("BLOCKED")
    }, [managePlugin])
    const handleAccept = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        managePlugin("OK")
    }, [managePlugin])
    const handleModerate = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        managePlugin("MODERATION")
    }, [managePlugin])
//Verifier
    return (
        <>
            <S1.PluginTab $status={plugin.status} onClick={handleClick}>
                <FlexColumn style={{gap: "20px"}}>
                    <FlexRow justifyContent={"space-between"}>
                        <S1.Header>{plugin.name}</S1.Header>
                        <Btn secondary onClick={handleClickInfo}>INFO</Btn>
                    </FlexRow>
                    <FlexRow justifyContent={"flex-end"} gap={"10px"} style={{opacity: ".8"}}>
                        {plugin.status !== "BLOCKED" && <Btn danger style={{width: "100px"}} onClick={handleBlock}>BLOCK</Btn>}
                        {plugin.status !== "OK" && <Btn success style={{width: "100px"}} onClick={handleAccept}>ACCEPT</Btn>}
                        {plugin.status !== "MODERATION" && <Btn info style={{width: "100px"}} onClick={handleModerate}>MODERATE</Btn>}
                    </FlexRow>
                </FlexColumn>
            </S1.PluginTab>
            {modal &&
                <InfoModal
                    $height={"900px"}
                    title={"VERIFICATION RESULTS"}
                    onOk={handleCloseModal}>
                    <S2.Row>
                        <FlexRow gap={"10px"}>Passed: {modal.isPlugin ? <Icon img={"ok"} nonClickable/> : <Icon img={"blocked"} nonClickable/>}</FlexRow>
                    </S2.Row>
                    <S2.Row>Types available: {modal.isTypesAvailable ? "YES" : "NO"}</S2.Row>
                    <S2.Row>Summary: {modal.whatHappened}</S2.Row>
                    <hr/>
                    <S2.Row>Mistakes - {modal.mistakes.length}</S2.Row>
                    {modal.mistakes.map((m, index) => <S2.Text key={index}>{m}</S2.Text>)}
                    <hr/>
                    <S2.Row>Types - {modal.types.length}</S2.Row>
                    {modal.types.map((m, index) => <S2.Text key={index}>{m}</S2.Text>)}
                </InfoModal>
            }
            {errorModal &&
                <InfoModal
                    $height={"300px"}
                    title={"SOMETHING WENT WRONG"}
                    onOk={handleCloseModal}>
                    <S2.Text>{errorModal}</S2.Text>
                </InfoModal>
            }
        </>
    )
}
