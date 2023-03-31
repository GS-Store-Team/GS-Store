import React, {useState} from 'react';
import classes from './header.module.css'
import image from './../../UI/img/logo.png'
import {Search} from "../search/Search";
import {ProfileTab} from "../profiletab/ProfileTab";
import {Category} from "../category/Category";
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

                    <div onClick={myNavigate}
                          style={{textDecoration: "none"}}
                          className={[classes.my__logo, "col-6"].join(' ')}>
                        <img
                            className={classes.my__img}
                            src={image}  alt={":("}/>
                        <div className={[classes.my__title, "flex-column justify-content-center"].join(' ')}>GS-Store</div>
                    </div>

                    <Category setCurrentCat={props.setCurrentCat} currentCategory={props.currentCategory}/>

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