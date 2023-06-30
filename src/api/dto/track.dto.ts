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
    artist: string;
    listens: number;
    favorites: number;
    genre: [];
    audio: string;
    image: string
    comments: []
    albums: [];
    protectedDeletion: boolean
}