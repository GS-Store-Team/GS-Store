import React, {ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from 'react';
import {LogoTab, ProfileTab} from "./Tabs";
import {Categories} from "./category/Categories";
import {Filter, Tag} from "../../Types";
import {Icon} from "../default/Icon";
import {Styled as S} from "./Header.styled"
import {Container} from "react-bootstrap";
import {SelectedTags, TagsCloud} from "./tags/TagsCloud";
import {Tooltip} from "../default/Tooltip";
import {useOutsideClick} from "../../hooks/Hooks";
import {useNavigate} from "react-router-dom";

interface IHeader{
    filter: Filter
    onChangeFilter: Dispatch<SetStateAction<Filter>>
    enableSearch?:boolean
    disableProfile?: boolean
    onLogoClock?: () => void
}

export const Header:FC<IHeader> = ({onChangeFilter, disableProfile, enableSearch, filter, onLogoClock}) => {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState<Tag[]>(filter.selectedTags)
    const [tagsCloud, setTagsCloud] = useState<boolean>(false);
    const ref = React.createRef<HTMLDivElement>()

    useEffect(() => {
        onChangeFilter(prevState => ({...prevState, selectedTags}))
    }, [selectedTags])

    const handleChangeValue = useCallback((e : ChangeEvent<HTMLInputElement>) => onChangeFilter(prevState => ({...prevState, value: e.target.value})), [onChangeFilter])
    const handleChangeCategory = useCallback((id : number) => onChangeFilter(prevState => ({...prevState, category: {id, title:''}})), [onChangeFilter])
    const handleCloseTagsCloud = useCallback(() => setTagsCloud(false), [setTagsCloud])
    const handleAddTag = useCallback((tag: Tag) => setSelectedTags(prevState => [...prevState, tag]), [])
    const handleRemoveTag = useCallback((tag: Tag) => setSelectedTags(prevState => [...prevState.filter(t => t.id !== tag.id)]), [])
    const handleLogoClick = useCallback(() => {
        if(onLogoClock) onLogoClock()
        else navigate(-1)
        }, [navigate])

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
                                          value={filter.value}
                                          onChange={handleChangeValue}
                                          type={"text"}
                                          onKeyDown={undefined}>
                                </S.Search>
                                <S.Shovel>
                                    <Icon img={"shovel"} onClick={onChangeFilter ? () => onChangeFilter(filter) : undefined}/>
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
                {enableSearch && tagsCloud && <TagsCloud ref={ref} selected={selectedTags} addTag={handleAddTag} removeTag={handleRemoveTag}/>}
            </S.Header>
            <Container>
                <SelectedTags selected={selectedTags} onRemove={handleRemoveTag} onRemoveAll={() => setSelectedTags([])}/>
            </Container>
        </>
    );
};