export type UserData = {
    nickName: string,
    email: string,
    phoneNumber: string,
    description: string,
    images: number[],
    userId: number,
    isDarciUser: boolean,
}

export type Plugin = {
    categories: {categoryId: number, pluginId:number }[]
    checked: boolean
    deleted: boolean
    developer: number
    fullDescription: string
    tags: {tagId: number, pluginId:number }[]
    images: Image[]
    id: number
    mark: number
    name: string
    price: number
    shortDescription: string
}

export type Comment = {
    id: number | undefined;
    mark: number;
    text: string;
    creationTime: number;
    lastChange: number | null;
    reviewer: number
    avatar: any;
    nickName: string;
}

export type Category = {
    id: number
    title: string
}

export type Image = {
    id: number
    image: string
    isPreview: boolean
}

export type Filter = {
    value: string
    category: Category
    selectedTags: Tag[]
    my?: boolean
    bought?: boolean
    pageId: number
    pageSize: number
}

export type Tag = {
    id: number
    title: string
    color?:string
}