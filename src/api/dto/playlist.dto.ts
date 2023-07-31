import {userDto} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import {genreDto} from "@/api/dto/genre.dto";

export interface playlistDto {
    readonly _id: string
    readonly name: string
    readonly description: string
    readonly image: string
    readonly favorites: number
    readonly createdTime: Date
    readonly user: userDto
    readonly tracks: trackDto[]
    readonly genre: genreDto[]
    readonly __v: number
}