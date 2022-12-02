import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PluginService from "../../API/PluginService";
import classes from "./pluginpage.module.css";

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
        fetchPlugin(params.id);
    })
    async function fetchPlugin(id) {
        const response = await PluginService.getPluginById(id);
        setPlugin(response.data);
    }

    return (
        <div className={classes.my__plugin}>
            <div className={classes.my__sell}>
                {plugin.name}
            </div>
            <div className={classes.my__sell}>
                {plugin.shortDescription}
            </div>
            <div className={classes.my__sell}>
                {plugin.fullDescription}
            </div>
            <div className={classes.my__sell}>
                {plugin.mark}
            </div>
            <div className={classes.my__sell}>
                {plugin.price}
            </div>
        </div>
    );
};

export default PluginPage;