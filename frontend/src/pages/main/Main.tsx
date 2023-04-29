import React from "react";
import PluginList from "../../components/pluginList/PluginList";
import MyPagination from "../../components/Pagination/MyPagination";
import Loader from "../../components/loading/Loader";
import {Header, useHeader} from "../../components/header/Header";
import {MyFooter} from "../../components/footer/MyFooter";
import {Styled as S} from "../Pages.styled";
import {Filter} from "../../Types";

export const defaultFilter : Filter = {value:'', category:{title:'', id: -1}, selectedTags:[], pageId: 1, pageSize: 9}
const Main = () => {

    const {
        filter,
        setFilter,
        plugins,
        pageCount,
        resetFilter,
        handleChangePage,
        loading,
        noContent,
    } = useHeader("MAIN_FILTER", defaultFilter)

    return (
        <S.Wrapper>
            <Header onChangeFilter={setFilter} filter={filter} onLogoClick={resetFilter} enableSearch/>
            <S.Main>
                {loading?
                    <Loader radius={12} />
                    : noContent ?
                        <S.NoContent>No content for current request.</S.NoContent>
                        : <>
                            <PluginList list={plugins} perLine={3}/>
                            <MyPagination
                                page={pageCount}
                                current={filter.pageId}
                                onChange={handleChangePage}
                            />
                        </>
                }
            </S.Main>
            <MyFooter/>
        </S.Wrapper>
    );
}

export default Main;