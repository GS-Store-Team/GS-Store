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
import PluginList from "../../components/pluginList/PluginList";

export const UserPlugin = () => {
    const navigate = useNavigate();
    const [plugins, setPlugins] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() =>{
        Api.getPluginsPage(1, 9, filter, -1, null).then((response) =>{
            if(response.status === 200) {
                setPlugins(response.data.content);
            }
        })
    }, [1])

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

    const [uploaded, setUploaded] = useState(false);

    const toggleStateTrue = () => setUploaded(true);
    const toggleStateFalse = () => setUploaded(false);


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
                            <div>
                            {uploaded ?
                                <S.MenuBtn onClick={toggleStateFalse}>
                                    downloaded
                                </S.MenuBtn> :
                                <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"}
                                           onClick={toggleStateFalse}>
                                    downloaded
                                </S.MenuBtn>
                            }

                            {uploaded ?
                                <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"}
                                       onClick={toggleStateTrue}>
                                        uploaded
                                </S.MenuBtn>:
                                <S.MenuBtn onClick={toggleStateTrue}>
                                    uploaded
                                </S.MenuBtn>
                            }

                            <PluginList list={plugins} perLine={3}/>
                            </div>
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