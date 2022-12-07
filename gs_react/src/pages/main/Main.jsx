import React, {useEffect, useState} from "react";
import PluginList from "../../components/pluginList/PluginList";
import Api from "../../API/Api";
import MyPagination from "../../components/Pagination/MyPagination";
import Loader from "../../components/loading/Loader";
import classes from "./main.module.css";
import {Header} from "../../components/header/Header";

const Main = () => {
    const [plugins, setPlugins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCnt, setPageCnt] = useState(0);
    const [load, setLoad] = useState(false);


    useEffect(() =>{
        fetchPlugins(currentPage, 9);
    }, [currentPage])

    async function fetchPlugins(page, limit) {
        setLoad(true);
        const response = await Api.getPluginsPage(page, limit);
        setPlugins(response.data.content);
        setLoad(false);
        setPageCnt(response.data.totalPages);
    }

    const addPlugin = (plugin) => {
        setPlugins([...plugins ,plugin])
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }

    return <div>
        {load?
            <div>
                <Header />
                <Loader />
            </div>
            : <div>
                <Header />
                <PluginList list={plugins}/>
                <MyPagination page={pageCnt}
                              current={currentPage}
                              change={changePage}
                />
            </div>
        }
    </div>;
}

export default Main;
