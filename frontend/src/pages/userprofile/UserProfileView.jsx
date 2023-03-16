import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";
import classes from "./userprofile.module.css";
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";

const UserProfileView = (id) => {
    const [userData, setUserData] = useState({
        active: true,
        description: '',
        email: '',
        id: 1,
        image: 'abab',
        nickName: '',
        phoneNumber: ''
    });

    useEffect(() => {
        Api.getUserById(id).then((response) => {setUserData(response.data)});
    }, []);

    return (
        <div>
            <PluginViewHeader/>
            <div className={[classes.my__profile, "container"].join(' ')}>
                <div className={"row"}>
                    <div className={["col-1", classes.my__menu].join(' ')}>
                        <button type={"button"} className={classes.my__profileButton}>
                            Profile
                        </button>
                        <button type={"button"} className={classes.my__pluginsButton}>
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
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};
export default UserProfileView;


