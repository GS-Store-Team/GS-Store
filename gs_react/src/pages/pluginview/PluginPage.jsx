import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Api from "../../API/Api";
import classes from "./pluginpage.module.css";
import bug from './../../UI/img/bug.png'
import star from './../../UI/img/star.png'
import defaultImg from './../../UI/img/default.png'
import {Header} from "../../components/header/Header";
import {MyFooter} from "../../components/footer/MyFooter";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";
import {MyReview} from "../../components/review/MyReview";
import {Review} from "../../components/review/Review";

const PluginPage = () => {

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

    const [preview, setPreview] = useState(defaultImg);

    useEffect(() =>{
        Api.getPluginById(params.id).then((response) => {
                if (response.status === 200) {
                    setPlugin(response.data);
                    setPreview(<ImgComponent func={Api.previewByPluginId(response.data.id)}/>);
                }
            }
        )
    });

    return (
        <div>
            <Header />
            <div className={[classes.my__plugin, "container"].join(' ')}>
                <div className={"row"}>

                    <div className={["col-3", classes.my__full__desc].join(' ')}>
                        <div className={classes.my_title}>{plugin.name}</div>
                        {preview}
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

                        <Review review={"My first review"}/>
                        <Review review={"My second review"}/>
                        <Review review={"My third review"}/>
{/*                        {reviewList.map((c, index) => <div value={c.id}>{c.title}</div>)}*/}


                        <MyReview/>
                    </div>
                </div>
            </div>
            <MyFooter />
        </div>
    );
};

export default PluginPage;