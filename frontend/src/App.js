import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routes/AppRouter";
import {AuthContext} from "./context/context";
export const App = () => {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token') !== null)
            setAuth(true)
    }, [])

  return <AuthContext.Provider value={{ isAuth, setAuth }}>
            <AppRouter />
         </AuthContext.Provider>;
}