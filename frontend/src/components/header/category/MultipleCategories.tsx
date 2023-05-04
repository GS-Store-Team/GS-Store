import React, {FC, useEffect, useState} from 'react';
import classes from "./category.module.css";
import Api from "../../../API/Api";
import {useSessionState} from "../../../hooks/UseSessionState";

interface ICategory{
    category: number
    setCategories: (category: number) => void
}

type Category = {
    id: number;
    title: string;
}

export const MultipleCategories: FC<ICategory> = ({category}) => {
    const [categoryList, setCategoryList] = useSessionState<Category[]>("CATEGORIES",[], Api.getCategories());
    const [visible, setVisible] = useState<boolean>(false);
    const [currentTitle, setCurrentTitle] = useState("Select categories")
    const [currentCategories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if(currentCategories.length === 0) setCurrentTitle("Select categories");
    },[category])

    const mySelect = (c : Category) =>{
        const index = categoryList.indexOf(c, 0);
        if (index > -1)
            categoryList.splice(index, 1);
        else
            categoryList.push(c);
        changeTitle();
    }

    const changeTitle = () => {
        if (categoryList.length === 0)
            setCurrentTitle("Select categories");
        else
            setCurrentTitle(categoryList.toString);
    }


    return (
        <div className={classes.my__select}
             onMouseLeave={() => setVisible(false)}
        >
            <button onMouseEnter={() => setVisible(true)}
                    onClick={() => setVisible(true)}
                    className={classes.my__select__button}
            >{currentTitle}</button>
            <ul className={visible ? classes.my__dropped__list : classes.my__dropped__list__hidden}>
                <li onClick={() => mySelect({id:-1, title: "Select categories"})}
                    className={currentTitle === "Select categories" ? classes.my__dropped__list__el__current : classes.my__dropped__list__el}
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