import React, {useCallback, useContext, useState} from 'react';
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import {useNavigate} from "react-router-dom";
import {ChangeUserDataModal} from "../../components/modalWindow/ChangeUserDataModal";
import {FlexRow} from "../../components/default/Flex.styled";
import {ImgComponent} from "../../components/default/ImgComponent";
import {UserProfileData} from "./UserProfileData";
import {AuthContext} from "../../App";
import {Styled as S} from "./UserProfile.styled";
import {Styled as Sp} from "../Pages.styled";

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
        <Sp.Wrapper>
            <PluginViewHeader/>
            <Sp.Main>
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
                            <div style={{width: "250px"}}>
                                <ImgComponent func={Api.previewByPluginId(0)}></ImgComponent>
                            </div>
                        </S.PhotoBlock>

                        <UserProfileData userData={user} onOpenModal={handleOpenModal}/>
                    </FlexRow>
                </div>
            </Sp.Main>
            <MyFooter/>
            {userDataModal ?
                <ChangeUserDataModal
                    userData={user}
                    onChangeUserData={setUser}
                    opened={userDataModal}
                    setOpened={setUserDataModal}
                /> : <></>
            }
        </Sp.Wrapper>
    );
};