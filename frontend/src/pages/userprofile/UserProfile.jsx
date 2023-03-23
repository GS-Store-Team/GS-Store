import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";
import settingsButton from "./../../UI/img/settings.png"
import classes from "./userprofile.module.css";
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import ModalWindow from "../../components/modalWindow/ModalWindow";
import {useNavigate} from "react-router-dom";


const UserProfile = () => {
    const [visibleModal, setVisibleModal] = useState(false);

    const [userData, setUserData] = useState({
        nickName: '',
        email: '',
        phoneNumber: '',
        description: '',
        image: 0,
        id: 1,
        active: true
    });

    useEffect(() => {
        Api.getUser().then((response) => {setUserData(response.data)});
    }, []);

    const sendData = (newUserData) =>{
        Api.changeUserData(newUserData)
            .then(() => {Api.getUser().then((response) =>
            {
                setUserData(response.data);
                console.log(response.data)})})
        setVisibleModal(false);
    }

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
                            <ImgComponent func={Api.previewByPluginId(0)}></ImgComponent>
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
                        <img onClick={() => setVisibleModal(true)} className={classes.my__settingsButton}
                             src={settingsButton}
                             alt={".."}/>
                    </div>
                    {visibleModal ?
                        <ModalWindow accept={sendData} decline={() => {setVisibleModal(false)}}/>
                            : <></>}
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};

export default UserProfile;


