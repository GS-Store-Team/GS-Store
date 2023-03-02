import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";
import classes from "./userprofile.module.css";
import {UserHeader} from "../../components/header/UserHeader"
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";

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
            <UserHeader/>
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

                    <div className={["col-6", classes.my__info].join(' ')}>
                        <form id="the_form">
                            <div className={classes.my__name}>
                                <textarea className={classes.my__nameArea} value={userData.nickName}
                                          disabled={true} onChange={event =>
                                    setUserData({...userData, nickName: event.target.value})}/>
                            </div>

                            <div className={classes.my__mail}>
                                <textarea className={classes.my__mailArea} value={userData.email}
                                          disabled={true} onChange={event =>
                                    setUserData({...userData, email: event.target.value})}/>
                            </div>

                            <div className={classes.my__contacts}>
                                <textarea className={classes.my__contactsArea} value={userData.phoneNumber}
                                          disabled={true} onChange={event =>
                                    setUserData({...userData, phoneNumber: event.target.value})}/>
                            </div>

                            <div className={classes.my__description}>
                                <textarea className={classes.my__descriptionArea} value={userData.description}
                                          disabled={true} onChange={event =>
                                    setUserData({...userData, description: event.target.value})}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};

export default UserProfileView;


