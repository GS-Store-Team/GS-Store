import React from 'react';
import {arrayFromNum} from "../../utils/Utils";
import classes from "./pagination.module.css";

const MyPagination = React.memo(({page, current, change}) => {
    const arr = arrayFromNum(page);
    return (
        arr.length > 1?
            <div
                className={classes.my__pagination}>
                {
                    arr.map((el) =>
                        <div className={el===current? classes.my__pagination__chosen__el: classes.my__pagination__el}
                              onClick={ () => {change(el)}}
                              key={el}>
                              {el}
                        </div>)
                }
            </div>
            : <></>
    );
});

export default MyPagination;