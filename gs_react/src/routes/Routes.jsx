import React from 'react';
import Main from "../pages/main/Main";
import PluginPage from "../pages/pluginview/PluginPage";
import Login from "../pages/login/Login";
import NoMatch from "./NoMatch";

export const privateRoutes = [
    {path:"/main", component: <Main/>},
    {path:"/main/:id", component: <PluginPage/>},
    {path:"*", component: <NoMatch path={"/main"}/>},
]

export const publicRoutes = [
    {path:"/login", component: <Login />},
    {path:"*", component: <NoMatch path={"/login"} />},
]
