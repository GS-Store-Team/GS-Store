import React, {createContext, useCallback, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routes/AppRouter";
import Api from "./API/Api";

export const AuthContext = createContext();
export const App = () => {
    window.dispatchEvent(new Event('storage'))

    const userCredentials = useCallback(() => {
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
            phoneNumber: ''
        })

        useEffect(() =>{
            window.dispatchEvent(new Event('storage'))

            if(!isAuth) return;

            Api.getCurrentUser().then((response) => {
                setUser(response.data)
            })
        }, [isAuth])

        const setAuth = useCallback((value) => {
            if(value === false) sessionStorage.clear()
            setIsAuth(value)
        }, [])

        return{
            isAuth,
            setAuth,
            user,
            setUser,
        }
    }, [window])

  return <AuthContext.Provider value={userCredentials()}>
            <AppRouter />
         </AuthContext.Provider>;
}