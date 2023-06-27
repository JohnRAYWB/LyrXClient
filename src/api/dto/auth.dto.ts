import {tracksListDto} from "@/api/dto/track.dto";
import {playlistsCollectionDto} from "@/api/dto/playlist.dto";

export interface signInDto {
    email: string,
    password: string
}

export interface signInResponseDto {
    access_token: string
}

export type signUpDto = signInDto & {username: string}

export type signUpResponseDto = signInResponseDto

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
    tracks: tracksListDto
    tracksCollection: tracksListDto
    playlists: playlistsCollectionDto
    playlistsCollection: playlistsCollectionDto
    albums: []
    albumCollections: []
    followers: []
    followings: []
}

export interface roleDto {
    _id: string
    role: string
    description: string
}

export interface rolesDto {
    roles: roleDto[]
}