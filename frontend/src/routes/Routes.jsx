import React from 'react';
import Main from "../pages/main/Main";
import PluginPage from "../pages/pluginview/PluginPage";
import {Login} from "../pages/login/Login";
import NoMatch from "./NoMatch";
import {SignUp} from "../pages/signup/SignUp";
import UserProfile from "../pages/userprofile/UserProfile";

export const privateRoutes = [
    {path:"/main", component: <Main/>},
    {path:"/main/:id", component: <PluginPage/>},
    {path:"/user/:id", component: <UserProfile/>},
    {path:"*", component: <NoMatch path={"/main"}/>},
]

export const publicRoutes = [
    {path:"/login", component: <Login />},
    {path:"/signup", component: <SignUp />},
    {path:"*", component: <NoMatch path={"/login"} />},
]
