import React, {FC, forwardRef, useCallback, useEffect, useMemo} from 'react';
import {Tag} from "../../../Types";
import {Icon} from "../../default/Icon";
import {FlexRow} from "../../default/Flex.styled";
import {Styled as S} from "./Tags.styled";
import {useSessionState} from "../../../hooks/UseSessionState";
import Api from "../../../API/Api";

interface ITagsCloud{
    selected: Tag[]
    addTag: (tag: Tag) => void
    removeTag: (tag: Tag) => void
}

export const TagsCloud = forwardRef<HTMLDivElement, ITagsCloud>(({selected, addTag, removeTag}, ref) => {
    const [tags, setTags] = useSessionState<Tag[]>("TAGS_SET",[], Api.getTags())
    const idsSet = useMemo(() => {
        const set = new Set<number>()
        selected.forEach(t => set.add(t.id))
        return set
    },[selected])

    const isSelected = useCallback((tag: Tag) => idsSet.has(tag.id), [idsSet])

    return (
        <S.Cloud ref={ref}>
            {tags.map(tag => isSelected(tag) ?
                 <S.Tag key={tag.id} color={"rgb(255,221,128)"} onClick={() => removeTag(tag)}>#{tag.title}</S.Tag>
                :<S.Tag key={tag.id} color={"rgb(224,224,224)"} onClick={() => addTag(tag)}>#{tag.title}</S.Tag>
            )}
        </S.Cloud>
    );
});

interface ISelectedTags{
    selected: Tag[]
    onRemove? : (tag : Tag) => void
    onRemoveAll?: () => void
}
export const SelectedTags : FC<ISelectedTags>= ({selected, onRemove, onRemoveAll}) => {

    return (
        selected.length > 0 ?
            <FlexRow justifyContent={"space-between"}>
                <span>{selected.map(tag =>
                    <S.Tag key={tag.id} color={"rgba(100,100,100,0.5)"}>
                        <FlexRow style={{alignItems: "center"}}>
                            <span style={{fontSize:"16px"}}>#{tag.title}</span>
                            {onRemove && <Icon img={"cross"} onClick={() => onRemove(tag)} style={{width: "18px", height: "18px"}}/>}
                        </FlexRow>
                    </S.Tag>
                )}</span>
                {onRemoveAll && <Icon img={"trash-bin"} onClick={onRemoveAll} tooltip={{label: "Remove all tags from filter", placement:"top"}}/>}
            </FlexRow>
            :<></>
    );
};