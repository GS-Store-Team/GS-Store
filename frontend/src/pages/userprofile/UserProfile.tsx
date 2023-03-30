import React, {useCallback, useEffect, useState} from 'react';
import Api from "../../API/Api";
import settingsButton from "./../../UI/img/settings.png"
import classes from "./userprofile.module.css";
import {MyFooter} from "../../components/footer/MyFooter";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../types/Types";
import {ChangeUserDataModal} from "../../components/modalWindow/ChangeUserDataModal";
import {FlexColumn, FlexRow} from "../../components/default/Flex.styled";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";
import {UserProfileData} from "./UserProfileData";
import {Styled as S} from "./UserProfile.styled";
import {Btn} from "../../components/default/Btn";


export const UserProfile = () => {
    const navigate = useNavigate();

    const [userDataModal, setUserDataModal] = useState(false);

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

    const handleOpenModal = useCallback(() =>{
        setUserDataModal(true);
    }, [setUserDataModal])

    return (
        <div>
            <PluginViewHeader/>
            <div className={[classes.my__profile, "container"].join(' ')}>
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

                    <UserProfileData userData={userData} onOpenModal={handleOpenModal}/>
                </FlexRow>
            </div>
            <MyFooter/>
            {userDataModal ?
                <ChangeUserDataModal
                    userData={userData}
                    onChangeUserData={setUserData}
                    opened={userDataModal}
                    setOpened={setUserDataModal}
                /> : <></>
            }
        </div>
    );
};