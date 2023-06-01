import React, {useContext} from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import {AuthContext} from "../App";
import NoMatch from "./NoMatch";
import MainPage from "../pages/main/MainPage";
import PluginPage from "../pages/pluginview/PluginPage";
import {UserProfilePage} from "../pages/userprofile/UserProfilePage";
import {UserPluginUploaded} from "../pages/usersplugin/UserPluginUploaded";
import {UserPluginPurchased} from "../pages/usersplugin/UserPluginPurchased";
import {Login} from "../pages/login/Login";
import {SignUp} from "../pages/signup/SignUp";
import {PluginManagementList} from "../pages/management/PluginManagementList";
import {AboutUs} from "../pages/AboutUs";

const AppRouter = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={ !isAuth ? <Outlet/> : <Navigate to={"/main"}/>}>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"*"} element={<NoMatch path={"/login"}/>}/>
                </Route>

                <Route element={ isAuth ? <Outlet/> : <Navigate to={"/login"}/>}>
                    {/*ADMIN*/}
                    <Route path={"/moderate"} element={<PluginManagementList/>} />

                    {/*USER*/}
                    <Route path={"/main"} element={<MainPage/>} />
                    <Route path={"/main/:id"} element={<PluginPage/>}/>
                    <Route path={"/user/:id"} element={<UserProfilePage/>}/>
                    <Route path={"/user"} element={<UserProfilePage/>}/>
                    <Route path={"/user/plugins/uploaded"} element={<UserPluginUploaded/>}/>
                    <Route path={"/user/plugins/purchased"} element={<UserPluginPurchased/>}/>

                    <Route path={"/about"} element={<AboutUs/>}/>
                    <Route path={"*"} element={<NoMatch path={"/main"} />}/>
                </Route>
         </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;