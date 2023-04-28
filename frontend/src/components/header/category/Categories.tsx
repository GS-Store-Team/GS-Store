import React, {FC, useEffect, useState} from 'react';
import classes from "./category.module.css";
import Api from "../../../API/Api";
import {Category} from "../../../Types";

interface ICategory{
    category: number
    setCategory: (category: number) => void
}
export const Categories: FC<ICategory> = ({setCategory, category}) => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentTitle, setCurrentTitle] = useState("Categories")

    useEffect(() => {
        if(category === -1) setCurrentTitle("Categories");
    },[category])

    const mySelect = (c : Category) =>{
        setVisible(false);
        setCategory(c.id);
        setCurrentTitle(c.title)
    }

    useEffect(()=>{
        Api.getCategories().then((response) =>{
            setCategoryList(response.data);
        })
    }, []);

    return (
        <div className={classes.my__select}
             onMouseLeave={() => setVisible(false)}
        >
            <button onMouseEnter={() => setVisible(true)}
                    onClick={() => setVisible(true)}
                    className={classes.my__select__button}
            >{currentTitle}</button>
            <ul className={visible ? classes.my__dropped__list : classes.my__dropped__list__hidden}>
                <li onClick={() => mySelect({id:-1,title:'Categories'})}
                    className={currentTitle === "Categories" ? classes.my__dropped__list__el__current : classes.my__dropped__list__el}
                >none</li>
                {
                    categoryList.map((c, index) =>
                        <li key={index}
                            onClick={() => mySelect(c)}
                            className={currentTitle === c.title ? classes.my__dropped__list__el__current : classes.my__dropped__list__el}
                        >{c.title}</li>
                    )
                }
            </ul>
        </div>
    );
};