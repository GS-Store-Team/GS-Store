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

    const handleOpenModal = useCallback(() =>{
        setPluginDataModal(true);
    }, [setPluginDataModal])

    return (
        <div>
            <PluginViewHeader/>
            <div className={["container"].join(' ')}>
                <FlexRow style={{marginTop: "120px"}}>
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
            </div>
            {pluginDataModal ?
                <UploadPluginModal
                    opened={pluginDataModal}
                    setOpened={setPluginDataModal}
                /> : <></>
            }

            <MyFooter/>
        </div>
    );
};