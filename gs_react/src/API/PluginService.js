import React from 'react';
import axios from "axios";

export default class PluginService{

    static async getPluginsPage(page = 1, limit = 10){
        const response = await axios.get("http://localhost:8080/plugins", {
            params: {
                page: page,
                _limit: limit
            }
        })
        return response;
    }

    static async sendNewPlugin(plugin){
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await axios.post("http://localhost:8080/plugins", config, plugin);
        return response;
    }
}