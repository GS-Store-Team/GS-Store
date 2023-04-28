import React, {useCallback, useEffect, useState} from "react";
import PluginList from "../../components/pluginList/PluginList";
import Api from "../../API/Api";
import MyPagination from "../../components/Pagination/MyPagination";
import Loader from "../../components/loading/Loader";
import {Header} from "../../components/header/Header";
import classes from "./main.module.css";
import {MyFooter} from "../../components/footer/MyFooter";
import {Styled as S} from "../Pages.styled";
import {Filter} from "../../Types";
import {useSessionState} from "../../hooks/UseSessionState";
import {Plugin} from "../../Types";
import {useNavigate} from "react-router-dom";
export const defaultFilter : Filter = {value:'', category:{title:'', id: -1}, selectedTags:[], pageId: 1, pageSize: 9}
const Main = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useSessionState<Filter>("MAIN_FILTER", defaultFilter);
    const [plugins, setPlugins] = useState<Plugin[]>([]);

    const [pageCnt, setPageCnt] = useState<number>(1);
    const [load, setLoad] = useState(false);
    const [noContent, setNoContent] = useState(false);

    useEffect(() => {
        console.log(filter)
        setLoad(true)
        Api.getPluginsPage({...filter}).then(response => {
            setLoad(false)

            setNoContent(response.data.totalElements === 0)
            setPageCnt(response.data.totalPages)

            setPlugins(response.data.content)
        })
    }, [filter])

    const resetFilters = useCallback(() => setFilter(defaultFilter), [])
    const handleChangePage = useCallback((page : number) => {
        console.log(page)
        setFilter(prevState => ({...prevState, pageId: page}))
    }, [])

    return (
        <S.Wrapper style={{backgroundColor: "rgba(227, 224, 218, 0.25)"}}>
            <Header onChangeFilter={setFilter} filter={filter} onLogoClock={resetFilters} enableSearch/>
            <S.Main>
                {load?
                    <div className={classes.loader}>
                        <Loader radius={12} />
                    </div>
                    :
                    noContent ?
                        <div className={classes.my__no__content}>No content for current request.</div>
                        :
                        <div>
                            <PluginList list={plugins} perLine={3}/>
                            <MyPagination
                                page={pageCnt}
                                current={filter.pageId}
                                onChange={handleChangePage}
                            />
                        </div>
                }
            </S.Main>
            <MyFooter/>
        </S.Wrapper>
    );
}

export default Main;