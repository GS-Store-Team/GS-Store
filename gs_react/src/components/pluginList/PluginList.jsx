import React from 'react';
import PluginSublist from "./PluginSublist";

const PluginList = ({list}) => {
    const arr = []

    console.log(list);

    for (let i = 0; i<list.length ; i+=3){
        arr.push(list.slice(i, i+3))
    }

    return (
        <div className="container">
            {arr.map((subList, index) => <PluginSublist list={subList} key={index}/>)}
        </div>
    );
};

export default PluginList;