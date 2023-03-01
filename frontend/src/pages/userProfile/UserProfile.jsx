import React, {useState} from 'react';
import Api from "../../API/Api";
import classes from "./userprofile.module.css";
import {Header} from "../../components/header/Header";
import {MyFooter} from "../../components/footer/MyFooter";
import defaultImg from "../../UI/img/default.png";
import {BareHeader} from "../../components/header/BareHeader";
import {ImgComponent} from "../../components/ImgComponent/ImgComponent";

const UserProfile = () => {

    const [profile] = useState({
        id: 0,
        name: 'name',
        email: 'email',
        contacts: 'contacts',
        location: 'location',
        description: 'description',
    });

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [contacts, setContacts] = useState(profile.contacts);
    const [location, setLocation] = useState(profile.location);
    const [description, setDescription] = useState(profile.description);

    const [disable, setDisable] = useState("disable");
    //const params = useParams();
    //const [preview, setPreview] = useState(defaultImg);

    return (
        <div>
            <Header/>
            <div className={[classes.my__profile, "container"].join(' ')}>
                <div className={"row"}>

                    <div className={["col-1", classes.my__menu].join(' ')}>
                        <button type={"button"} className={classes.my__profileButton}>
                            Profile
                        </button>
                        <button type={"button"} className={classes.my__pluginsButton}>
                            Plugins
                        </button>
                    </div>

                    <div className={["col-5", classes.my__photo].join(' ')}>
                        <div className={classes.my__img}>
                            <ImgComponent func={Api.previewByPluginId(0)}></ImgComponent>
                        </div>
                        {/*                        <img className={classes.my__img}
                             draggable={false}
                             src={defaultImg}
                             alt={".."}/>*/}
                    </div>

                    <div className={["col-6", classes.my__info].join(' ')}>
                        <form id="the_form">
                            <textarea className={classes.my__name} value={name}
                                      disabled={disable} onChange={event => setName(event.target.value)}/>

                            <textarea className={classes.my__mail} value={email}
                                      disabled={disable} onChange={event => setEmail(event.target.value)}/>

                            <textarea className={classes.my__contacts} value={contacts}
                                      disabled={disable} onChange={event => setContacts(event.target.value)}/>

                            <textarea className={classes.my__location} value={location}
                                      disabled={disable} onChange={event => setLocation(event.target.value)}/>

                            <textarea className={classes.my__description} value={description}
                                      disabled={disable} onChange={event => setDescription(event.target.value)}/>

                            <button type={"button"} className={classes.my__button}
                                    onClick={_ => setDisable(disable !== null ? null : "disable")}>
                                {disable !== null ? "edit" : "apply"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <MyFooter/>
        </div>
    );
};

export default UserProfile;


