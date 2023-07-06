import {albumDto} from "@/api/dto/album.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {trackDto} from "@/api/dto/track.dto";

export interface genreDto {
    readonly _id: string
    readonly name: string
    readonly description: string
    readonly albums: albumDto[]
    readonly playlists: playlistDto[]
    readonly tracks: trackDto[]
    readonly __v: number
}
