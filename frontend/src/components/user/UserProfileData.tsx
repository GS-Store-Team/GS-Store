import React, {FC, useCallback, useContext, useMemo, useState} from 'react';
import {UserData} from "../../Types";
import {FlexColumn, FlexRow} from "../default/Flex.styled";
import {Styled as S} from "./User.styled";
import {Icon} from "../default/Icon";
import {AuthContext} from "../../App";
import {useNavigate} from "react-router-dom";

interface IUserProfileData{
    userData : UserData;
    onOpenModal: () => void;
}

export const UserProfileData : FC<IUserProfileData> = ({userData, onOpenModal}) => {
    return (
        <FlexColumn width={"500px"}>
            <FlexRow justifyContent={"flex-end"}>
                <Icon img={"settings"} onClick={onOpenModal} tooltip={{label:"Configure information about yourself"}}></Icon>
            </FlexRow>
            <S.UserInfo>
                <S.Title>Nickname:</S.Title>
                <S.Text>{userData.nickName}</S.Text>

                <S.Title>Mail:</S.Title>
                <S.Text>{userData.email}</S.Text>

                <S.Title>Contacts:</S.Title>
                <S.Text>{userData.phoneNumber}</S.Text>

                <S.Title>Description:</S.Title>
                <S.Text>{userData.description}</S.Text>
            </S.UserInfo>
        </FlexColumn>
    );
};

export const UserMenu: FC<{ chosen: number }> = React.memo(({chosen}) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClickProfile = useCallback(() => navigate('/user'),[navigate])
    const handleClickPlugins = useCallback(() => navigate('/user/plugins/uploaded'),[navigate])
    const handleClickDarci = useCallback(() => {},[])
    const handleClickModerate = useCallback(() => navigate('/moderate'),[navigate])
    const elements = useMemo(() => {
        const arr = [
            {label:"PROFILE", onClick:handleClickProfile},
            {label:"PLUGINS", onClick:handleClickPlugins},
            {label:"DARCI", onClick:handleClickDarci}
        ]
        if(user.role === 'ADMIN'){
            arr.push({label:"MODERATE", onClick:handleClickModerate})
        }
        return arr
        }, [handleClickProfile, handleClickPlugins, handleClickDarci, user.role, handleClickModerate])

    return(
        <S.UserMenu>
            {elements?.map((e, index) => <S.MenuElem key={index} onClick={e.onClick} chosen={index === chosen}>{e.label}</S.MenuElem>)}
        </S.UserMenu>
    )
})