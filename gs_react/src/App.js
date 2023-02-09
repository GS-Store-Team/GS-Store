import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routes/AppRouter";
import {AuthContext} from "./context/context";
export const App = () => {
    const [isAuth, setAuth] = useState(true);
    //const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        if(localStorage.getItem('auth'))
            setAuth(true);
        setLoading(false);
    }, []);

  return <AuthContext.Provider value={{isAuth, setAuth, isLoading}}>
            <AppRouter />
         </AuthContext.Provider>;
}