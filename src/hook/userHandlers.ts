import {useEffect, useState} from "react";
import {User} from "@/api/dto/auth.dto";
import * as Api from "@/api";
import {AxiosError} from "axios/index";
import {playlistsCollectionDto} from "@/api/dto/playlist.dto";

export const getUserProps = () => {
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        Api.auth.getProfile()
            .then(u => setUser(u))
            .catch((e: Error | AxiosError) => console.log(e))
    }, [])
    if (!user) return null

    return user
}

export const getPlaylistsCollection = () => {

    const [playlists, setPlaylists] = useState<playlistsCollectionDto>()

    useEffect(() => {
        Api.user.getPlaylistCollection()
            .then(p => setPlaylists(p))
            .catch((e: Error | AxiosError) => console.log(e))
    }, [])

    return playlists
}

export const onClickLogout = () => {
    if (window.confirm("Are you sure to logout?")) {
        Api.auth.logout();
        location.href = "/";
    }
};