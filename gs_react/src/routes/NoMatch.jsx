import React from 'react';
import {useNavigate} from "react-router-dom";

const NoMatch = ({path}) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate(path);
    });

    return (
        <div />
    );
};

export default NoMatch;