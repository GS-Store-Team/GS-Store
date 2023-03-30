import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {UserData} from "../../types/Types";
import {FlexColumn, FlexRow} from "../../components/default/Flex.styled";
import classes from "./userprofile.module.css";
import settingsButton from "../../UI/img/settings.png";

interface IUserProfileData{
    userData : UserData;
    onOpenModal: () => void;
}

export const UserProfileData : FC<IUserProfileData> = ({userData, onOpenModal}) => {
    return (
        <FlexColumn width={"500px"}>
            <FlexRow margin={"10px 0 20px"}>
                <img style={{width: "24px", aspectRatio: "1/1", marginLeft: "auto"}}
                     onClick={onOpenModal} className={classes.my__settingsButton}
                     src={settingsButton}
                     alt={".."}/>
            </FlexRow>
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
        </FlexColumn>
    );
};