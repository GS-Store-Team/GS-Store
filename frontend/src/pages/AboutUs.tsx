import {Header} from "../components/header/Header";
import {defaultFilter} from "../DefaultObjects";
import {Styled as S} from "./Pages.styled";
import {Container} from "react-bootstrap";
import {MyFooter} from "../components/footer/MyFooter";
import React, {useState} from "react";
import {Column, FlexRow} from "../components/default/Flex.styled";
import {Filter} from "../Types";

export const AboutUs = () => {
    const [filter, setFilter] = useState<Filter>(defaultFilter)

    return (
        <S.Wrapper>
            <Header onChangeFilter={setFilter} filter={filter}/>
            <S.Main>
                <Container style={{paddingTop: "20px", paddingLeft: "50px", fontSize: "20px"}}>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "150px", width: "150px", maxHeight: "50px", paddingLeft: "50px"}}>
                            About project:
                        </Column>
                    </FlexRow>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "1000px", width: "1000px", maxHeight: "110px", paddingLeft: "100px"}}>
                            GS-Store is an online platform for plugins (small software tools, libraries).
                            The Internet site provides the ability to host, purchase,
                            license plug-ins, and also contains elements of a social network: the ability to comment,
                            leave bug reports, and receive status.
                        </Column>
                    </FlexRow>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px", paddingLeft: "50px"}}>
                            github:
                        </Column>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px"}}>
                            <p><a href="https://github.com/GS-Store-Team/GS-Store/tree/main" target="_blank">repository</a></p>
                        </Column>
                    </FlexRow>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px", paddingLeft: "50px"}}>
                            contacts:
                        </Column>
                    </FlexRow>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px", paddingLeft: "100px"}}>
                            Egor:
                        </Column>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px"}}>
                            <p><a href="https://github.com/PlesneviyGRIB" target="_blank">github link</a></p>
                        </Column>
                    </FlexRow>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px", paddingLeft: "100px"}}>
                            Kirill:
                        </Column>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px"}}>
                            <p><a href="https://github.com/KillReal2287" target="_blank">github link</a></p>
                        </Column>
                    </FlexRow>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px", paddingLeft: "100px"}}>
                            Andrey:
                        </Column>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "50px"}}>
                            <p><a href="https://github.com/sequut" target="_blank">github link</a></p>
                        </Column>
                    </FlexRow>
                    <FlexRow gap={"40px"}>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "100px", paddingLeft: "100px"}}>
                            Nikita:
                        </Column>
                        <Column style={{maxWidth: "30px", width: "30px", maxHeight: "100px"}}>
                            <p><a href="https://github.com/Inikta" target="_blank">github link</a></p>
                        </Column>
                    </FlexRow>
                </Container>
            </S.Main>
            <MyFooter/>
        </S.Wrapper>
    )
}