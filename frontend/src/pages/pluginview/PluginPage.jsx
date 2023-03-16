import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Api from "../../API/Api";
import classes from "./pluginpage.module.css";
import bug from './../../UI/img/bug.png'
import star from './../../UI/img/star.png'
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";
import {MyReview} from "../../components/review/MyReview";
import {ReviewList} from "../../components/review/ReviewList";
import {PluginViewHeader} from "../../components/header/PluginViewHeader";

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
                        console.log(response.data)
                        if(response.status === 200)
                            setImgList(response.data.map((e) => <ImgComponent func={Api.getImageById(e)}/>));
                    })
                }
            }
        )
    },[]);

    return (
        <div>
            <PluginViewHeader/>
            <div className={[classes.my__plugin, "container"].join(' ')}>
                <div className={"row"}>

                    <div className={["col-3", classes.my__full__desc].join(' ')}>
                        <div className={classes.my_title}>{plugin.name}</div>

                        <div className={classes.images__block}>
                            <div className={classes.my__main__img}>
                                {imgList.length === 0? <ImgComponent /> : imgList.at(0)}
                            </div>
                            <div className={classes.my__supportive__img__block}>
                                {imgList.slice(1,imgList.length).map((e) =>
                                    <div className={classes.my__supportive__img}>
                                        {e}
                                    </div>
                                )}
                            </div>
                        </div>

                        <h2 className={classes.my__rate}>{plugin.mark}/5
                            <img className={classes.rate_image}
                                 src={star}
                                 alt={".."}/>
                        </h2>
                        <button className={classes.purchase_button}>Purchase</button>
                    </div>

                    <div className={["col-5", classes.my__full__desc].join(' ')}>
                        <div className={classes.my_desc}>
                            <div className={classes.my_desc_title}>Description</div>
                            <button className={classes.bug_report_button}>
                                <img className={classes.bug_report_image}
                                     src={bug}
                                     alt={".."}/>
                                report
                            </button>
                        </div>
                        <p className={classes.my_desc_text}>{plugin.fullDescription}</p>
                    </div>

                    <div className={["col-4", classes.reviews].join(' ')}>
                        <div className={classes.my__review__title}>Reviews</div>

                        <ReviewList func={Api.getReviews(plugin.id)}/>
                        <hr className={classes.my__line}/>
                        <MyReview/>
                    </div>
                </div>
            </div>
            <MyFooter />
        </div>
    );
};

export default PluginPage;