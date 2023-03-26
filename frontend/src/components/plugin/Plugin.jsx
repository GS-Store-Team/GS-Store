import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from './plugin.module.css'
import {useNavigate} from "react-router-dom"
import Api from "../../API/Api";
import {ImgComponent} from "../ImgComponent/ImgComponent";
import star from './../../UI/img/star.png'

const Plugin = ({plugin}) => {
    const navigate = useNavigate();

    const [shown, setShown] = useState(true);

    const [previewImage] = useState(() => {
        return <ImgComponent func={Api.previewByPluginId(plugin.id)}/>
    })

    const myNavigate = useCallback(() =>{
        navigate('/main/' + plugin.id);
    }, [plugin])

    const handleEnter = useCallback(() => {
        setShown(false)
    }, [setShown])

    const handleLeave = useCallback(() => {
        setShown(true)
    }, [setShown])

    return(
        <div
            onClick={myNavigate}
            style={{padding: 0}}
            className={classes.my__plugin}>

            <div
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className={classes.inner__picture}>
                {previewImage}
                {
                    !shown &&
                    <div className={classes.my__description}>
                        <div style={{margin: "auto"}}>{plugin.shortDescription}</div>
                    </div>
                }
            </div>
            <div className={classes.info}>
                <div className={classes.title}>{plugin.name}</div>
                <div className={classes.mark}>
                    {plugin.mark}
                    <img className={classes.my__star}
                         src={star}
                         alt={".."}/>
                </div>
            </div>
        </div>
    )
};

export default Plugin;