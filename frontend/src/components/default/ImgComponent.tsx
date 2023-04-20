import React, {CSSProperties, FC, useEffect, useMemo, useState} from 'react';
import defaultImg from "../../UI/img/default.png";
import Loader from "../loading/Loader";
import classes from "./img.module.css";
import {Image} from "../../Types";

interface IImgComponent {
    func: Promise<any>;
}

const style = { width: "100%", objectFit: "cover", cursor: "pointer"} as CSSProperties
export const ImgComponent : FC<IImgComponent> = React.memo(({func}) => {
    const [fail, setFail] = useState(true);
    const [image, setImage] = useState<Image | null>(null)

    useEffect(() => {
        func.then(response => {
            if (response.status === 200) {
                setFail(false)
                setImage(response.data as Image)
            }
        })
    }, [func])

    return (
        fail?
            <img style={style} src={defaultImg} draggable={false} alt={"..."}/>
            :image === null?
                <Loader radius={8}/>
                :<img style={style} src={image?.image} draggable={false} alt={"..."}/>
    );
});
