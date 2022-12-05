import React, {useEffect, useState} from "react";
import PluginList from "../components/pluginList/PluginList";
import PluginService from "../API/PluginService";
import PluginForm from "../components/pluginForm/PluginForm";
import MyPagination from "../components/Pagination/MyPagination";
import Loader from "../components/loading/Loader";

const Main = () => {
    const [plugins, setPlugins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCnt, setPageCnt] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() =>{
        fetchPlugins(currentPage, 5);
    }, [currentPage])

    async function fetchPlugins(page, limit) {
        setLoad(true);
        const response = await PluginService.getPluginsPage(page, limit);
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
            <Loader />:
            <PluginList list={plugins}/>
        }
        <MyPagination page={pageCnt}
                    current={currentPage}
                    change={changePage}
        />
        <PluginForm add={addPlugin}/>
    </div>;
}

export default Main;
