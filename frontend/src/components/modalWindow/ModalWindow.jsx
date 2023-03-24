import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";

import classes from "./modalwindow.module.css";

const ModalWindow = ({accept, decline}) => {
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

    return (
        <div>
            <div onClick={decline} className={classes.my__modal}></div>
            <div className={classes.my__modalInput}>
                <div className={classes.my__title}>
                    <div className={classes.my__heading}>Settings</div>
                </div>
                <div className={classes.my__info}>
                    <div>Nickname:</div>
                    <textarea className={classes.my__nameArea} value={userData.nickName}
                              placeholder={"nickname"} onChange={event =>
                        setUserData({...userData, nickName: event.target.value})}/>
                    <div>Nickname:</div>
                    <textarea className={classes.my__mailArea} value={userData.email}
                              placeholder={"mail"} onChange={event =>
                        setUserData({...userData, email: event.target.value})}/>
                    <div>Nickname:</div>
                    <textarea className={classes.my__contactsArea} value={userData.phoneNumber}
                              placeholder={"contacts"} onChange={event =>
                        setUserData({...userData, phoneNumber: event.target.value})}/>
                    <div>Nickname:</div>
                    <textarea className={classes.my__descriptionArea} value={userData.description}
                              placeholder={"description"} onChange={event =>
                        setUserData({...userData, description: event.target.value})}/>

                </div>
                <div className={classes.my__buttons}>
                    <div className={classes.my__decline} onClick={decline}>
                        <span style={{margin: "auto"}}>DECLINE</span>
                    </div>
                    <div className={classes.my__accept} onClick={() => accept(userData)}>
                        <span style={{margin: "auto"}}>ACCEPT</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalWindow;