import React, {useCallback, useEffect, useState} from 'react';
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../types/Types";
import {FlexRow} from "../../components/default/Flex.styled";
import {Styled as S} from "./UserPlugin.styled";
import plus from "../../UI/img/plus.png"
import {UploadPluginModal} from "../../components/modalWindow/UploadPluginModal";
import {Styled as Sp} from "../Pages.styled";

export const UserPlugin = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData>({
        nickName: '',
        email: '',
        phoneNumber: '',
        description: '',
        image: 0,
        id: 0
    });

    useEffect(() => {
        Api.getCurrentUser().then((response) => {setUserData(response.data)});
    }, []);

    const myProfile = useCallback(() =>{
        navigate('/user/' + userData.id);
    },[navigate])

    const myPlugins = useCallback(() =>{
        navigate('/user/' + userData.id + '/plugins');
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
                <div className={["container"].join(' ')}>
                    <FlexRow style={{marginTop: "50px"}}>
                        <S.LeftMenu>
                            <S.MenuBtn onClick={myProfile}>
                                Profile
                            </S.MenuBtn>

                            <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"} onClick={myPlugins}>
                                Plugins
                            </S.MenuBtn>
                        </S.LeftMenu>

                        <S.MiddleMenu>
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
                                </S.MenuBtn> :
                                <S.MenuBtn onClick={toggleStateTrue}>
                                    uploaded
                                </S.MenuBtn>
                            }
                        </S.MiddleMenu>

                        <S.UploadButton>
                            <img src={plus}
                                 onClick={handleOpenModal}
                                 alt={".."}
                                 style={{width: "20px", height: "20px", float: "right"}}/>
                        </S.UploadButton>
                    </FlexRow>

                    <S.PluginList>
                        { uploaded ?
                            <div>no plugins loaded</div> :
                            <div>no plugins downloaded</div>
                        }
                    </S.PluginList>
                </div>
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