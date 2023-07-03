import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

export const usePreparedPlaylistEntities = (playlists: playlistDto[]) => {
    return playlists
        .map(playlist => ({_id: playlist._id, image: playlist.image, name: playlist.name, description: playlist.description, favorites: playlist.favorites}))
}

export const usePreparedAlbumEntities = (albums: albumDto[]) => {
    return albums
        .map(album => ({_id: album._id, image: album.image, name: album.name, description: album.description, favorites: album.favorites}))
}