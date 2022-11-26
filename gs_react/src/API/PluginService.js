import React from 'react';
import axios from "axios";

export default class PluginService{
    static async getPage(){
        const response = await axios.get("http://localhost:8080/plugins")
        return response;
    }

}