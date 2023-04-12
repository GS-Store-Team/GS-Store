import React, {useEffect, useState} from 'react';
import classes from "./search.module.css";
import image from "../../../UI/img/shovel.png";

export const Search = ({setFilterFunc, currentFilter}) => {
    const [filter, setFilter] = useState("");

    useEffect(() =>{
        if(currentFilter === '') setFilter('');
    },[currentFilter])

    const search = (e) => {
        e.preventDefault();
        setFilterFunc(filter);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search(e);
        }
    }

    return (
        <div className={classes.my__div}>
            <input className={classes.my__input}
                   placeholder={"Search"}
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                   type={"text"}
                   onKeyDown={handleKeyDown}/>
            <img
                    onClick={(e) => search(e)}
                 className={classes.my__shovel}
                 src={image}  alt={":("}/>
        </div>
    );
};