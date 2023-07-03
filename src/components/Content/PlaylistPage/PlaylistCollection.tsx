import React from 'react';
import styles from "./styles/PlaylistCollection.module.css"
import Playlist from "@/components/Content/PlaylistPage/Playlist";
import {previewItemDto} from "@/api/dto/previewItem.dto";
import Row from "@/components/Content/components/Row";

interface PlaylistCollection {
    playlists: previewItemDto[]
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