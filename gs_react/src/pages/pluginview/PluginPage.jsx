import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Api from "../../API/Api";
import classes from "./pluginpage.module.css";
import {Header} from "../../components/header/Header";

const PluginPage = () => {

    const [plugin, setPlugin] = useState({
        id: 0,
        name: '',
        shortDescription: '',
        fullDescription: '',
        deleted: false,
        mark: 0,
        price: 0,
    });

    const params = useParams();

    useEffect(() =>{
        Api.getPluginById(params.id).then((response) => setPlugin(response.data))
    }, [])

    return (
        <div>
            <Header />
            <div className={classes.my__plugin}>
                <div className={classes.my__cell}>
                    {plugin.name}
                </div>
                <div className={classes.my__cell}>
                    {plugin.shortDescription}
                </div>
                <div className={classes.my__cell}>
                    {plugin.fullDescription}
                </div>
                <div className={classes.my__cell}>
                    {plugin.mark}
                </div>
                <div className={classes.my__cell}>
                    {plugin.price}
                </div>
            </div>
        </div>
    );
};

export default PluginPage;