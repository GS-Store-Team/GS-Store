import React, {useEffect, useState} from 'react';
import defaultImg from "../../UI/img/default.png";
import Loader from "../loading/Loader";
import classes from "./img.module.css";

export const ImgComponent = ({func}) => {

    const [imageLoad, setImageLoad] = useState(null);
    const [fail, setFail] = useState(false);

    useEffect(()=>{
        func.then((response) => {
            if(response.status === 200)
                setImageLoad(response.data);
            else
                setFail(true);
        }).catch((e) =>{
            setFail(true);
        })
    });
    return (
        fail?
            <img className={classes.my__image}
                 src={defaultImg}
                 alt={"..."}/>
            : imageLoad === null? <Loader size={6}/>:
                <img className={classes.my__image}
                     src={imageLoad}
                     alt={"..."}/>
    );
};