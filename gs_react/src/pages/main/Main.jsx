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

    const removeSelectedTag = (tag) =>{
        setSelectedTags(selectedTags.filter(t => t !== tag))
    }

    const selectedTag = (tag) =>{
        if(selectedTags.includes(tag)) removeSelectedTag(tag)
        else setSelectedTags([...selectedTags, tag])
    }

    function setDefaultFilters() {
        setFilter('');
        setCurrentCat(-1);
    }

    return <div style={{minHeight: "100vh"}}>
        {load?
            <div>
                <MyFooter />
                <Header setDefaultFilters={setDefaultFilters} addTag={selectedTag} tags={tags} selectedTags={selectedTags}/>
                <SelectedTags list={selectedTags} remove={removeSelectedTag}/>
                <Loader />
            </div>
            :
            <div style={{minHeight: "100vh"}}>
                <MyFooter />
                <Header setFilter={setFilter} setCurrentCat={setCurrentCat} setDefaultFilters={setDefaultFilters} addTag={selectedTag} tags={tags} selectedTags={selectedTags}/>
                {noContent ?
                    <div className={classes.my__background}>
                        <SelectedTags list={selectedTags} remove={removeSelectedTag}/>
                        <div className={classes.my__no__content}>
                            No content for current request.
                        </div>
                    </div>
                    :
                    <div className={classes.my__background}>
                        <SelectedTags list={selectedTags} remove={removeSelectedTag}/>
                        <PluginList list={plugins}/>
                        <MyPagination
                        page={pageCnt}
                        current={currentPage}
                        change={changePage}/>
                    </div>
                }

            </div>
        }
    </div>;
}

export default Main;
