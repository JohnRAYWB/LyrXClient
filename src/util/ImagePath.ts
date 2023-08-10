import {trackDto} from "@/api/dto/track.dto";
import {albumDto} from "@/api/dto/album.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {userDto} from "@/api/dto/user.dto";

export const trackImagePath = (track: trackDto) => `http://localhost:4221/track/${track.name[0]}/${track.image}`
export const albumsTrackImagePath = (track: trackDto) => `http://localhost:4221/album/${track.name[0]}/${track.image}`
export const albumImagePath = (album: albumDto) => `http://localhost:4221/album/${album.name[0]}/${album.image}`
export const playlistImagePath = (playlist: playlistDto) => `http://localhost:4221/playlist/${playlist.name[0]}/${playlist.image}`
export const profileImagePath= (user: userDto) => `http://localhost:4221/profile/${user.username}/${user.avatar}`