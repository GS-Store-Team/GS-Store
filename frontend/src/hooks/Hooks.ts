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

export function useLatest(value : any){
    const valueRef = useRef(value);

    useLayoutEffect(() => {
        valueRef.current = value;
    }, [value])

    return valueRef;
}