import {Filter, PluginStatus} from "./Types";

export const defaultPlugin = {
    id: null,
    categories: [],
    checked: false,
    developer: 0,
    tags: [],
    images: [],
    name: 'none',
    shortDescription: 'none',
    fullDescription: '',
    deleted: false,
    mark: 5,
    price: 0,
    status: "OK" as PluginStatus
}

export const defaultFilter : Filter = {value:'', category:{title:'', id: -1}, selectedTags:[], pageId: 1, pageSize: 100}