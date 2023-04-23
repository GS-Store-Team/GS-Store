import React, {FC, forwardRef, useCallback} from 'react';
import {Tag} from "../../../Types";
import {Icon} from "../../default/Icon";
import {FlexRow} from "../../default/Flex.styled";
import {Styled as S} from "./Tags.styled";

interface ITagsCloud{
    tags: Tag[]
    selected: Tag[]
    addTag: (tag: Tag) => void
    removeTag: (tag: Tag) => void
}

export const TagsCloud = forwardRef<HTMLDivElement, ITagsCloud>(({tags, selected, addTag, removeTag}, ref) => {
    const isSelected = useCallback((tag: Tag) => selected.includes(tag), [selected])
    return (
        <S.Cloud ref={ref}>
            {tags.map(tag => isSelected(tag) ?
                <S.Tag color={"rgba(255,221,128,1)"} onClick={() => removeTag(tag)}>#{tag.title}</S.Tag>
                :<S.Tag color={"rgb(224,224,224)"} onClick={() => addTag(tag)}>#{tag.title}</S.Tag>
            )}
        </S.Cloud>
    );
});

interface ISelectedTags{
    selected: Tag[]
    onRemove : (tag : Tag) => void
    onRemoveAll: () => void
}

export const SelectedTags : FC<ISelectedTags>= ({selected, onRemove, onRemoveAll}) => {
    return (
        selected.length >0 ?
            <FlexRow justifyContent={"space-between"}>
                <span>{selected.map(tag =>
                    <S.Tag color={"rgba(255,221,128,0.47)"}>
                        <FlexRow style={{alignItems: "center"}}>
                            <span style={{fontSize:"16px"}}>#{tag.title}</span>
                            <Icon img={"cross"} onClick={() => onRemove(tag)} style={{width: "18px", height: "18px"}}/>
                        </FlexRow>
                    </S.Tag>
                )}</span>
                <Icon img={"trash-bin"} onClick={onRemoveAll} tooltip={{label: "Remove all tags from filter", placement:"top"}}/>
            </FlexRow>
            :<></>
    );
};