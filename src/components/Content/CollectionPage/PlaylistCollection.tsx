import React from 'react';
import styles from "./styles/Collection.module.css"
import {usePreparedPlaylistEntities} from "@/util/usePreparedDataEntity";
import {playlistDto} from "@/api/dto/playlist.dto";
import {Carousel} from "antd";
import Row from "@/components/Content/components/Row";
import Collection from "@/components/Content/components/Collection";
import {useFetchAllAndSearchQuery, useFetchMostLikedQuery} from "@/store/reducer/PlaylistApi";

const PlaylistCollection: React.FC = () => {

    const {data: playlists} = useFetchAllAndSearchQuery('')
    const {data: firstLiked} = useFetchMostLikedQuery(0)
    const {data: secondLiked} = useFetchMostLikedQuery(5)

    return (
        <div className={styles.main}>
            <div className={styles.fav}>
                <p className={styles.favText}>Most popular playlists</p>
                <div className={styles.favItems}>
                    <Carousel>
                        <Row items={firstLiked} type={'playlist'}/>
                        <Row items={secondLiked} type={'playlist'}/>
                    </Carousel>
                </div>
            </div>
            <p className={styles.listText}>Community playlists</p>
            <Collection items={playlists} type={'playlist'}/>
        </div>
    );
};

export default PlaylistCollection;