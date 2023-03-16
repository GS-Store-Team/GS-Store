import axios from "axios";
import Qs, {parse, stringify} from "qs";
import qs from "qs";

const httpHeaders ={
        "Content-Type": "application/json",
        "responseType": "arraybuffer",
        "Authorization": `Bearer_${localStorage.getItem('token')}`
    }

export default class Api {
    static async getPluginsPage(page = 1, limit = 10, filter, currentCat, tags){

        return  await axios.get("http://localhost:8080/plugins", {
            headers:httpHeaders,
            params: {
                _page: page,
                _limit: limit,
                _filter: filter,
                _cat: currentCat,
            },

        })
    }

    static async getPluginById(id){
        return await axios.get("http://localhost:8080/plugins/" + id,{
            headers:httpHeaders,
        });
    }

    static async sendNewPlugin(plugin){
        return await axios.post("http://localhost:8080/plugins", plugin, {
            headers:httpHeaders,
        });
    }

    static async login(authRequest){
        return await axios.post("http://localhost:8080/login", authRequest);
    }

    static async signUp(authRequest){
        return await axios.post("http://localhost:8080/signup", authRequest);
    }

    static async sendReview(review, pluginId){
        return await axios.post(`http://localhost:8080/plugins/${pluginId}/comment`, review, {headers:httpHeaders});
    }

    static async getReviews(id){
        return await axios.get(`http://localhost:8080/plugins/${id}/comments`, {headers:httpHeaders});
    }

    static async previewByPluginId(id){
        return await axios.get(`http://localhost:8080/image/plugin/${id}/preview`, {
                headers:httpHeaders,
            });
    }

    static async getImageById(id){
        return await axios.get(`http://localhost:8080/image/${id}`, {
            headers:httpHeaders,
        });
    }

    static async imageListByPluginId(id){
        return await axios.get(`http://localhost:8080/image/plugin/${id}`, {
            headers:httpHeaders,
        });
    }

    static async getCategories(){
        return await axios.get(`http://localhost:8080/categories`, {
            headers:httpHeaders,
        });
    }

    static async getTags(){
        return await axios.get(`http://localhost:8080/tags`, {
            headers:httpHeaders,
        });
    }
}