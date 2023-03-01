import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";
import classes from "./userprofile.module.css";
import {Header} from "../../components/header/Header";
import {MyFooter} from "../../components/footer/MyFooter";
import defaultImg from "../../UI/img/default.png";
import {BareHeader} from "../../components/header/BareHeader";
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
            <Header/>
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
                            <textarea className={classes.my__name} value={userData.nickName}
                                      disabled={disable} onChange={event => setUserData({...userData, nickName: event.target.value})}/>

                            <textarea className={classes.my__mail} value={userData.email}
                                      disabled={disable} onChange={event => setUserData({...userData, email: event.target.value})}/>

                            <textarea className={classes.my__contacts} value={userData.phoneNumber}
                                      disabled={disable} onChange={event => setUserData({...userData, phoneNumber: event.target.value})}/>

                            <textarea className={classes.my__description} value={userData.description}
                                      disabled={disable} onChange={event => setUserData({...userData, description: event.target.value})}/>

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


