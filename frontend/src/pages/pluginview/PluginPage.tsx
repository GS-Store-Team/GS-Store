import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Api from "../../API/Api";
import classes from "./pluginpage.module.css";
import bug from './../../UI/img/bug.png'
import star from './../../UI/img/star.png'
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/default/ImgComponent";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import {ReviewArea} from "../../components/review/ReviewArea";
import {FlexColumn, FlexRow} from "../../components/default/Flex.styled";
import {ImgBlock} from "../../components/ImgBlock/ImgBlock";
import {Styled as S} from "./PluginPage.styled"
import {Icon} from "../../components/default/Icon";
import {Btn} from "../../components/default/Btn";

const PluginPage = () => {

    const [imgList, setImgList] = useState([])

    const [plugin, setPlugin] = useState({
        id: 0,
        name: 'none',
        shortDescription: 'none',
        fullDescription: '',
        deleted: false,
        mark: 5,
        price: 0,
    });

    const params = useParams();

    useEffect(() =>{
        Api.getPluginById(params.id).then((response) => {
                if (response.status === 200) {
                    setPlugin(response.data);

                    Api.imageListByPluginId(response.data.id).then((response) =>{
                        if(response.status === 200)
                            setImgList(response.data.map((e : any) => <ImgComponent func={Api.getImageById(e)}/>));
                    })
                }
            }
        )
    },[]);

    return (
        <div className={classes.my__preview__page}>
            <PluginViewHeader />
                <div className={[classes.my__profile, "container"].join(' ')}>
                <FlexRow style={{gap: 0}} justifyContent={"space-between"}>
                    <FlexColumn style={{minWidth: "200px", width: "300px", paddingRight: "20px", justifyContent:"space-between"}}>

                        <ImgBlock pluginId={plugin.id} />

                        <FlexColumn style={{marginBottom: "60px"}}>
                            <FlexRow style={{gap: 0}} justifyContent={"flex-end"}>
                                <S.Rate><span style={{fontSize: "22px"}}>{plugin.mark}</span>/5</S.Rate>
                                <S.Star><Icon img={"star"} nonClickable style={{opacity:1}}/></S.Star>
                            </FlexRow>
                            <Btn primary>Purchase</Btn>
                        </FlexColumn>
                    </FlexColumn>

                    <FlexColumn style={{width: "50%", gap: 0, minWidth: "300px"}}>
                        <S.Header>{plugin.name}</S.Header>
                        <S.Bug><Icon img={"bug"} /></S.Bug>

                        <S.Heading>Introduction</S.Heading>
                        <S.Text>{plugin.shortDescription}</S.Text>

                        <S.Heading>Description</S.Heading>
                        <S.Text>{plugin.fullDescription}</S.Text>

                    </FlexColumn>
                    <FlexColumn style={{width: "400px"}}>
                        { plugin.id && <ReviewArea pluginId={plugin.id}/> }
                    </FlexColumn>
                </FlexRow>
                </div>
            <MyFooter />
        </div>
    );
};

export default PluginPage;