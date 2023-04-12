import React, {CSSProperties, FC, useEffect, useState} from 'react';
import defaultImg from "../../UI/img/default.png";
import Loader from "../loading/Loader";
import classes from "./img.module.css";

interface IImgComponent {
    func: Promise<any>;
    style?: CSSProperties;
}

export const ImgComponent : FC<IImgComponent> = React.memo(({func, style}) => {

    const [fail, setFail] = useState(false);
    const [image, setImage] = useState(null)

    useEffect(() => {
        if(func !== undefined) {
            func.then((response) => {
                if (response.status === 200) {
                    setFail(false)
                    setImage(response.data)
                }
            })
        }
        setFail(true)
    }, [])

    return (
        <div style={style}>
            {fail?
            <img className={classes.my__image}
                 src={defaultImg}
                 alt={"..."}/>
            : image === null?
            <Loader radius={8}/>
            : <img className={classes.my__image}
                   src={image}
                   draggable={false}
                   alt={"..."}/>}
        </div>
    );
});
