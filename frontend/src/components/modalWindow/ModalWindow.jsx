import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";

import classes from "./modalwindow.module.css";

const ModalWindow = ({accept, decline}) => {
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
        Api.getUser().then((response) => {setUserData(response.data)});
    }, []);

    return (
        <div>
            <div onClick={decline} className={classes.my__modal}></div>
            <div className={classes.my__modalInput}>
                <div className={classes.my__title}>Settings</div>
                <div className={classes.my__info}>
                    <textarea className={classes.my__nameArea} value={userData.nickName}
                              placeholder={"nickname"} onChange={event =>
                        setUserData({...userData, nickName: event.target.value})}/>
                    <textarea className={classes.my__mailArea} value={userData.email}
                              placeholder={"mail"} onChange={event =>
                        setUserData({...userData, email: event.target.value})}/>
                    <textarea className={classes.my__contactsArea} value={userData.phoneNumber}
                              placeholder={"contacts"} onChange={event =>
                        setUserData({...userData, phoneNumber: event.target.value})}/>
                    <textarea className={classes.my__descriptionArea} value={userData.description}
                              placeholder={"description"} onChange={event =>
                        setUserData({...userData, description: event.target.value})}/>


                    <div className={classes.my__buttons}>
                        <button className={classes.my__accept} onClick={accept}>
                            accept
                        </button>
                        <button className={classes.my__decline} onClick={decline}>
                            decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalWindow;