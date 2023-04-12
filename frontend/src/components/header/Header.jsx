import React, {useState} from 'react';
import classes from './header.module.css'
import {Search} from "./search/Search";
import {LogoTab, ProfileTab} from "./Tabs";
import {Categories} from "./category/Categories";
import {TagsCloud} from "../tag/TagsCloud";

export const Header = (props) => {
    const [tagsWindowVisible, setTagsWindowVisible] = useState(false);

    const myNavigate = () =>{
        props.setDefaultFilters();
    }

    return (
        <header
            className={classes.my__header}>
            <div className="container" style={{height: "100%"}}>
                <div className={classes.my__container}>

                    <LogoTab onClick={myNavigate}/>

                    <Categories setCategory={props.setCurrentCat} category={props.currentCategory}/>

                    <Search className={["col-6"].join(' ')}
                            setFilterFunc={props.setFilter}
                            currentFilter={props.currentFilter}/>

                    <div className={classes.my__tags}
                         onClick={() => setTagsWindowVisible(true)}>
                        #tags
                    </div>
                    <ProfileTab/>
                </div>
            </div>
            {tagsWindowVisible?
                <TagsCloud list={props.tags} selectedTags={props.selectedTags} add={props.addTag} setVisible={setTagsWindowVisible}/>
                :<div />
            }
        </header>
    );
};