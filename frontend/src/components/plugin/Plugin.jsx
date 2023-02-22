import React, {useState} from 'react';
import classes from './plugin.module.css'
import {useNavigate} from "react-router-dom"
import Api from "../../API/Api";
import {ImgComponent} from "../ImgComponent/ImgComponent";
import star from './../../UI/img/star.png'

const Plugin = ({plugin}) => {
    const [shown, setShown] = useState(true);
    const navigate = useNavigate();

    const myNavigate = () =>{
        navigate('/main/' + plugin.id);
    }

    const [previewImage] = useState(<ImgComponent func={Api.previewByPluginId(plugin.id)}/>);


    return(
        <div
            onClick={myNavigate}
            style={{padding: 0}} className={["col-3", "g-3", classes.my__plugin].join(' ')}>
            <div style={{display: "flex" }}
                 onMouseEnter={() => setShown(false)}
                 onMouseLeave={() => setShown(true)}
                 className={classes.inner__picture}>
                {
                    shown?
                        previewImage:
                        <div className={classes.my__description}>
                            {plugin.shortDescription}
                        </div>
                }
            </div>
            <div style={{textAlign: "center", marginBottom: "0px", marginTop: "15px"}}>
                {plugin.name}
            </div>
            <div style={{textAlign: "center "}}>
                {plugin.mark}
                <img className={classes.my__star}
                     src={star}
                     alt={".."}/>
            </div>
        </div>
    )
};

export default Plugin;