import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import {AuthContext} from "../../App";


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

    return (
        <div>
            <PluginViewHeader/>
            <div className={[classes.my__profile, "container"].join(' ')}>
                <FlexRow margin={"100px 0 0 0"}>
                    <div className={["col-1", classes.my__menu].join(' ')}>
                        <button type={"button"} className={classes.my__profileButton} onClick={myProfile}>
                            Profile
                        </button>
                        <button type={"button"} className={classes.my__pluginsButton} onClick={myPlugins}>
                            Plugins
                        </button>
                    </div>

                    <div className={["col-5", classes.my__photo].join(' ')}>
                        <div className={classes.my__img}>
                            <ImgComponent func={Api.previewByPluginId(0)}></ImgComponent>
                        </div>
                    </div>

                    <UserProfileData  userData={user}/>
                    <div className={["col-1", classes.my__button].join(' ')}>
                        <img onClick={() => setUserDataModal(true)} className={classes.my__settingsButton}
                             src={settingsButton}
                             alt={".."}/>
                    </div>
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