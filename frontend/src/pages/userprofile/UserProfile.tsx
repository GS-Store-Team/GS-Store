import React, {useCallback, useEffect, useState} from 'react';
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../types/Types";
import {ChangeUserDataModal} from "../../components/modalWindow/ChangeUserDataModal";
import {FlexColumn, FlexRow} from "../../components/default/Flex.styled";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";
import {UserProfileData} from "./UserProfileData";
import {AuthContext} from "../../App";
import {Styled as S} from "./UserProfile.styled";

export const UserProfile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [userDataModal, setUserDataModal] = useState(false);


    const myProfile = useCallback(() =>{
        navigate('/user/' + user.id);
    },[navigate])

    const myPlugins = useCallback(() =>{
        navigate('/user/' + user.id + '/plugins');
    },[navigate])

    const handleOpenModal = useCallback(() =>{
        setUserDataModal(true);
    }, [setUserDataModal])

    return (
        <div>
            <PluginViewHeader/>
            <div className={["container"].join(' ')}>
                <FlexRow style={{marginTop: "120px"}}>
                    <S.LeftMenu>
                        <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"} onClick={myProfile}>
                            Profile
                        </S.MenuBtn>

                        <S.MenuBtn onClick={myPlugins}>
                            Plugins
                        </S.MenuBtn>
                    </S.LeftMenu>

                    <S.PhotoBlock>
                        <ImgComponent style={{width: "250px", aspectRatio: "1/1", margin: "10px auto"}}
                                      func={Api.previewByPluginId(0)}></ImgComponent>
                    </S.PhotoBlock>

                    <UserProfileData userData={user} onOpenModal={handleOpenModal}/>
                </FlexRow>
            </div>
            <MyFooter/>
            {userDataModal ?
                <ChangeUserDataModal
                    userData={user}
                    onChangeUserData={setUser}
                    opened={userDataModal}
                    setOpened={setUserDataModal}
                /> : <></>
            }
        </div>
    );
};