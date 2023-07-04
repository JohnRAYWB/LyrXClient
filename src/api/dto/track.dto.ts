import {User} from "@/api/dto/user.dto";
import {genreDto} from "@/api/dto/genre.dto";

export interface commentDto {
    readonly _id: string
    readonly user: User
    readonly text: string
}

export interface trackDto {
    readonly _id: string;
    readonly name: string;
    readonly description: string
    readonly artist: string;
    readonly listens: number;
    readonly favorites: number;
    readonly genre: genreDto[];
    readonly audio: string;
    readonly image: string
    readonly comments: commentDto[]
    readonly album: string;
    readonly protectedDeletion: boolean
}