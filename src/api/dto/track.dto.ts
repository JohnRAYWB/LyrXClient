import {User} from "@/api/dto/user.dto";

export interface commentDto {
    _id: string
    user: User
    text: string
}

export interface trackDto {
    _id: string;
    name: string;
    description: string
    artist: string;
    listens: number;
    favorites: number;
    genre: [];
    audio: string;
    image: string
    comments: commentDto[]
    album: string;
    protectedDeletion: boolean
}