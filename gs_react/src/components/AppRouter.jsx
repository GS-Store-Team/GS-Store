import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import PluginPage from "../pages/plaginpage/PluginPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/main"} element={<Main />} />
                <Route path={"/main/:id"} element={<PluginPage />} />
                <Route path={"/hello"} element={<h1> HELLO </h1>}/>
                <Route path={"/*"} element={<Main />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
