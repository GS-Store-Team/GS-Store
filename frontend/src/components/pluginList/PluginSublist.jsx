import React from 'react';
import Plugin from "../plugin/Plugin";
import classes from './pluginList.module.css';

const PluginSublist = ({list}) => {
    return (
        <div className={['row', 'justify-content-around'].join(' ')}>
            {list.map(pl => <Plugin plugin={pl} key={pl.id}/>)}
        </div>
    );
};

export default PluginSublist;