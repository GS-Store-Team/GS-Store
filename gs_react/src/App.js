import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routes/AppRouter";
import Header from "./components/header/Header";
import {AuthContext} from "./context/context";

const App = () => {
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        if(localStorage.getItem('auth'))
            setAuth(true);
        setLoading(false);
    }, []);

  return <AuthContext.Provider value={{isAuth, setAuth, isLoading}}>
            <Header />
            <AppRouter />
         </AuthContext.Provider>;
}

export default App;
