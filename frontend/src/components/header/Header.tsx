import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {LogoTab, ProfileTab} from "./Tabs";
import {Categories} from "./category/Categories";
import {Filter} from "../../Types";
import {Icon} from "../default/Icon";
import {Styled as S} from "./Header.styled"
import {Container} from "react-bootstrap";
import {FlexRow} from "../default/Flex.styled";

interface IHeader{
    onSearch?: (filter:Filter) => {}
    disableProfile?: boolean
}

const defaultFilter : Filter = {value:'', categoryId:-1, selectedTags:[]}

export const Header:FC<IHeader> = ({onSearch, disableProfile}) => {
    const [filter, setFilter] = useState<Filter>(defaultFilter);

    const handleChangeValue = useCallback((e : ChangeEvent<HTMLInputElement>) => setFilter(prevState => ({...prevState, value: e.target.value})), [setFilter])
    const handleChangeCategory = useCallback((id : number) => setFilter(prevState => ({...prevState, categoryId: id})), [setFilter])
    const handleLogoClock = useCallback(() => {setFilter(defaultFilter)}, [setFilter])

    return (
        <S.Header>
            <Container>
                <FlexRow justifyContent={"space-between"} style={{height: "100px", alignItems:"center"}}>
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
                            <S.Menu><div onClick={() => {}}>#tags</div></S.Menu>
                        </>
                    }
                    {!disableProfile && <ProfileTab/>}
                </FlexRow>
            </Container>

            {/*{tagsWindowVisible?*/}
            {/*    <TagsCloud list={tags} selectedTags={selectedTags} add={addTag} setVisible={setTagsWindowVisible}/>*/}
            {/*    :<div />*/}
            {/*}*/}
        </S.Header>
    );
};