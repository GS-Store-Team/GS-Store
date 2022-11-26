import React from 'react';
import Plugin from "../plugin/Plugin";
import classes from './pluginList.module.css';
import PluginSublist from "./PluginSublist";

const PluginList = ({list}) => {
    const arr = []

    for (let i = 0; i<list.length ; i+=3){
        arr.push(list.slice(i, i+3))
    }

    return (
        <div className="container">
            {arr.map(subList => <PluginSublist list={subList}/>)}
        </div>
    );
};

export default PluginList;