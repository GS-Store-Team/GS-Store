import React, {useState, useEffect} from 'react';
import Api from "../../API/Api";
import {MyFooter} from "../../components/footer/MyFooter";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";
import classes from "./uploadplugin.module.css";
import {useNavigate} from "react-router-dom";
import {ImgComponent} from "../../components/default/ImgComponent";
import crossButton from "../../UI/img/cross.png";
import {Categories} from "../../components/header/category/Categories";
import {SelectedTags} from "../../components/tag/SelectedTags";
import {TagsCloud} from "../../components/tag/TagsCloud";

const UploadPlugin = () => {

    const [pluginData, setPluginData] = useState({
        id: null,
        developer: null,
        name: "",
        shortDescription: "",
        fullDescription: "",
        mark: 0,
        price: "",
        categories: [],
        hashtags: [],
        deleted: false
    });

    const [tagsWindowVisible, setTagsWindowVisible] = useState(false);

    const [tags, setTags] = useState([""]);
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        Api.getTags().then((response) => {
            if(response.status === 200)
                setTags(response.data)
        })
    }, [])

    const removeSelectedTag = (tag) =>{
        setSelectedTags(selectedTags.filter(t => t !== tag))
    }

    const selectedTag = (tag) =>{
        if (selectedTags.includes(tag)){
            removeSelectedTag(tag);
            setPluginData({...pluginData, hashtags: selectedTags});
        }
        else {
            setSelectedTags([...selectedTags, tag]);
            setPluginData({...pluginData, hashtags: selectedTags});
        }
    }

    const removeAllTags = () => {
        setSelectedTags([])
    }

    const navigate = useNavigate();
    const myProfile = () =>{
        navigate(-1);
    }

    const upload = () =>{

/*        setPluginData({...pluginData, hashtags: })*/
        const array = pluginData.hashtags.map((tag) => tag.id);
        pluginData.hashtags = array;
        console.log(pluginData);

        Api.sendNewPlugin(pluginData)
            .then((response) => {console.log(response)})
            .catch((response) => {console.log(response)});
        console.log(pluginData);
        console.log(Api.getPluginById(1));
        myProfile();
    }

    return (
        <div>

            <PluginViewHeader/>
            <div className={classes.my__tags}>
                <SelectedTags list={selectedTags} remove={removeSelectedTag} removeAll={removeAllTags}/>
                {tagsWindowVisible?
                    <TagsCloud list={tags} selectedTags={selectedTags}
                               add={selectedTag} close={setTagsWindowVisible}/>
                    :<div/>
                }
            </div>
            <div className={[classes.my__profile, "container"].join(' ')}>
                <div className={"row"}>
                    <div className={["col-4", classes.my__photo].join(' ')}>
                        <div className={classes.my__img}>
                            <ImgComponent func={Api.previewByPluginId(0)}></ImgComponent>
                        </div>
                        <form className={classes.my__uploadPhotoButton} encType="multipart/form-data" method="post">
                            <input type="file" name="f"/>
                        </form>
                    </div>
                    <div className={["col-7", classes.my__pluginInformation].join(' ')}>
                        <textarea className={classes.my__pluginName} value={pluginData.name}
                                  placeholder={"plugin name"} onChange={event =>
                            setPluginData({...pluginData, name: event.target.value})}/>

                        <textarea className={classes.my__shortDesc} value={pluginData.shortDescription}
                                  placeholder={"short description"} onChange={event =>
                            setPluginData({...pluginData, shortDescription: event.target.value})}/>

                        <textarea className={classes.my__fullDesc} value={pluginData.fullDescription}
                                  placeholder={"full description"} onChange={event =>
                            setPluginData({...pluginData, fullDescription: event.target.value})}/>

                        <textarea className={classes.my__price} value={pluginData.price}
                                  placeholder={"price"} onChange={event =>
                            setPluginData({...pluginData, price: event.target.value})}/>


                        <div className={classes.my__categoryNtags}>
                            <div className={classes.my__category}>
                                <Categories setCurrentCat={(currentCat) =>
                                {setPluginData({...pluginData, categories: currentCat})}}
                                            currentCategory={pluginData.categories}/>
                            </div>


                            <div className={classes.my__tagsButton}
                                 onClick={() => setTagsWindowVisible(true)}>
                                tags
                            </div>
                        </div>
                        <form className={classes.my__uploadPhotoButton} encType="multipart/form-data" method="post">
                            <input type="file" name="f"/>
                        </form>
                        <div className={classes.my__button} onClick={upload}>
                            upload
                        </div>
                    </div>
                    <div className={["col-1", classes.my__cross].join(' ')}>
                        <img onClick={myProfile} className={classes.my__crossButton}
                             src={crossButton}
                             alt={".."}/>
                    </div>
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};

export default UploadPlugin;


