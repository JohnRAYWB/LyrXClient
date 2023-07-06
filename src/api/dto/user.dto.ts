import {commentDto, trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

export interface User {
    readonly _id: string
    readonly email: string
    readonly username: string
    readonly about: string
    readonly avatar: string
    readonly birth: Date
    readonly roles: roleDto[]
    readonly ban: boolean
    readonly banReason: String[]
    readonly comments: commentDto[]
    readonly tracks: trackDto[]
    readonly tracksCollection: trackDto[]
    readonly playlists: playlistDto[]
    readonly playlistsCollection: playlistDto[]
    readonly albums: albumDto[]
    readonly albumCollections: albumDto[]
    readonly followers: User[]
    readonly followings: User[]
    readonly __v: number
}

export interface roleDto {
    readonly _id: string
    readonly role: string
    readonly description: string
    readonly __v: number
}