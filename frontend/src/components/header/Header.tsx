import React, {ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from 'react';
import {LogoTab, ProfileTab} from "./Tabs";
import {Categories} from "./category/Categories";
import {Filter, Plugin, Tag} from "../../Types";
import {Icon} from "../default/Icon";
import {Styled as S} from "./Header.styled"
import {Container} from "react-bootstrap";
import {SelectedTags, TagsCloud} from "./tags/TagsCloud";
import {Tooltip} from "../default/Tooltip";
import {useOutsideClick} from "../../hooks/Hooks";
import {useNavigate} from "react-router-dom";
import {useSessionState} from "../../hooks/UseSessionState";
import Api from "../../API/Api";

interface IHeader{
    filter: Filter
    onChangeFilter: Dispatch<SetStateAction<Filter>>
    enableSearch?:boolean
    disableProfile?: boolean
    onLogoClick?: () => void
    resetFilter?: () => void
}

export const Header:FC<IHeader> = ({onChangeFilter, disableProfile, enableSearch, filter, onLogoClick, resetFilter}) => {
    const navigate = useNavigate();
    const [tagsCloud, setTagsCloud] = useState<boolean>(false);
    const ref = React.createRef<HTMLDivElement>()
    const [search, setSearch] = useState<string>('')
    const handleChangeValue = useCallback((e : ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [onChangeFilter])
    const applySearch = useCallback(() => onChangeFilter(prevState => ({...prevState, value: search})), [search, onChangeFilter])
    const handleChangeCategory = useCallback((id : number) => onChangeFilter(prevState => ({...prevState, category: {id, title:''}})), [onChangeFilter])
    const handleCloseTagsCloud = useCallback(() => setTagsCloud(false), [setTagsCloud])
    const handleAddTag = useCallback((tag: Tag) => onChangeFilter(prevState => ({...prevState, selectedTags: [...prevState.selectedTags, tag]})), [onChangeFilter])
    const handleRemoveTag = useCallback((tag: Tag) => onChangeFilter(prevState => ({...prevState, selectedTags: [...prevState.selectedTags.filter(t => t.id !== tag.id)]})), [onChangeFilter])
    const handleRemoveAllTags = useCallback(() => onChangeFilter(prevState => ({...prevState, selectedTags:[]})),[onChangeFilter])
    const handleKeyDown = useCallback((e : React.KeyboardEvent) => { if(e.code === "Enter") applySearch()}, [applySearch])
    const handleLogoClick = useCallback(() => {
        if(onLogoClick) onLogoClick()
        else navigate(-1)
    }, [navigate])

    useEffect(() => setSearch(filter.value), [filter.value])

    useOutsideClick(ref, handleCloseTagsCloud, tagsCloud)

    return (
        <>
            <S.Header>
                <Container style={{height: "100%", alignItems: "center", display: "flex", justifyContent:"space-between", flexShrink: "1"}}>
                    <LogoTab onClick={handleLogoClick} />
                    {enableSearch &&
                        <>
                            <S.Menu><Categories setCategory={handleChangeCategory} category={filter.category.id}/></S.Menu>
                            <S.SearchArea>
                                <S.Search placeholder={"Search"}
                                          value={search}
                                          onChange={handleChangeValue}
                                          type={"text"}
                                          onKeyDown={handleKeyDown}>
                                </S.Search>
                                <S.Shovel>
                                    <Icon img={"shovel"} onClick={applySearch}/>
                                </S.Shovel>
                                <span style={{margin: "auto 5px"}}>
                                    {resetFilter && <Icon img={"reset-filter"} onClick={resetFilter} tooltip={{label:"Set filter to default"}}/>}
                                </span>
                            </S.SearchArea>
                            <S.Menu style={{minWidth: "80px"}}>
                                <Tooltip label={"Use tags to find plugins more accurate"} placement={"top"}>
                                    <span style={{cursor: "pointer"}} onClick={() => setTagsCloud(true)}>#tags</span>
                                </Tooltip>
                            </S.Menu>
                        </>
                    }
                    {!disableProfile && <ProfileTab/>}
                </Container>
                {enableSearch && tagsCloud && <TagsCloud ref={ref} selected={filter.selectedTags} addTag={handleAddTag} removeTag={handleRemoveTag}/>}
            </S.Header>
            <Container>
                <SelectedTags selected={filter.selectedTags} onRemove={handleRemoveTag} onRemoveAll={handleRemoveAllTags}/>
            </Container>
        </>
    );
};

export const useHeader = (key: string, defaultFilter: Filter) => {
    const [filter, setFilter] = useSessionState<Filter>(key, defaultFilter);
    const [plugins, setPlugins] = useState<Plugin[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState<boolean>(false)
    const [noContent, setNoContent] = useState(false);

    const resetFilter = useCallback(() => setFilter(defaultFilter), [key, filter])
    const renew = useCallback(() => setFetch(prevState => !prevState), [])
    const handleChangePage = useCallback((page : number) => setFilter(prevState => ({...prevState, pageId: page})), [key, filter])

    useEffect(() => {
        setLoading(true)
        Api.getPluginsPage(filter).then(response => {
            setLoading(false)
            setNoContent(response.data.totalElements === 0)
            setPageCount(response.data.totalPages)
            setPlugins(response.data.content)
        })
    }, [filter, fetch])

    return{
        filter,
        setFilter,
        plugins,
        pageCount,
        resetFilter,
        handleChangePage,
        loading,
        noContent,
        renew,
    }
}