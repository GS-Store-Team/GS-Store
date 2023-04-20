import React, {useCallback, useEffect, useState} from 'react';
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../Types";
import {FlexRow} from "../../components/default/Flex.styled";
import {Styled as S} from "./UserPlugin.styled";
import plus from "../../UI/img/plus.png"
import {UploadPluginModal} from "../../components/modalWindow/UploadPluginModal";
import {Styled as Sp} from "../Pages.styled";
import {Container} from "react-bootstrap";

export const UserPlugin = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData>({
        nickName: '',
        email: '',
        phoneNumber: '',
        description: '',
        image: 0,
        userId: 0
    });

    useEffect(() => {
        Api.getCurrentUser().then((response) => {setUserData(response.data)});
    }, []);

    const myProfile = useCallback(() =>{
        navigate('/user/' + userData.userId);
    },[navigate])

    const myPlugins = useCallback(() =>{
        navigate('/user/' + userData.userId + '/plugins');
    },[navigate])

    const [pluginDataModal, setPluginDataModal] = useState(false);

    const handleOpenModal = useCallback(() =>{
        setPluginDataModal(true);
    }, [setPluginDataModal])

    return (
        <Sp.Wrapper>
            <PluginViewHeader/>
            <Sp.Main>
                <Container>
                    <FlexRow style={{marginTop: "20px"}}>
                        <S.LeftMenu>
                            <S.MenuBtn onClick={myProfile}>
                                Profile
                            </S.MenuBtn>

                            <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"} onClick={myPlugins}>
                                Plugins
                            </S.MenuBtn>
                        </S.LeftMenu>

                        <S.MiddleMenu>
                            <S.MenuBtn>
                                downloaded
                            </S.MenuBtn>

                            <S.MenuBtn>
                                uploaded
                            </S.MenuBtn>
                        </S.MiddleMenu>

                        <S.UploadButton>
                            <img src={plus}
                                 onClick={handleOpenModal}
                                 alt={".."}
                                 style={{width: "20px", height: "20px", float: "right"}}/>
                        </S.UploadButton>
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