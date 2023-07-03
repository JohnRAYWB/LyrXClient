import {User} from "@/api/dto/auth.dto";
import {trackDto} from "@/api/dto/track.dto";

export interface playlistDto {
    _id: string
    name: string
    description: string
    image: string
    favorites: number
    user: User
    tracks: trackDto[]
}