import React, {FC} from 'react';
import {arrayFromNum} from "../../utils/Utils";
import classes from "./pagination.module.css";

interface IMyPagination{
    page: number
    current: number
    onChange: (pageId : number) => void
}

const MyPagination : FC<IMyPagination> = React.memo(({page, current, onChange}) => {
    const arr = arrayFromNum(page);
    return (
        arr.length > 1?
            <div
                className={classes.my__pagination}>
                {
                    arr.map((el) =>
                        <div className={el===current? classes.my__pagination__chosen__el: classes.my__pagination__el}
                              onClick={ () => {onChange(el)}}
                              key={el}>
                              {el}
                        </div>)
                }
            </div>
            : <></>
    );
});

export default MyPagination;