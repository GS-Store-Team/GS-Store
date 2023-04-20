import {httpHeaders, restClient} from "./Config";

export default class Api {
    static async getPluginsPage(page = 1, limit = 10, filter, currentCat, tags){
        return  await restClient.get("http://localhost:8080/plugins", {
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
        return await restClient.get("http://localhost:8080/plugins/" + id,{
            headers:httpHeaders,
        });
    }

    static async sendNewPlugin(plugin){
        return await restClient.post("http://localhost:8080/plugins", plugin, {
            headers:httpHeaders,
        });
    }

    static async login(authRequest){
        return await restClient.post("http://localhost:8080/login", authRequest);
    }

    static async signUp(authRequest){
        return await restClient.post("http://localhost:8080/signup", authRequest);
    }

    static async sendReview(review, pluginId){
        return await restClient.post(`http://localhost:8080/plugins/${pluginId}/comment`, review, {
            headers:httpHeaders
        });
    }

    static async getReviews(id, page = 1, limit = 100, sortType = 0){
        return await restClient.get(`http://localhost:8080/plugins/${id}/comments`, {
            headers:httpHeaders,
            params: {
                _page: page,
                _limit: limit,
                _type: sortType,
            },
        });
    }

    static async previewByPluginId(id){
        return await restClient.get(`http://localhost:8080/image/plugin/${id}/preview`, {
                headers:httpHeaders,
            });
    }

    static async getImageById(id){
        return await restClient.get(`http://localhost:8080/image/${id}`, {
            headers:httpHeaders,
        });
    }

    static async imageListByPluginId(id){
        return await restClient.get(`http://localhost:8080/image/plugin/${id}`, {
            headers:httpHeaders,
        });
    }

    static async getCategories(){
        return await restClient.get(`http://localhost:8080/categories`, {
            headers:httpHeaders,
        });
    }

    static async getTags(){
        return await restClient.get(`http://localhost:8080/tags`, {
            headers:httpHeaders,
        });
    }

    static async getCurrentUser(){
        return await restClient.get(`http://localhost:8080/users/me`, {
            headers:httpHeaders,
        });
    }

    static async getUserById(id){
        return await restClient.get(`http://localhost:8080/users/id`, {
            headers:httpHeaders,
        });
    }

    static async changeUserData(userData){
        return await restClient.patch("http://localhost:8080/users/me", userData, {
            headers:httpHeaders,
        });
    }

    static async deleteComment(comment){
        return await restClient.delete(`http://localhost:8080/plugins/comments/${comment.id}`, {
            headers:httpHeaders,
        });
    }
}