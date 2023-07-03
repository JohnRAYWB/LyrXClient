import React from 'react';
import styles from "./styles/PlaylistCollection.module.css"
import {playlistDto} from "@/api/dto/playlist.dto";
import Playlist from "@/components/Content/PlaylistPage/Playlist";

interface PlaylistCollection {
    playlists: playlistDto[]
}

const PlaylistCollection: React.FC<PlaylistCollection> = ({playlists}) => {
    return (
        <div className={styles.main}>
            {playlists && playlists.map(playlist =>
                <Playlist
                    key={playlist._id}
                    playlist={playlist}
                />
            )}
        </div>
    );
};

export default PlaylistCollection;