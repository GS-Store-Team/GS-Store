import {httpHeaders, restClient} from "./Config";

const url = "http://localhost:8080"
const validationUrl = "http://localhost:8081"
export default class Api {

    static async getPluginsPage(filter){
        return  await restClient.post(`${url}/plugins/filter`, filter, {
            headers:httpHeaders,
        })
    }

    static async getPluginsForModeration(filter){
        return await restClient.post(`${url}/management/plugins`, filter, {
            headers:{...httpHeaders},
        });
    }

    static async getVerificationResult(pluginId){
        return await restClient.get(`${url}/plugins/${pluginId}/verify`,{
            headers:{...httpHeaders},
        });
    }

    static async getPluginById(id){
        return await restClient.get(`${url}/plugins/` + id,{
            headers:httpHeaders,
        });
    }

    static async sendPlugin(plugin){
        return await restClient.post(`${url}/plugins`, plugin, {
            headers:httpHeaders,
        });
    }

    static async deletePlugin(pluginId){
        return await restClient.delete(`${url}/plugins/${pluginId}`, {
            headers:httpHeaders,
        });
    }

    static async login(authRequest){
        return await restClient.post(`${url}/login`, authRequest);
    }

    static async signUp(authRequest){
        return await restClient.post(`${url}/signup`, authRequest);
    }

    static async sendReview(review, pluginId){
        return await restClient.post(`${url}/plugins/${pluginId}/comment`, review, {
            headers:httpHeaders
        });
    }

    static async getReviews(id, page = 1, limit = 100, sortType = 0){
        return await restClient.get(`${url}/plugins/${id}/comments`, {
            headers:httpHeaders,
            params: {
                _page: page,
                _limit: limit,
                _type: sortType,
            },
        });
    }

    static async previewByPluginId(id){
        return await restClient.get(`${url}/images/plugin/${id}/preview`, {
                headers:httpHeaders,
            });
    }

    static async getImageById(id){
        return await restClient.get(`${url}/images/${id}`, {
            headers:httpHeaders,
        });
    }

    static async imageListByPluginId(id){
        return await restClient.get(`${url}/images/plugin/${id}`, {
            headers:httpHeaders,
        });
    }

    static async getCategories(){
        return await restClient.get(`${url}/categories`, {
            headers:httpHeaders,
        });
    }

    static async getTags(){
        return await restClient.get(`${url}/tags`, {
            headers:httpHeaders,
        });
    }

    static async getCurrentUser(){
        return await restClient.get(`${url}/users/me`, {
            headers:httpHeaders,
        });
    }

    static async getUserById(id){
        return await restClient.get(`${url}/users/id`, {
            headers:httpHeaders,
        });
    }

    static async changeUserData(userData){
        return await restClient.patch(`${url}/users/me`, userData, {
            headers:httpHeaders,
        });
    }

    static async deleteComment(comment){
        return await restClient.delete(`${url}/plugins/comments/${comment.id}`, {
            headers:httpHeaders,
        });
    }

    static async uploadPluginFile(plugin_id, file){
        return await restClient.post(`${url}/plugins/${plugin_id}/file`, file,{
            headers:{...httpHeaders, 'Content-Type': 'multipart/form-data'},
        });
    }

    static async validateFile(file){
        return await restClient.post(`${validationUrl}/validate`, file,{
            headers:{...httpHeaders, 'Content-Type': 'multipart/form-data'},
        });
    }

    static async uploadImageForPlugin(pluginId, image, name){
            return await restClient.post(`${url}/images/plugin/${pluginId}/${name}`, image,{
            headers:{...httpHeaders, 'Content-Type': 'multipart/form-data'},
        });
    }
}
