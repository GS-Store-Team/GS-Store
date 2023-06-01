import React, {createContext, useCallback, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routes/AppRouter";
import Api from "./API/Api";

export const AuthContext = createContext();

function useCredentials(){
    const [isAuth, setIsAuth] = useState(() => {
        return sessionStorage.getItem('token') !== null
    });
    const [user, setUser] = useState({
        active: true,
        description: '',
        email: '',
        id: 1,
        image: '',
        nickName: '',
        phoneNumber: '',
        role: 'USER',
    })

    useEffect(() =>{
        window.dispatchEvent(new Event('storage'))

        if(!isAuth) return;

        Api.getCurrentUser().then((response) => {
            setUser(response.data)
        })
    }, [isAuth])

    const setAuth = useCallback( (value) => {
        if(value === false) sessionStorage.removeItem("token")
        setIsAuth(value)
    }, [])

    useEffect(() => {
        const handleLogout = () => setAuth(false)
        window.addEventListener('logout', handleLogout)
        return () => window.removeEventListener('logout', handleLogout)
    },[setAuth])

    return{
        isAuth,
        setAuth,
        user,
        setUser,
    }
}

export const App = () => {
    window.dispatchEvent(new Event('storage'))

  return <AuthContext.Provider value={useCredentials()}>
            <AppRouter />
         </AuthContext.Provider>;
}