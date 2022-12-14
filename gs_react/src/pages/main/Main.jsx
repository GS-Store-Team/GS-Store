import React, {useEffect, useState} from "react";
import PluginList from "../../components/pluginList/PluginList";
import Api from "../../API/Api";
import MyPagination from "../../components/Pagination/MyPagination";
import Loader from "../../components/loading/Loader";
import {Header} from "../../components/header/Header";
import classes from "./main.module.css";
import {MyFooter} from "../../components/footer/MyFooter";
import {SelectedTags} from "../../components/tag/SelectedTags";

const Main = () => {
    const limit = 9;

    const [plugins, setPlugins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCnt, setPageCnt] = useState(0);
    const [load, setLoad] = useState(false);
    const [filter, setFilter] = useState("");
    const [currentCat, setCurrentCat] = useState(-1);
    const [noContent, setNoContent] = useState(false);
    const [tags, setTags] = useState(["tag1","adsaddkdsfj31","tag2","tag3", "tagsadasdasd343", "tagsadasdasdasasdadas123", "tagsadasddasdasdssad", "tag22","tag32", "tagsadasdasd3", "tagsadasdsdaasdasasdadas", "tagsadacesddasdasds","lsmfskfmdsfksfdkssdkfkdfdsmfdssfdsfmdsfdskfskl"]);
    const [selectedTags, setSelectedTags] = useState([])


    useEffect(() =>{
        setLoad(true);
        Api.getPluginsPage(currentPage, limit, filter, currentCat).then((response) =>{
            if(response.status !== 204) {
                setPlugins(response.data.content);
                setPageCnt(response.data.totalPages);
                setNoContent(false);
            }
            else setNoContent(true);

            setLoad(false);
        })
    }, [currentPage])

    useEffect(() =>{
        setLoad(true);
        setCurrentPage(1);
        Api.getPluginsPage(currentPage, limit, filter, currentCat).then((response) =>{
            if(response.status !== 204) {
                setPlugins(response.data.content);
                setPageCnt(response.data.totalPages);
                setNoContent(false);
            }
            else setNoContent(true);

            setLoad(false);
        })
    }, [filter, currentCat])

    const changePage = (page) => {
        setCurrentPage(page);
    }

    const removeSelectedTag = (tag) =>{
        setSelectedTags(selectedTags.filter(t => t !== tag))
    }

    const selectedTag = (tag) =>{
        if(selectedTags.includes(tag)) removeSelectedTag(tag)
        else setSelectedTags([...selectedTags, tag])
    }

    const setDefaultFilters = () => {
        setFilter('');
        setCurrentPage(1);
        setCurrentCat(-1);
        setSelectedTags([]);
    }

    return (
        <div>
            <Header setFilter={setFilter}
                    currentFilter={filter}
                    setCurrentCat={setCurrentCat}
                    currentCategory={currentCat}
                    setDefaultFilters={setDefaultFilters}
                    addTag={selectedTag}
                    tags={tags}
                    selectedTags={selectedTags}
            />
            <div className={classes.my__background}>
                <SelectedTags list={selectedTags} remove={removeSelectedTag}/>
                    {load?
                        <div className={classes.loader}>
                            <Loader />
                        </div>
                        :
                        noContent ?
                            <div className={classes.my__no__content}>No content for current request.</div>
                            :
                            <div>
                                <PluginList list={plugins}/>
                                <MyPagination
                                    page={pageCnt}
                                    current={currentPage}
                                    change={changePage}
                                />
                            </div>
                    }
            </div>
            <MyFooter />
        </div>
    );
}

export default Main;