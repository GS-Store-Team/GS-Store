import React, {FC, useCallback, useContext} from 'react';
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../../App";
import {Icon} from "../default/Icon";
import {Styled as S} from "./Header.styled"
import {Tooltip} from "../default/Tooltip";

export const ProfileTab = () => {
    const navigate = useNavigate();
    const { setAuth, user } = useContext(AuthContext);

    const logout = useCallback(() => {
        setAuth(false);
    }, [])

    const myProfile = useCallback( () =>{
        navigate('/user/' + user.id);
    },[navigate])

    const registrationOnLicenseServer = useCallback( () =>{
        navigate('/user/license');
    },[navigate])

    return (
        <S.Tab style={{width: "182px"}}>
            <Icon img={"man"} style={{margin: "0 5px 0 0"}} tooltip={{label:"My profile", placement:"bottom"}} onClick={myProfile}></Icon>
            <Tooltip label={user.nickName} disable={user.nickName.length<9}>
                <S.TabText style={{maxWidth: "80px"}} onClick={myProfile}>{user.nickName}</S.TabText>
            </Tooltip>
            <span style={{padding: "0 2px 0 0"}}>
            {user.isDarciUser ?
                <Icon img={"auth"} nonClickable tooltip={{label: "Registration on the license server passed"}}></Icon>
                :<Icon img={"not-auth"} onClick={registrationOnLicenseServer} tooltip={{label: "Register on the license server"}}></Icon>
            }
            </span>
            <Icon img={"line"} style={{width:"1px"}} nonClickable></Icon>
            <Icon img={"exit"} style={{margin: "0 0 0 5px"}} tooltip={{label:"Logout", placement:"bottom"}} onClick={logout}></Icon>
        </S.Tab>
    );
};

interface ILogoTab{
    onClick: () => void
}

export const LogoTab: FC<ILogoTab> = ({onClick}) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => navigate("/main"),[])

    return (
        <S.Tab onClick={onClick}>
            <span onClick={(e) => e.stopPropagation()}>
                <Icon style={{opacity: 1}} size={40} img={"logo"} tooltip={{label: "GS-Store - software plugin store"}} onClick={handleClick}/>
            </span>
            <Tooltip label={"Back to previous page"}>
                <S.TabText style={{fontSize: "22px", padding: "0 5px"}}>GS-Store</S.TabText>
            </Tooltip>
        </S.Tab>
    );
};