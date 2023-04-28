import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";

export const useSessionState = <V>(key: string, defaultValue: V, fetch? : Promise<any>): [V, Dispatch<SetStateAction<V>>] => {
    const [value, setValue] = useState<V>(() => {
        const val = sessionStorage.getItem(key)

        if(val) return JSON.parse(val)
        return defaultValue
    })

    useEffect(() => {
        if(!fetch || sessionStorage.getItem(key)) return
        fetch.then(response => setValue(response.data))
    }, [])

    useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    // const setState : Dispatch<SetStateAction<V>> = useCallback((action: SetStateAction<V>) => {
    //     setValue(action)
    //     console.log(action)
    //     if(typeof action === "function")
    //         window.sessionStorage.setItem(key, JSON.stringify(action(pre)))
    //         else
    //
    // }, [key])

    return useMemo(() => [value, setValue], [value, setValue])
}