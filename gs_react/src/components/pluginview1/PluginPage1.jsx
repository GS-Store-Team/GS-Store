import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Api from "../../API/Api";
import classes from "./pluginpage1.module.css";
import {Header} from "../../components/header/Header";
import {MyFooter} from "../../components/footer/MyFooter";

const PluginPage1 = () => {

    const [plugin, setPlugin] = useState({
        id: 28,
        name: 'Product name',
        shortDescription: 'valera',
        fullDescription: 'Lorem ipsum dolor sit aamet, consectetur' +
            ' adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex' +
            ' ea commodo confjfjf fjfjfj jfjfjf fjfjfj fjfjfj ' +
            'sequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' +
            ' cillum dolore eu fugiat nulla pariatur . Excepteur sint occaecat cupidatat non ' +
            'proident, sunt in culfjfjfjf pa qui officia deserunt mollit anim id est laborum...\n' +
            'Duis aute irure dolor in reprehenderit in voluptate velit ' +
            'esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat' +
            ' cupidatat non proident, gjgj  gjgjg jgjgjgsunt in gjgjgculpa qui ojgjgjfficia deserunt mollit anim id est laborum...\n' +
            'Duis aute irure dolor in repregjgjhenderit in voluptate velit ' +
            'esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ' +
            'occaecat cupidatat non proident, sunt in culpa qui officia deserunt' +
            ' mollit anim id est laborum...\n' +
            'Duis aute irure dolor fkjkjfjk in reprehendekjgjj rit in volupjkjk tatekjjk  velit esse cillum dolore ' +
            'eu fugiat nulla pariatur.',
        deleted: false,
        mark: 4,
        price: 0,
    });

    const params = useParams();

    useEffect(() =>{
        Api.getPluginById(params.id).then((response) => setPlugin(response.data))
    }, [])

    return (
        <div>
            <Header />
            <div className={[classes.my__plugin, "container"].join(' ')}>
                <div className={"row"}>

                    <div className={["col-4", classes.my__full__desc].join(' ')}>
                        <h1 className={classes.my_title}>{plugin.name}</h1>
                        <img  className={classes.main_image} src={"https://cdn.cloudflare.steamstatic.com/" +
                            "steam/apps/3590/0000008150.1920x1080.jpg?t=1615390608"}/>
                        <h2 className={classes.my__rate}>{plugin.mark}/5
                        <img className={classes.rate_image}
                            src={"https://cdn-icons-png.flaticon.com/512/6520/6520170.png"}/>
                        </h2>
                        <button className={classes.purchase_button}>Purchase</button>
                    </div>

                    <div className={["col-4", classes.my__full__desc].join(' ')}>
                        <h2 className={classes.my_desc_title}>Description</h2>
                        <button className={classes.bug_report_button}><img className={classes.bug_report_image}
                            src={"https://cdn-icons-png.flaticon.com/512/25/25646.png"}/> report</button>
                        <p className={classes.my_desc_text}>{plugin.fullDescription}</p>
                    </div>

                    <div className={["col-4", classes.reviews].join(' ')}>
                        <h1>place for reviews</h1>
                    </div>
                </div>
            </div>
            <MyFooter />
        </div>
    );
};

export default PluginPage;