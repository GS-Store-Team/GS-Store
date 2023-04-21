import React, {useCallback, useContext, useState} from 'react';
import {MyFooter} from "../../components/footer/MyFooter";
import {useNavigate} from "react-router-dom";
import {ChangeUserDataModal} from "../../components/modalWindow/ChangeUserDataModal";
import {FlexRow} from "../../components/default/Flex.styled";
import {UserProfileData} from "./UserProfileData";
import {AuthContext} from "../../App";
import {Styled as S} from "./UserProfile.styled";
import {Styled as Sp} from "../Pages.styled";
import {Container} from "react-bootstrap";
import {ImgBlock} from "../../components/ImgBlock/ImgBlock";
import {Header} from "../../components/header/Header";

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
            <Header/>
            <Sp.Main>
                <Container>
                    <FlexRow style={{marginTop: "20px"}}>
                        <S.LeftMenu>
                            <S.MenuBtn $backgroundColor={"rgba(217, 217, 217, 0.23)"} onClick={myProfile}>
                                Profile
                            </S.MenuBtn>

                            <S.MenuBtn onClick={myPlugins}>
                                Plugins
                            </S.MenuBtn>
                        </S.LeftMenu>

                        {user.images && <ImgBlock imageRefs={user.images} />}

                        <UserProfileData userData={user} onOpenModal={handleOpenModal}/>
                    </FlexRow>
                </Container>
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