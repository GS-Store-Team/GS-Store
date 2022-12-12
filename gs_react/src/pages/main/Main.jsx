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
    const [currentCat, setCurrentCat] = useState(-1);
    const [noContent, setNoContent] = useState(false);

    useEffect(() =>{
        setLoad(true);
        Api.getPluginsPage(currentPage, 6, filter, currentCat).then((response) =>{
            if(response.status !== 204) {
                setPlugins(response.data.content);
                setPageCnt(response.data.totalPages);
                setNoContent(false);
            }
            else setNoContent(true);

            setLoad(false);
        })
    }, [currentPage, filter, currentCat])

    const changePage = (page) => {
        setCurrentPage(page);
    }

    return <div style={{minHeight: "100vh"}}>
        {load?
            <div>
                <Header />
                <Loader />
                <MyFooter />
            </div>
            :
            <div style={{minHeight: "100vh"}}>
                <Header setFilter={setFilter} setCurrentCat={setCurrentCat}/>
                {noContent ?
                    <div className={classes.my__background}>
                        <div className={classes.my__no__content}>
                            No content for current request.
                        </div>
                    </div>
                    :
                    <div className={classes.my__background}>
                        <PluginList list={plugins}/>
                        <MyPagination
                        page={pageCnt}
                        current={currentPage}
                        change={changePage}/>
                    </div>
                }
                <MyFooter />
            </div>
        }
    </div>;
}

export default Main;
