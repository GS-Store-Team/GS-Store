import React, {Component, useState} from 'react';
import classes from './pluginform.module.css';

const PluginForm = (props) => {

    const emptyPlugin = {
        id: 0,
        name: '',
        shortDescription: '',
        fullDescription: ''
    }

    const[plugin, setPlugin] = useState( {...emptyPlugin})

    const clicked = (e) =>{
        e.preventDefault();

        const pl = plugin;
        pl.id = Date.now();

        props.add(pl);

        setPlugin({...emptyPlugin});
    }

    return (
        <div className={classes.plugin__form}>
            <div className={classes.my__h1}>
                Plugin form</div>
            <input
                    className={classes.my__input}
                    type="text"
                    placeholder={"Enter title"}
                    value = {plugin.name}
                    onChange={event => {setPlugin({...plugin, name: event.target.value})}}
            />
            <textarea
                    className={classes.my__textarea}
                    type="text"
                    placeholder={"Enter short description"}
                    value = {plugin.shortDescription}
                    onChange={event => setPlugin({...plugin, shortDescription: event.target.value})}
            />
            <textarea
                    className={classes.my__textarea__full}
                    placeholder={"Enter full description"}
                    value = {plugin.fullDescription}
                    onChange={event => setPlugin({...plugin, fullDescription: event.target.value})}
            />
            <button
                    className={classes.my__button}
                    type={"submit"}
                    onClick={clicked}>
                Add plugin
            </button>
        </div>
    );
};

export default PluginForm;