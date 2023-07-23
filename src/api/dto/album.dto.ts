import {userDto} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import {genreDto} from "@/api/dto/genre.dto";

export interface albumDto {
    readonly _id: string
    readonly name: string
    readonly description: string
    readonly image: string
    readonly favorites: number
    readonly genre: genreDto[]
    readonly artist: userDto
    readonly tracks: trackDto[]
    readonly __v: number
}