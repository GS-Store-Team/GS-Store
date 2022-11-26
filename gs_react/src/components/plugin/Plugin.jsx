import React from 'react';
import classes from './plugin.module.css'

const Plugin = ({plugin}) => {
    return(
        <div className={[classes.my__plugin, classes.my__col].join(' ')}>
            <h3>{plugin.name}</h3>
            <div>{plugin.shortDescription}</div>
            <div>{plugin.mark}</div>
        </div>
    )
};

export default Plugin;