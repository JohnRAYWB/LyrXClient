import React from 'react';
import {Carousel} from "antd";

import styles from "./styles/ProfileCollectionRow.module.css";
import Row from "@/components/Content/components/Row";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import Element from "@/components/Content/components/Element";

interface PlaylistItems {
    playlists: playlistDto[]
}

interface AlbumItems {
    albums: albumDto[]
}


export const PlaylistCollectionRow: React.FC<PlaylistItems> = ({playlists}) => {

    if(playlists.length === 0) {
        return <div className={styles.emptyList}>Here no added playlists yet</div>
    }

    return (
        <div className={styles.list}>
            {playlists.slice(0, 10).map(playlist =>
                <Element item={playlist} type={'playlist'}/>
            )}
        </div>
    );
};

export const AlbumCollectionRow: React.FC<AlbumItems> = ({albums}) => {

    if(albums.length === 0) {
        return <div className={styles.emptyList}>Here no added albums yet</div>
    }

    return (
        <div className={styles.list}>
            {albums.slice(0, 10).map(album =>
                <Element item={album} type={'album'}/>
            )}
        </div>
    );
};