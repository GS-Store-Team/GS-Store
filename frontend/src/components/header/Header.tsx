import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {LogoTab, ProfileTab} from "./Tabs";
import {Categories} from "./category/Categories";
import {Filter, Tag} from "../../Types";
import {Icon} from "../default/Icon";
import {Styled as S} from "./Header.styled"
import {Container} from "react-bootstrap";
import {SelectedTags, TagsCloud} from "./tags/TagsCloud";
import {Tooltip} from "../default/Tooltip";
import {useSessionState} from "../../hooks/UseSessionState";
import Api from "../../API/Api";
import {useOutsideClick} from "../../hooks/Hooks";

interface IHeader{
    onSearch?: (filter:Filter) => {}
    disableProfile?: boolean
}

const defaultFilter : Filter = {value:'', categoryId:-1, selectedTags:[]}

export const Header:FC<IHeader> = ({onSearch, disableProfile}) => {
    const [filter, setFilter] = useSessionState<Filter>("FILTER", {value:'', categoryId:-1, selectedTags:[]});
    const [tags, setTags] = useSessionState<Tag[]>("TAGS_SET",[], onSearch && Api.getTags())
    const [selectedTags, setSelectedTags] = useState<Tag[]>(filter.selectedTags)
    const [tagsCloud, setTagsCloud] = useState<boolean>(false);
    const ref = React.createRef<HTMLDivElement>()

    const handleChangeValue = useCallback((e : ChangeEvent<HTMLInputElement>) => setFilter(prevState => ({...prevState, value: e.target.value})), [setFilter])
    const handleChangeCategory = useCallback((id : number) => setFilter(prevState => ({...prevState, categoryId: id})), [setFilter])
    const handleLogoClock = useCallback(() => {setFilter(defaultFilter)}, [setFilter])
    const handleCloseTagsCloud = useCallback(() => setTagsCloud(false), [setTagsCloud])
    const handleAddTag = useCallback((tag: Tag) => setSelectedTags(prevState => [...prevState, tag]), [])
    const handleRemoveTag = useCallback((tag: Tag) => setSelectedTags(prevState => [...prevState.filter(t => t.id !== tag.id)]), [])


    useOutsideClick(ref, handleCloseTagsCloud, tagsCloud)

    return (
        <>
            <S.Header>
                <Container style={{height: "100%", alignItems: "center", display: "flex", justifyContent:"space-between", flexShrink: "1"}}>
                    <LogoTab onClick={handleLogoClock}/>
                    {onSearch &&
                        <>
                            <S.Menu><Categories setCategory={handleChangeCategory} category={filter.categoryId}/></S.Menu>
                            <S.SearchArea>
                                <S.Search placeholder={"Search"}
                                          value={filter.value}
                                          onChange={handleChangeValue}
                                          type={"text"}
                                          onKeyDown={undefined}>
                                </S.Search>
                                <S.Shovel>
                                    <Icon img={"shovel"} onClick={onSearch ? () => onSearch(filter) : undefined}/>
                                </S.Shovel>
                            </S.SearchArea>
                            <S.Menu>
                                <Tooltip label={"Use tags to find plugins more accurate"} placement={"top"}>
                                    <span style={{cursor: "pointer"}} onClick={() => setTagsCloud(true)}>#tags</span>
                                </Tooltip>
                            </S.Menu>
                        </>
                    }
                    {!disableProfile && <ProfileTab/>}
                </Container>
                {tagsCloud && <TagsCloud ref={ref} tags={tags} selected={selectedTags} addTag={handleAddTag} removeTag={handleRemoveTag}/>}
            </S.Header>
            <Container>
                <SelectedTags selected={selectedTags} onRemove={handleRemoveTag} onRemoveAll={() => setSelectedTags([])}/>
            </Container>
        </>
    );
};