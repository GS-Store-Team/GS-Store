import React from 'react';
import Main from "../pages/Main";
import PluginPage from "../pages/plaginpage/PluginPage";
import Login from "../security/Login";
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
