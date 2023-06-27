import axios from "@/core/axios";
import {playlistsCollectionDto} from "@/api/dto/playlist.dto";

export const getPlaylistCollection = async (): Promise<playlistsCollectionDto> => {
    return (await axios.get('users/playlists')).data
}