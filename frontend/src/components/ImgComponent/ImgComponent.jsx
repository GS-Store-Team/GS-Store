import React, {useEffect, useState} from 'react';
import defaultImg from "../../UI/img/default.png";
import Loader from "../loading/Loader";
import classes from "./img.module.css";

export const ImgComponent = ({func}) => {

    const [imageLoad, setImageLoad] = useState(null);
    const [fail, setFail] = useState(false);

    useEffect(()=>{
        if(func !== undefined)
            func.then((response) => {
                if(response.status === 200)
                    setImageLoad(response.data);
                else
                    setFail(true);
            }).catch((e) =>{
                setFail(true);
            })
        else setFail(true);
    });
    return (
        fail?
            <img className={classes.my__image}
                 src={defaultImg}
                 alt={"..."}/>
            : imageLoad === null? <Loader radius={8}/>:
                <img className={classes.my__image}
                     src={imageLoad}
                     alt={"..."}/>
    );
};