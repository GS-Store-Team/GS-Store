import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {ReviewArea} from "../../components/review/ReviewArea";
import {Column, FlexColumn, FlexRow} from "../../components/default/Flex.styled";
import {ImgBlock} from "../../components/ImgBlock/ImgBlock";
import {Styled as S} from "./PluginPage.styled"
import {Icon} from "../../components/default/Icon";
import {Btn} from "../../components/default/Btn";
import {Styled as S1} from "./../Pages.styled"
import {Container} from "react-bootstrap";
import {Category, Filter, Plugin, Tag} from "../../Types";
import {Header} from "../../components/header/Header";
import {defaultFilter, defaultPlugin} from "../../DefaultObjects";
import {SelectedTags} from "../../components/header/tags/TagsCloud";
import {Tooltip} from "../../components/default/Tooltip";
import {AuthContext} from "../../App";

const PluginPage = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [filter, setFilter] = useState<Filter>(defaultFilter);
    const [plugin, setPlugin] = useState<Plugin>(defaultPlugin);
    const params = useParams();

    const myPlugin = user.userId === plugin.developer

    useEffect(() =>{
        Api.getPluginById(params.id).then((response) => {
                if (response.status === 200) {
                    setPlugin(response.data as Plugin);
                }
            }
        )
    },[]);

    const statusIcon = useMemo(() => {
        switch (plugin.status){
            case "OK": return <Icon img={"ok"} tooltip={{label: "Visible to everyone", placement: "top"}}/>
            case "MODERATION": return <Icon img={"moderation"} tooltip={{label: "Awaiting moderation stage", placement: "top"}}/>
            case "BLOCKED": return <Icon img={"blocked"} tooltip={{label: "Problems have been identified. Click to view more", placement: "top"}}/>
            default: return <></>
        }
    }, [plugin.status])

    const handleViewOwner = useCallback(() => {}, [])

    const categories : Category[] = useMemo(() => {
        const ids = plugin.categories.map(c => c.categoryId)
        if(ids.length === 0) return []
        const categories = sessionStorage.getItem("CATEGORIES")
        if(!categories) return []
        const cats: Category[] = JSON.parse(categories)
        return cats.filter(c => ids.includes(c.id))
    }, [plugin])

    const tags : Tag[] = useMemo(() => {
        const ids = plugin.tags.map(t => t.tagId)
        if(ids.length === 0) return []
        const tags = sessionStorage.getItem("TAGS_SET")
        if(!tags) return []
        const ts: Tag[] = JSON.parse(tags)
        return ts.filter(t => ids.includes(t.id))
    }, [plugin])

    const handleLicenseRegistrationClick = useCallback(() => navigate("/user/license"), [])

    console.log("plugin ", plugin)

    return (
        <S1.Wrapper>
            <Header filter={filter} onChangeFilter={setFilter}/>
            <S1.Main>
                <Container>
                    <FlexRow justifyContent={"space-between"}>
                        <Column style={{minWidth: "200px", width: "300px", justifyContent:"space-between"}}>
                            <FlexColumn style={{marginTop: "100px"}} gap={"40px"}>
                                <ImgBlock imageRefs={plugin.images.map(img => img.imageId)} />
                                {tags.length > 0 &&
                                    <div>
                                        <div style={{marginBottom: "5px"}}>Appropriate tags</div>
                                        <SelectedTags selected={tags} />
                                    </div>
                                }
                            </FlexColumn>

                            {myPlugin &&
                                <span style={{width:"fit-content"}}>
                                <Tooltip label={"Status determines plugin's scope"}>
                                    <S.Status>Status: {plugin.status} <span style={{margin: "1px 0 0 4px"}}>{statusIcon}</span></S.Status>
                                </Tooltip>
                                </span>
                            }
                            <FlexColumn gap={"10px"} style={{marginBottom:"20px"}}>
                                <FlexRow gap={"10px"}>
                                    <>
                                        <S.Price>{plugin.price}</S.Price>
                                        <S.Sign>.00 $</S.Sign>
                                    </>
                                    {user.isDarciUser && <Btn primary>Purchase</Btn>}
                                </FlexRow>
                                {!user.isDarciUser &&
                                    <>
                                        <span>You need to register in the license server to be able to buy plugins</span>
                                        <Btn style={{width:"150px", backgroundColor:"rgb(255,179,58)"}} onClick={handleLicenseRegistrationClick}>Sing up to Darci</Btn>
                                    </>
                                }
                            </FlexColumn>
                        </Column>

                        <Column style={{width: "50%", padding: "100px 20px 50px 20px"}}>
                            <S.Header>
                                {plugin.name}
                                <FlexRow>
                                    <S.Rate><span style={{fontSize: "22px"}}>{plugin.mark}</span>/5</S.Rate>
                                    <S.Star><Icon img={"star"} nonClickable style={{opacity:1}}/></S.Star>
                                </FlexRow>
                            </S.Header>

                            <S.Items>
                                { myPlugin ?
                                    <>
                                        <Icon img={"settings"} size={24} tooltip={{label:"Configure plugin", placement:"top"}} onClick={handleViewOwner}/>
                                        <Icon img={"full-screen"} size={20} tooltip={{label:"View all bug reports", placement:"top"}} onClick={handleViewOwner}/>
                                    </>
                                    :<>
                                        <Icon img={"man"} size={20} tooltip={{label:"View owner", placement:"top"}} onClick={handleViewOwner}/>
                                    </>
                                }
                                <Icon img={"bug"} size={20} tooltip={{label:"Leave bug report if some issues found", placement:"top"}}/>
                            </S.Items>

                            <S.Heading>Introduction</S.Heading>
                            <S.Text>{plugin.shortDescription}</S.Text>

                            <S.Heading>Description</S.Heading>
                            <S.Text>{plugin.fullDescription}</S.Text>

                            { categories.length > 0 &&
                                 <FlexRow gap={"5px"} style={{padding: "10px"}}>{categories.map(c=>
                                    <Tooltip label={"Plugin's category"}>
                                        <S.Category key={c.id}>{c.title}</S.Category>
                                    </Tooltip>)}
                                 </FlexRow>
                            }
                        </Column>
                        <Column style={{width: "400px"}}>
                            { plugin.id && <ReviewArea pluginId={plugin.id}/> }
                        </Column>
                    </FlexRow>
                </Container>
            </S1.Main>
            <MyFooter />
        </S1.Wrapper>
    );
};

export default PluginPage;