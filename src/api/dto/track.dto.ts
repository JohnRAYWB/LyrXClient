import {User} from "@/api/dto/auth.dto";

export interface commentDto {
    _id: string
    user: User
    text: string
}

export interface trackDto {
    _id: string;
    name: string;
    description: string
    artist: User;
    listens: number;
    favorites: number;
    // genre: string; !!!!!!!!!!!!!
    audio: string;
    picture: string
    comments: commentDto[]
    // albums: []; !!!!!!!!!!!!!
    protectedDeletion: boolean
}

export interface tracksListDto {
    tracks: trackDto[]
    error: string
}