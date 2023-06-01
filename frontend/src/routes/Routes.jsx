import React from 'react';
import MainPage from "../pages/main/MainPage";
import PluginPage from "../pages/pluginview/PluginPage";
import {Login} from "../pages/login/Login";
import NoMatch from "./NoMatch";
import {SignUp} from "../pages/signup/SignUp";
import {UserProfilePage} from "../pages/userprofile/UserProfilePage";
import {UserPluginUploaded} from "../pages/usersplugin/UserPluginUploaded";
import {UserPluginPurchased} from "../pages/usersplugin/UserPluginPurchased";


export const adminRoutes = [
    {path:"/m", component: <div>ADMIN</div>},
]

export const userRoutes = [
    {path:"/main", component: <MainPage/>},
    {path:"/main/:id", component: <PluginPage/>},
    {path:"/user/:id", component: <UserProfilePage/>},
    {path:"/user", component: <UserProfilePage/>},
    {path:"/user/plugins/uploaded", component: <UserPluginUploaded/>},
    {path:"/user/plugins/purchased", component: <UserPluginPurchased/>},
]
export const publicRoutes = [
    {path:"/login", component: <Login />},
    {path:"/signup", component: <SignUp />},
    {path:"*", component: <NoMatch path={"/login"} />},
]
