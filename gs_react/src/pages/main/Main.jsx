import React, {useEffect, useState} from "react";
import PluginList from "../../components/pluginList/PluginList";
import Api from "../../API/Api";
import MyPagination from "../../components/Pagination/MyPagination";
import Loader from "../../components/loading/Loader";
import {Header} from "../../components/header/Header";
import classes from "./main.module.css";
import {MyFooter} from "../../components/footer/MyFooter";

const Main = () => {
    const [plugins, setPlugins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCnt, setPageCnt] = useState(0);
    const [load, setLoad] = useState(false);
    const [filter, setFilter] = useState("");
    const [noContent, setNoContent] = useState(false);

    useEffect(() =>{
        setLoad(true);
        Api.getPluginsPage(currentPage, 9, filter).then((response) =>{
            if(response.status !== 204) {
                setPlugins(response.data.content);
                setPageCnt(response.data.totalPages);
                setNoContent(false);
            }
            else setNoContent(true);

            setLoad(false);
        })
    }, [currentPage, filter])

    const changePage = (page) => {
        setCurrentPage(page);
    }

    return <div style={{minHeight: "100vh"}}>
        {load?
            <div>
                <Header />
                <Loader />
            </div>
            :
            <div style={{minHeight: "100vh"}}>
                <Header setFilter={setFilter}/>
                {noContent ?
                    <div>
                        No content for current request.
                    </div>
                    :<div className={classes.my__background}>
                        <PluginList list={plugins}/>
                        <MyPagination page={pageCnt}
                                      current={currentPage}
                                      change={changePage}
                        />
                    </div>
                }
            </div>
        }
    </div>;
}

export default Main;
