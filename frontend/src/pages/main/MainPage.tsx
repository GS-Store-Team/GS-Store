import React from "react";
import PluginList from "../../components/pluginList/PluginList";
import MyPagination from "../../components/Pagination/MyPagination";
import Loader from "../../components/loading/Loader";
import {Header, useHeader} from "../../components/header/Header";
import {MyFooter} from "../../components/footer/MyFooter";
import {Styled as S} from "../Pages.styled";
import {Filter} from "../../Types";
import {Container} from "react-bootstrap";
import {filtersEquals} from "../../utils/Utils";

export const defaultFilter : Filter = {value:'', category:{title:'', id: -1}, selectedTags:[], pageId: 1, pageSize: 18}
const MainPage = () => {

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
            <Header onChangeFilter={setFilter} filter={filter} onLogoClick={resetFilter} enableSearch resetFilter={!filtersEquals(filter, defaultFilter) ? resetFilter : undefined}/>
            <S.Main>
                <Container>
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
                </Container>
            </S.Main>
            <MyFooter/>
        </S.Wrapper>
    );
}

export default MainPage;