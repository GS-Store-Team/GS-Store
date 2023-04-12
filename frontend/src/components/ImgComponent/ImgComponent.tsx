import React, {FC, useEffect, useState} from 'react';
import defaultImg from "../../UI/img/default.png";
import Loader from "../loading/Loader";
import classes from "./img.module.css";

interface IImgComponent {
    func: Promise<any>;
}

export const ImgComponent : FC<IImgComponent> = React.memo(({func}) => {

    const [fail, setFail] = useState(true);
    const [image, setImage] = useState(null)

    useEffect(() => {
        if(!func) return;
        func.then((response) => {
            if (response.status === 200) {
                setFail(false)
                setImage(response.data)
            }
        })
    }, [])

    return (
        fail?
        <img className={classes.my__image}
             src={defaultImg}
             alt={"..."}/>
        : image === null?
        <Loader radius={8}/>
        : <img className={classes.my__image}
               src={image}
               draggable={false}
               alt={"..."}/>
    );
});
