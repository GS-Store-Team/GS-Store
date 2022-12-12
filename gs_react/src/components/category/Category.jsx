import React, {useEffect, useState} from 'react';
import classes from "./category.module.css";
import Api from "../../API/Api";

export const Category = ({setCurrentCat}) => {
    const [categoryList, setCategoryList] = useState([]);

    const mySelect = (e) =>{
        const id = e.target.value;
        if(id !== -1){
            setCurrentCat(id);
        }
    }


    useEffect(()=>{
        Api.getCategories().then((response) =>{
            setCategoryList(response.data);
        })
    }, []);

    return (
        <select onClick={(e) => mySelect(e)} className={classes.my__select}>
            <option value={-1}>Categories</option>
            {categoryList.map((c, index) => <option value={c.id}>{c.title}</option>)}
        </select>
    );
};