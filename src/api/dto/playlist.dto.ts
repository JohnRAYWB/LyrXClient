import {User} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import {genreDto} from "@/api/dto/genre.dto";

export interface playlistDto {
    readonly _id: string
    readonly name: string
    readonly description: string
    readonly image: string
    readonly favorites: number
    readonly user: User
    readonly tracks: trackDto[]
    readonly genre: genreDto[]
    readonly __v: number
}