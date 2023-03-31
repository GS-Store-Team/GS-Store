import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../App";

const httpHeaders= {
    "Content-Type": "application/json",
    "responseType": "arraybuffer",
    "Authorization": "",
}

window.addEventListener('storage', function (){
    httpHeaders.Authorization = `Bearer_${sessionStorage.getItem('token')}`
});

function forceLogout(){
    const {setAuth}  = useContext(AuthContext)
    setAuth(false)
}

const restClient = axios.create();

restClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        forceLogout()
        return Promise.reject(error);
    }
);

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
        return await axios.post(`http://localhost:8080/plugins/${pluginId}/comment`, review, {headers:Api.httpHeaders});
    }

    static async getReviews(id){
        return await axios.get(`http://localhost:8080/plugins/${id}/comments`, {headers:Api.httpHeaders});
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

    static async getCurrentUser(){
        return await axios.get(`http://localhost:8080/users/me`, {
            headers:httpHeaders,
        });
    }

    static async getUserById(id){
        return await axios.get(`http://localhost:8080/users/id`, {
            headers:httpHeaders,
        });
    }

    static async changeUserData(userData){
        return await axios.patch("http://localhost:8080/users/me", userData, {
            headers:httpHeaders,
        });
    }
}