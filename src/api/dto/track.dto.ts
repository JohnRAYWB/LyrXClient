import {userDto} from "@/api/dto/user.dto";
import {genreDto} from "@/api/dto/genre.dto";
import {albumDto} from "@/api/dto/album.dto";

export interface commentDto {
    readonly _id: string
    readonly user: userDto
    readonly text: string
    readonly __v: number
}

export interface trackDto {
    readonly _id: string;
    readonly name: string;
    readonly description: string
    readonly artist: userDto;
    readonly listens: number;
    readonly favorites: number;
    readonly genre: genreDto[];
    readonly audio: string;
    readonly image: string
    readonly comments: commentDto[]
    readonly album: albumDto;
    readonly protectedDeletion: boolean
    readonly __v: number
}