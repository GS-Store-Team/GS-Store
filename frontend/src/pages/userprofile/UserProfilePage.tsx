import React, {useCallback, useContext, useState} from 'react';
import {MyFooter} from "../../components/footer/MyFooter";
import {useNavigate} from "react-router-dom";
import {ChangeUserDataModal} from "../../components/modalWindow/ChangeUserDataModal";
import {FlexRow} from "../../components/default/Flex.styled";
import {UserMenu, UserProfileData} from "../../components/user/UserProfileData";
import {AuthContext} from "../../App";
import {Styled as Sp} from "../Pages.styled";
import {Container} from "react-bootstrap";
import {ImgBlock} from "../../components/image/ImgBlock/ImgBlock";
import {Header} from "../../components/header/Header";
import {Filter} from "../../Types";
import {defaultFilter} from "../../DefaultObjects";

export const UserProfilePage = () => {
    const [filter, setFilter] = useState<Filter>(defaultFilter);
    const { user, setUser } = useContext(AuthContext);
    const [userDataModal, setUserDataModal] = useState(false);

    const handleOpenModal = useCallback(() =>{
        setUserDataModal(true);
    }, [setUserDataModal])

    return (
        <Sp.Wrapper>
            <Header filter={filter} onChangeFilter={setFilter}/>
            <Sp.Main>
                <Container>
                    <FlexRow style={{marginTop: "20px"}} gap={"1em"}>
                        <UserMenu chosen={0}/>
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