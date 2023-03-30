import {RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {UserData} from "../types/Types";
import Api from "../API/Api";

export function useOutsideClick(ref : RefObject<any>, handler : () => void, attached : boolean = true){
    const latestHandler = useLatest(handler);

    useEffect(() => {
        if(!attached) return;
        const clickHandler = (e : Event) => {
            if(!ref.current) return;
            if(!ref.current.contains(e.target)){
                latestHandler.current();
            }
        }
        document.addEventListener("mousedown", clickHandler)
        return () => {
            document.removeEventListener("mousedown", clickHandler);
        }
    },[ref, latestHandler, attached])
}

// export function useSessionState<T>() : [T, (key : string, newValue : T) => void]{
//
//     const getValue = () : T => {
//         sessionStorage.getItem("")
//
//         return
//     }
//
//     return
// }

// export const [useUserCredentials,] = useState<UserData>(() => {
//     return {
//         nickName: 'null',
//         email: 'null',
//         phoneNumber: 'null',
//         description: 'null',
//         image: -1,
//         id: -1,}
//
//     // Api.getUser().then((response) => {
//     //         ref.current = response.data as UserData
//     //     }
//     // )
//
// })

export const useUserCredentials = async (): Promise<UserData> => {
    let userData = sessionStorage.getItem("userData");

    if (userData) return JSON.parse(userData);

    const response = await Api.getCurrentUser();

    userData = response.data

    sessionStorage.setItem("userData", JSON.stringify(userData))

    return new Promise<UserData>(JSON.parse(userData ? userData : ""))
}

export function useLatest(value : any){
    const valueRef = useRef(value);

    useLayoutEffect(() => {
        valueRef.current = value;
    }, [value])

    return valueRef;
}