import React, {FC} from 'react';
import {UserData} from "../../types/Types";
import {FlexColumn, FlexRow} from "../../components/default/Flex.styled";
import classes from "./userprofile.module.css";
import settingsButton from "../../UI/img/settings.png";
import {Styled as S} from "./UserProfileData.styled";

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
            <S.UserInfo>
                <S.Title>
                    Nickname:
                </S.Title>
                <S.Text>
                    {userData.nickName}
                </S.Text>

                <S.Title>
                    Mail:
                </S.Title>
                <S.Text>
                    {userData.email}
                </S.Text>

                <S.Title>
                    Contacts:
                </S.Title>
                <S.Text>
                    {userData.phoneNumber}
                </S.Text>

                <S.Title>
                    Description:
                </S.Title>
                <S.Text>
                    {userData.description}
                </S.Text>
            </S.UserInfo>
{/*            <div className={classes.my__nicknameInfo}>
                <div className={classes.my__nicknameText}>
                    Nickname:
                </div>
                <div className={classes.my__nickname}>
                    {userData.nickName}
                </div>
            </div>*/}
        </FlexColumn>
    );
};