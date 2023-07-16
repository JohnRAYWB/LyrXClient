import React from 'react';
import styles from "./styles/Collection.module.css"
import {usePreparedPlaylistEntities} from "@/util/usePreparedDataEntity";
import {playlistDto} from "@/api/dto/playlist.dto";
import {Carousel} from "antd";
import Row from "@/components/Content/components/Row";
import Collection from "@/components/Content/components/Collection";
import {useFetchAllAndSearchQuery, useFetchMostLikedQuery} from "@/store/api/PlaylistApi";

const PlaylistCollection: React.FC = () => {

    const {data: playlists, isLoading} = useFetchAllAndSearchQuery('')
    const {data: likedPlaylist, isFetching} = useFetchMostLikedQuery(null)

    if(isLoading || isFetching) {
        return <></>
    }

    const firstRow = likedPlaylist.slice(0, 5)
    const secondRow = likedPlaylist.slice(5, 10)

    return (
        <div className={styles.main}>
            <div className={styles.fav}>
                <p className={styles.favText}>Most popular playlists</p>
                <div className={styles.favItems}>
                    <Carousel>
                        <Row items={firstRow} type={'playlist'}/>
                        <Row items={secondRow} type={'playlist'}/>
                    </Carousel>
                </div>
            </div>
            <p className={styles.listText}>Community playlists</p>
            <Collection items={playlists} type={'playlist'}/>
        </div>
    );
};

export default PlaylistCollection;