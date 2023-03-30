import React from 'react';
import {MutatingDots} from 'react-loader-spinner'
import classes from "./loader.module.css";

const Loader = ({radius}) => {
    return (
        <div className={classes.my__outer__block}>
            <span style={{margin: "auto"}}>Loading...</span>
            {/*<MutatingDots*/}
            {/*    height="100"*/}
            {/*    width="100"*/}
            {/*    color="#eed7c1"*/}
            {/*    secondaryColor= '#eed7c1'*/}
            {/*    radius ={radius}*/}
            {/*    ariaLabel="mutating-dots-loading"*/}
            {/*    wrapperStyle={{}}*/}
            {/*    wrapperClass={classes.my__loader}*/}
            {/*    visible={true}*/}
            {/*/>*/}
        </div>
    );
};

export default Loader;