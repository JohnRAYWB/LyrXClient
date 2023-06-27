import {User} from "@/api/dto/auth.dto";
import {tracksListDto} from "@/api/dto/track.dto";

export interface playlistDto {
    _id: string
    name: string
    image: string
    favorites: number
    user: User
    tracks: tracksListDto
}

export interface playlistsCollectionDto {
    playlists: playlistDto[]
    error: string
}