import React, {useState} from 'react';
import classes from "./search.module.css";
import image from "../../UI/img/shovel.png";

export const Search = ({setFilterFunc}) => {
    const [filter, setFilter] = useState("");

    const search = (e) => {
        e.preventDefault();

        console.log("HERE");

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