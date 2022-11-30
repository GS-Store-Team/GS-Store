import React, {useEffect, useState} from "react";
import Header from "../components/header/Header";
import PluginList from "../components/pluginList/PluginList";
import {Pagination} from "react-bootstrap";
import PluginService from "../API/PluginService";
import PluginForm from "../components/pluginForm/PluginForm";

const Main = () => {
    const [plugins, setplugins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCnt, setPageCnt] = useState(0);

    useEffect(() =>{
        fetchPlugins(currentPage, 9);
    }, [currentPage])

    async function fetchPlugins(page, limit) {
        const response = await PluginService.getPluginsPage(page, limit);
        setplugins(response.data.content);
            setPageCnt(response.data.totalPages);
    }

    const addPlugin = (plugin) => {
        setplugins([...plugins ,plugin])
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }

    return <div>
        <PluginForm add={addPlugin}/>
        <PluginList list={plugins}/>
        <Pagination page={pageCnt}
                    current={currentPage}
                    change={changePage} />
    </div>;
}

export default Main;
