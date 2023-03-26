import React, {useEffect, useState} from 'react';
import defaultImg from "../../UI/img/default.png";
import Loader from "../loading/Loader";
import classes from "./img.module.css";


export const ImgComponent = React.memo(({func}) => {

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
