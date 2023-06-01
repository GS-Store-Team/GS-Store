import {Header} from "../../components/header/Header";
import {defaultFilter} from "../../DefaultObjects";
import {Styled as S} from "../Pages.styled";
import {Container} from "react-bootstrap";
import {MyFooter} from "../../components/footer/MyFooter";
import React, {FC, useCallback, useEffect, useState} from "react";
import {UserMenu} from "../../components/user/UserProfileData";
import {Styled as S1} from "./PluginManagement.styled"
import {Column, FlexRow} from "../../components/default/Flex.styled";
import {Filter, ManagementPluginFilterDTO, Plugin} from "../../Types";
import Api from "../../API/Api";
import {useNavigate} from "react-router-dom";
import {Btn} from "../../components/default/Btn";

export const PluginManagementList = () => {
    const [filter, setFilter] = useState<Filter>(defaultFilter)
    const [plugins, setPlugins] = useState<Plugin[]>([])
    const [pFilter, setPFilter] = useState<ManagementPluginFilterDTO>({status: undefined})

    useEffect(() => {
        Api.getPluginsForModeration(pFilter).then(response => setPlugins(response.data))
    }, [pFilter])

    return (
        <S.Wrapper>
            <Header onChangeFilter={setFilter} filter={filter}/>
            <S.Main>
                <Container style={{paddingTop: "20px"}}>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "150px", width: "150px"}}><UserMenu chosen={3}/></Column>
                        <Column style={{gap: "20px", padding: "20px", paddingBottom:"50px", minWidth:"600px"}}>
                            {plugins.map(p => <PluginManagement key={p.id} plugin={p}/>)}
                            {plugins.map(p => <PluginManagement key={p.id} plugin={p}/>)}
                            {plugins.map(p => <PluginManagement key={p.id} plugin={p}/>)}
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
}

const PluginManagement: FC<IPluginManagement> = ({plugin}) => {
    const navigate = useNavigate()

    const handleClick = useCallback(() => navigate(`/main/${plugin.id}`), [navigate, plugin.id])

    const handleClickButtons = useCallback((e: React.MouseEvent) => {e.stopPropagation()}, [])

    //getVerificationResult

    return(
        <S1.PluginTab $status={plugin.status} onClick={handleClick}>
            <S1.Header>{plugin.name}</S1.Header>
            <FlexRow justifyContent={"flex-end"} onClick={handleClickButtons}>
                {/*<Btn secondary onClick={}>INFO</Btn>*/}
            </FlexRow>
        </S1.PluginTab>
    )
}
