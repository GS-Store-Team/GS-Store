
export type UserData = {
    nickName: string,
    email: string,
    phoneNumber: string,
    description: string,
    image: number,
    id: number,
}

export type Plugin = {
    categories: number[]
    checked: boolean
    deleted: boolean
    developer: number
    fullDescription: string
    hashtags: number[]
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