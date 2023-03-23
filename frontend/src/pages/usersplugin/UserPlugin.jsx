import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import classes from "./userplugin.module.css";
import {useNavigate} from "react-router-dom";
import plusButton from "../../UI/img/plus.png";

const UserPlugin = () => {

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

    const navigate = useNavigate();
    const myProfile = () =>{
        navigate('/user/' + userData.id);
    }
    const myPlugins = () =>{
        navigate('/user/' + userData.id + '/plugins');
    }

    const newPlugin = () =>{
        navigate('/user/' + userData.id + '/upload');
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
                    <div className={["col-10", classes.my__plugins].join(' ')}>
                        {/*request from server to get user plugins*/}
                        no plugins
                    </div>
                    <div className={["col-1", classes.my__button].join(' ')}>
                        <img onClick={newPlugin} className={classes.my__plusButton}
                             src={plusButton}
                             alt={".."}/>
                    </div>
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};

export default UserPlugin;


