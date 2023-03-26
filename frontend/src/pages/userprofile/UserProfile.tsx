import React, {useState, useEffect, useCallback} from 'react';
import Api from "../../API/Api";
import settingsButton from "./../../UI/img/settings.png"
import classes from "./userprofile.module.css";
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import ChangeProfileModal from "../../components/modalWindow/ChangeProfileModal";
import {useNavigate} from "react-router-dom";
import {Btn} from "../../components/default/Btn";
import {Modal} from "../../components/default/Modal";
import {UserData} from "../../interfaces/Types";
import {ChangeUserDataModal} from "../../components/modalWindow/ChangeUserDataModal";


const UserProfile = () => {
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
        Api.getUser().then((response) => {setUserData(response.data)});
    }, []);

    const navigate = useNavigate();
    const myProfile = () =>{
        navigate('/user/' + userData.id);
    }
    const myPlugins = () =>{
        navigate('/user/' + userData.id + '/plugins');
    }

    return (
        <div>
            <PluginViewHeader/>
            <div className={[classes.my__profile, "container"].join(' ')}>
                <div className={"row"}>
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
                            {/*<ImgComponent func={Api.previewByPluginId(0)}></ImgComponent>*/}
                        </div>
                    </div>

                    <div className={["col-5", classes.my__info].join(' ')}>
                        <div className={classes.my__nicknameInfo}>
                            <div className={classes.my__nicknameText}>
                                Nickname:
                            </div>
                            <div className={classes.my__nickname}>
                                {userData.nickName}
                            </div>
                        </div>

                        <div className={classes.my__mailInfo}>
                            <div className={classes.my__mailText}>
                                Mail:
                            </div>
                            <div className={classes.my__mail}>
                                {userData.email}
                            </div>
                        </div>

                        <div className={classes.my__contactsInfo}>
                            <div className={classes.my__contactsText}>
                                Contacts:
                            </div>
                            <div className={classes.my__contacts}>
                                {userData.phoneNumber}
                            </div>
                        </div>

                        <div className={classes.my__descriptionInfo}>
                            <div className={classes.my__descriptionText}>
                                Description:
                            </div>
                            <div className={classes.my__description}>
                                {userData.description}
                            </div>
                        </div>
                    </div>

                    <div className={["col-1", classes.my__button].join(' ')}>
                        <img onClick={() => setUserDataModal(true)} className={classes.my__settingsButton}
                             src={settingsButton}
                             alt={".."}/>
                    </div>
                    {userDataModal ?
                        <ChangeUserDataModal
                            userData={userData}
                            onChangeUserData={setUserData}
                            opened={userDataModal}
                            setOpened={setUserDataModal}
                        /> : <></>
                    }
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};

export default UserProfile;


