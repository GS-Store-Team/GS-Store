import React from 'react';
import axios from "axios";

const httpHeaders ={
        "Content-Type": "application/json",
        "responseType": "arraybuffer",
        "Authorization": `Bearer_${localStorage.getItem('token')}`
    }

export default class Api {
    static async getPluginsPage(page = 1, limit = 10){
        const response = await axios.get("http://localhost:8080/plugins", {
            headers: httpHeaders,
            params: {
                _page: page,
                _limit: limit
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

    static async previewByPluginId(id){
        return await axios.get(`http://localhost:8080/image/plugin/${id}/preview`, {
                headers:httpHeaders,
            });
    }
}