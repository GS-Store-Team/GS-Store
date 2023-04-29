import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";

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

    return useMemo(() => [value, setValue], [value, setValue])
}