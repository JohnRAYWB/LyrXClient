import React from 'react';
import {Carousel} from "antd";

import styles from "./styles/ProfileCollectionRow.module.css";
import Row from "@/components/Content/components/Row";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

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
            {playlists.length > 5 ?
                <>
                    <Carousel>
                        <Row items={playlists.slice(0, 5)} type={'playlist'}/>
                        <Row items={playlists.slice(5, 10)} type={'playlist'}/>
                    </Carousel>
                </>
                :
                <Row items={playlists.slice(0, 5)} type={'playlist'}/>
            }
        </div>
    );
};

export const AlbumCollectionRow: React.FC<AlbumItems> = ({albums}) => {

    if(albums.length === 0) {
        return <div className={styles.emptyList}>Here no added albums yet</div>
    }

    return (
        <div className={styles.list}>
            {albums.length > 5 ?
                <>
                    <Carousel>
                        <Row items={albums.slice(0, 5)} type={'album'}/>
                        <Row items={albums.slice(5, 10)} type={'album'}/>
                    </Carousel>
                </>
                :
                <Row items={albums.slice(0, 5)} type={'album'}/>
            }
        </div>
    );
};