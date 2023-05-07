import React, {useMemo, useState} from 'react';
import {FlexRow} from "../default/Flex.styled";
import {Plugin} from "../../Types";
import {PluginComponent} from "../plugin/PluginComponent";

interface IPluginList{
    list : Plugin[];
    perLine: number;
}

function splitToLines (pluginList : Plugin[], perLine : number) : Plugin[][] {
    const arr : Plugin[][] = []
    for (let i = 0; i<pluginList.length ; i+=perLine){
        arr.push(pluginList.slice(i, i+perLine))
    }
    return arr;
}

const PluginList : React.FC<IPluginList> = ({list, perLine}) => {

    const pluginList = useMemo(() => splitToLines(list, perLine), [list, perLine])

    return (
        <div style={{paddingBottom: "40px"}}>
            {pluginList.map((subList, index) =>
                <FlexRow key={index} justifyContent={"space-around"} margin={"60px 0 0 0"}>
                    {subList.map((pl)=> <PluginComponent key={pl.id} plugin={pl} />)}
                </FlexRow>
            )}
        </div>
    );
};

export default PluginList;