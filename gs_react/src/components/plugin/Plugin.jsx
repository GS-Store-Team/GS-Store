import React, {useState} from 'react';
import classes from './plugin.module.css'
import {useNavigate} from "react-router-dom"

const Plugin = ({plugin}) => {
    const [shown, setShown] = useState(true);
    const navigate = useNavigate();
    const myNavigate = () =>{
        navigate('/main/' + plugin.id);
    }

    if(shown){
        return(
            <div
                onClick={myNavigate}
                style={{padding: 0}} className={["col-3", "g-3", classes.my__plugin].join(' ')}>
                <div onMouseEnter={() => setShown(false)}
                     className={classes.inner__picture}>
                </div>
                <div style={{textAlign: "center", marginBottom: "0px", marginTop: "15px"}}>{plugin.name}</div>
                <div style={{textAlign: "center"}}>{plugin.mark}</div>
            </div>
        )
    }
    else {
        return(
            <div
                onClick={myNavigate}
                style={{padding: 0}} className={["col-3", "g-3", classes.my__plugin].join(' ')}>
                <div style={{display: "flex" }} onMouseLeave={() => setShown(true)}
                     className={[classes.inner__picture, classes.my__blackout].join(' ')}>
                    <div style={{color: "white", textAlign: "center", margin: "auto", padding: "0"}}>{plugin.shortDescription}</div>
                </div>
                <div style={{textAlign: "center", marginBottom: "0px", marginTop: "15px"}}>{plugin.name}</div>
                <div style={{textAlign: "center"}}>{plugin.mark}</div>
            </div>
        )
    }
};

export default Plugin;