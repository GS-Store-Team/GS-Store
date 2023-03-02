import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";
import classes from "./userprofile.module.css";
import {UserHeader} from "../../components/header/UserHeader"
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";

const UserProfile = () => {
    const [userData, setUserData] = useState({
        active: true,
        description: '',
        email: '',
        id: 1,
        image: 'abab',
        nickName: '',
        phoneNumber: ''
    });

    const [disable, setDisable] = useState("disable");

    useEffect(() => {
        Api.getUser().then((response) => {setUserData(response.data)});
    }, []);

    useEffect(() => {
        if (disable === "disable") {
            Api.changeUserData(userData)
                .then((response) => {console.log(response)})
                .catch((response) => {console.log(response)});
            console.log(userData);
        }

        },[disable]);

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
{/*                        <div className={classes.my__changeImg}>
                            change
                        </div>*/}
                    </div>

                    <div className={["col-6", classes.my__info].join(' ')}>
                        <form id="the_form">
                            <div className={classes.my__name}>
                                {(disable === null) &&
                                    <div className={classes.my__nameText}>
                                        name
                                    </div>
                                }
                                <textarea className={classes.my__nameArea} value={userData.nickName}
                                          disabled={disable} onChange={event =>
                                    setUserData({...userData, nickName: event.target.value})}/>
                            </div>


                            <div className={classes.my__mail}>
                                {(disable === null) &&
                                    <div className={classes.my__mailText}>
                                        mail
                                    </div>
                                }
                                <textarea className={classes.my__mailArea} value={userData.email}
                                          disabled={disable} onChange={event =>
                                    setUserData({...userData, email: event.target.value})}/>
                            </div>

                            <div className={classes.my__contacts}>
                                {(disable === null) &&
                                    <div className={classes.my__contactsText}>
                                        contacts
                                    </div>
                                }


                                <textarea className={classes.my__contactsArea} value={userData.phoneNumber}
                                          disabled={disable} onChange={event =>
                                    setUserData({...userData, phoneNumber: event.target.value})}/>
                            </div>

                            <div className={classes.my__description}>
                                {(disable === null) &&
                                    <div className={classes.my__descriptionText}>
                                        description
                                    </div>
                                }

                                <textarea className={classes.my__descriptionArea} value={userData.description}
                                          disabled={disable} onChange={event =>
                                    setUserData({...userData, description: event.target.value})}/>
                            </div>

                            <button type={"button"} className={classes.my__button}
                                    onClick={_ => setDisable(disable !== null ? null : "disable")}>
                                {disable !== null ? "edit" : "apply"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};

export default UserProfile;


