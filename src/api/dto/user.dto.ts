import {commentDto, trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

export interface User {
    _id: string
    email: string
    username: string
    about: string
    avatar: string
    birth: Date
    roles: rolesDto
    ban: boolean
    banReason: String[]
    comments: commentDto[]
    tracks: trackDto[]
    tracksCollection: trackDto[]
    playlists: playlistDto[]
    playlistsCollection: playlistDto[]
    albums: albumDto[]
    albumCollections: albumDto[]
    followers: User[]
    followings: User[]
}

export interface roleDto {
    _id: string
    role: string
    description: string
}

export interface rolesDto {
    roles: roleDto[]
}