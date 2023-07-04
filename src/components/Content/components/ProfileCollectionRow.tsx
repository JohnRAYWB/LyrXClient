import React from 'react';
import styles from "./styles/ProfileCollectionRow.module.css";
import {Carousel} from "antd";
import Row from "@/components/Content/components/Row";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {usePreparedAlbumEntities, usePreparedPlaylistEntities} from "@/util/usePreparedDataEntity";

interface PlaylistItems {
    playlists: playlistDto[]
}

interface AlbumItems {
    albums: albumDto[]
}


export const PlaylistCollectionRow: React.FC<PlaylistItems> = ({playlists}) => {

    const preparedData = usePreparedPlaylistEntities(playlists).slice(0, 10)

    return (
        <div className={styles.list}>
            {preparedData.length > 5 ?
                <>
                    <Carousel>
                        <Row items={preparedData.slice(0, 5)}/>
                        <Row items={preparedData.slice(5, 10)}/>
                    </Carousel>
                </>
                :
                <Row items={preparedData.slice(0, 5)}/>
            }
        </div>
    );
};

export const AlbumCollectionRow: React.FC<AlbumItems> = ({albums}) => {

    const preparedData = usePreparedAlbumEntities(albums).slice(0, 10)
    console.log(preparedData)
    return (
        <div className={styles.list}>
            {preparedData.length > 5 ?
                <>
                    <Carousel>
                        <Row items={preparedData.slice(0, 5)}/>
                        <Row items={preparedData.slice(5, 10)}/>
                    </Carousel>
                </>
                :
                <Row items={preparedData.slice(0, 5)}/>
            }
        </div>
    );
};