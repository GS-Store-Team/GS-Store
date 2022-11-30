import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../pages/Main";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/main"} element={<Main />} />
                <Route path={"/hello"} element={<h1> HELLO </h1>}/>
                <Route path={"/*"} element={<Main />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
