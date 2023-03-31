import React, {useEffect, useState} from 'react';
import classes from "./footer.module.css";
import {useNavigate} from "react-router-dom";
import Api from "../../API/Api";

export const MyFooter = () => {
    const navigate = useNavigate();
    const myNavigate = () =>{
        navigate(-1);
    }

    const [userData, setUserData] = useState({
        active: true,
        description: '',
        email: '',
        id: 1,
        image: 'abab',
        nickName: 'name1',
        phoneNumber: ''
    });

    useEffect(() => {
        Api.getCurrentUser().then((response) => {setUserData(response.data)});
    }, []);

    const myProfile = () =>{
        navigate('/user/' + userData.id);
    }

    return (
        <div className={classes.my_footer}>
            <div className={"container"}>
                <div className={classes.my__container}>
                        <div onClick={myNavigate}
                             className={classes.footer_text}>
                            Home
                        </div>
                        <div className={classes.footer_text}>
                            Contacts
                        </div>
                        <div onClick={myProfile}
                             className={classes.footer_text}>
                            Profile
                        </div>
                </div>
                <hr className={classes.my__hr}/>
                <p className={classes.my__footer__title}>(c) 2022 GS-Store Inc.</p>
            </div>
        </div>
    );
};

