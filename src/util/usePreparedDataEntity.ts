import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

export const usePreparedPlaylistEntities = (playlists: playlistDto[]) => {
    return playlists.map(playlist => ({_id: playlist._id, name: playlist.name, image: playlist.image, description: playlist.description}))
}

export const usePreparedAlbumEntities = (albums: albumDto[]) => {
    return albums.map(album => ({_id: album._id, name: album.name, image: album.image,  description: album.description}))
}