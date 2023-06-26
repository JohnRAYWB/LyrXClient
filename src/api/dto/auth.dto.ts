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
    roles: []
    ban: boolean
    tracks: []
    tracksCollection: []
    playlists: []
    playlistsCollection: []
    albums: []
    albumCollections: []
    followers: []
    followings: []
}