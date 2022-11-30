import React, {useState} from 'react';
import classes from './plugin.module.css'
import {useNavigate} from "react-router-dom"

const Plugin = ({plugin}) => {
    const [shown, setShown] = useState(true);

    if(shown){
        return(
            <div
                style={{padding: 0}} className={["col-3", "g-3", classes.my__plugin].join(' ')}>
                <div onMouseEnter={() => setShown(false)}
                     className={classes.inner__picture}>
                    {/*<img style={{width: "100%", height: "100%"}} src={plugin.picture}/>*/}
                </div>
                <h3 style={{textAlign: "center", marginBottom: "0px", marginTop: "15px"}}>{plugin.name}</h3>
                <div style={{textAlign: "center"}}>{plugin.mark}</div>
            </div>
        )
    }
    else {
        return(
            <div
                style={{padding: 0}} className={["col-3", "g-3", classes.my__plugin].join(' ')}>
                <div style={{display: "flex" }} onMouseLeave={() => setShown(true)}
                     className={[classes.inner__picture, classes.my__blackout].join(' ')}>
                    {/*<div >*/}
                    {/*  <img className={[classes.my__blackout].join(' ')} style={{width: "100%", height: "100%"}} src={plugin.picture}/>*/}
                    {/*    <div style={{color: "black"}} className={classes.my__description}>*/}
                    {/*        {plugin.shortDescription}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div style={{color: "white", textAlign: "center", margin: "auto", padding: "0"}}>{plugin.shortDescription}</div>
                </div>
                <h3 style={{textAlign: "center", marginBottom: "0px", marginTop: "15px"}}>{plugin.name}</h3>
                <div style={{textAlign: "center"}}>{plugin.mark}</div>
            </div>
        )
    }
};

export default Plugin;