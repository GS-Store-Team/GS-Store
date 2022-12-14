import axios from "axios";

const httpHeaders ={
        "Content-Type": "application/json",
        "responseType": "arraybuffer",
        "Authorization": `Bearer_${localStorage.getItem('token')}`
    }

export default class Api {
    static async getPluginsPage(page = 1, limit = 10, filter, currentCat){
        const response = await axios.get("http://localhost:8080/plugins", {
            headers: httpHeaders,
            params: {
                _page: page,
                _limit: limit,
                _filter: filter,
                _cat: currentCat,
            }
        })
        return response;
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

    static async sendReview(review){
        return await axios.post("http://localhost:8080/", review);
    }

    static async getReviews(id){
        return await axios.get("http://localhost:8080/", {headers:httpHeaders, params:{pluginId: id}});
    }

    static async previewByPluginId(id){
        return await axios.get(`http://localhost:8080/image/plugin/${id}/preview`, {
                headers:httpHeaders,
            });
    }

    static async getCategories(){
        return await axios.get(`http://localhost:8080/categories`, {
            headers:httpHeaders,
        });
    }
}