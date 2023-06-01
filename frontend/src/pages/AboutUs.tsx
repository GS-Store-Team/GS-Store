import {Header} from "../components/header/Header";
import {defaultFilter} from "../DefaultObjects";
import {Styled as S} from "./Pages.styled";
import {Container} from "react-bootstrap";
import {MyFooter} from "../components/footer/MyFooter";
import React, {useState} from "react";
import {Filter} from "../Types";

export const AboutUs = () => {
    const [filter, setFilter] = useState<Filter>(defaultFilter)

    return (
        <S.Wrapper>
            <Header onChangeFilter={setFilter} filter={filter}/>
            <S.Main>
                <Container style={{paddingTop: "160px", textAlign: "center", fontSize: "20px"}}>
                    <div><strong>Overview</strong></div>
                    <div style={{width: "600px", margin: "auto"}}>
                        GS-Store is an online platform for plugins (small software tools, libraries).
                        The Internet site provides the ability to host, purchase,
                        license plug-ins, and also contains elements of a social network: the ability to comment,
                        leave bug reports, and receive status.
                    </div>
                    <div style={{padding: "20px"}}><a href="https://github.com/GS-Store-Team/GS-Store/tree/main"
                                                      target="_blank">github.com/GS-Store</a></div>
                    <div style={{
                        fontSize: "16px",
                        textAlign: "center",
                        backgroundColor: "rgba(234,226,231,0.63)",
                        padding: "10px 30px",
                        borderRadius: "10px",
                        margin: "auto",
                        width: "200px"
                    }}>
                        <div><a href="https://github.com/KillReal2287" target="_blank">KillReal2287</a></div>
                        <div><a href="https://github.com/Inikta" target="_blank">Inikta</a></div>
                        <div><a href="https://github.com/PlesneviyGRIB" target="_blank">Plesneviy_GRIB</a></div>
                        <div><a href="https://github.com/sequut" target="_blank">Sequut</a></div>
                    </div>
                </Container>
            </S.Main>
            <MyFooter/>
        </S.Wrapper>
    )
}