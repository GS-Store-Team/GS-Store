import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routes/AppRouter";
import {AuthContext} from "./context/context";
import {MyFooter} from "./components/footer/MyFooter";

export const App = () => {
    const [isAuth, setAuth] = useState(true);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        if(localStorage.getItem('auth'))
            setAuth(true);
        setLoading(false);
    }, []);

  return <AuthContext.Provider value={{isAuth, setAuth, isLoading}}>
            <AppRouter />
            <MyFooter />
         </AuthContext.Provider>;
}