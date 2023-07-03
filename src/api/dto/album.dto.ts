import {User} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";

export interface albumDto {
    _id: string
    name: string
    description: string
    image: string
    favorites: number
    genre: []
    user: User
    tracks: trackDto[]
}