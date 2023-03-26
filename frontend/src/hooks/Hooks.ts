import {ElementRef, RefObject, useEffect, useLayoutEffect, useRef} from "react";

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
        document.addEventListener("click", clickHandler)
        return () => {
            document.removeEventListener("click", clickHandler);
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