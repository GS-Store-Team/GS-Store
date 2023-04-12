import React, {useContext} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./Routes";
import {AuthContext} from "../App";

const AppRouter = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <BrowserRouter>
         <Routes>
         {
             isAuth?
                 privateRoutes.map((r,index) =>
                     <Route
                         path={r.path}
                         element={r.component}
                         key={index}
                     /> )
             :
                 publicRoutes.map((r,index) =>
                     <Route
                         path={r.path}
                         element={r.component}
                         key={index}
                     />)
         }
         </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
