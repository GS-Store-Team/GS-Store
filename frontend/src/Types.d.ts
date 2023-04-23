export type UserData = {
    nickName: string,
    email: string,
    phoneNumber: string,
    description: string,
    images: number[],
    userId: number,
}

export type Plugin = {
    categories: number[]
    checked: boolean
    deleted: boolean
    developer: number
    fullDescription: string
    hashtags: number[]
    images: number[]
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
    categoryId: number
    selectedTags: Tag[]
}

export type Tag = {
    id: number
    title: string
}